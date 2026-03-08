import HitDice from "../../documents/actor/hit-dice.mjs";
import Proficiency from "../../documents/actor/proficiency.mjs";
import { defaultUnits, simplifyBonus } from "../../utils.mjs";
import FormulaField from "../fields/formula-field.mjs";
import LocalDocumentField from "../fields/local-document-field.mjs";
import CreatureTypeField from "../shared/creature-type-field.mjs";
import RollConfigField from "../shared/roll-config-field.mjs";
import SimpleTraitField from "./fields/simple-trait-field.mjs";
import AttributesFields from "./templates/attributes.mjs";
import CreatureTemplate from "./templates/creature.mjs";
import DetailsFields from "./templates/details.mjs";
import TraitsFields from "./templates/traits.mjs";

const {
  ArrayField, BooleanField, HTMLField, IntegerSortField, NumberField, SchemaField, SetField, StringField
} = foundry.data.fields;

/**
 * @import { ActorFavorites5e, CharacterActorSystemData, ResourceData } from "./_types.mjs";
 */

/**
 * System data definition for Characters.
 * @extends {CreatureTemplate<CharacterActorSystemData>}
 * @mixes CharacterActorSystemData
 */
export default class CharacterData extends CreatureTemplate {

  /* -------------------------------------------- */
  /*  Model Configuration                         */
  /* -------------------------------------------- */

  /** @override */
  static LOCALIZATION_PREFIXES = ["NIH.BONUSES"];

  /* -------------------------------------------- */

  /** @inheritDoc */
  static metadata = Object.freeze(foundry.utils.mergeObject(super.metadata, {
    supportsAdvancement: true
  }, { inplace: false }));

  /* -------------------------------------------- */

  /** @inheritDoc */
  static _systemType = "character";

  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      attributes: new SchemaField({
        ...AttributesFields.common,
        ...AttributesFields.creature,
        hp: new SchemaField({
          ...AttributesFields.hitPoints,
          max: new NumberField({
            nullable: true, integer: true, min: 0, initial: null, label: "NIH.HitPointsOverride",
            hint: "NIH.HitPointsOverrideHint"
          }),
          bonuses: new SchemaField({
            level: new FormulaField({ deterministic: true, label: "NIH.HitPointsBonusLevel" }),
            overall: new FormulaField({ deterministic: true, label: "NIH.HitPointsBonusOverall" })
          })
        }, { label: "NIH.HitPoints" }),
        death: new RollConfigField({
          ability: false,
          success: new NumberField({
            required: true, nullable: false, integer: true, min: 0, initial: 0, label: "NIH.DeathSaveSuccesses"
          }),
          failure: new NumberField({
            required: true, nullable: false, integer: true, min: 0, initial: 0, label: "NIH.DeathSaveFailures"
          }),
          bonuses: new SchemaField({
            save: new FormulaField({ required: true, label: "NIH.DeathSaveBonus" })
          })
        }, { label: "NIH.DeathSave" }),
        inspiration: new BooleanField({ required: true, label: "NIH.Inspiration" })
      }, { label: "NIH.Attributes" }),
      bastion: new SchemaField({
        name: new StringField({ required: true }),
        description: new HTMLField()
      }),
      details: new SchemaField({
        ...DetailsFields.common,
        ...DetailsFields.creature,
        background: new LocalDocumentField(foundry.documents.BaseItem, {
          required: true, fallback: true, label: "NIH.Background"
        }),
        originalClass: new StringField({ required: true, label: "NIH.ClassOriginal" }),
        xp: new SchemaField({
          value: new NumberField({
            required: true, nullable: false, integer: true, min: 0, initial: 0, label: "NIH.ExperiencePoints.Current"
          })
        }, { label: "NIH.ExperiencePoints.Label" }),
        appearance: new StringField({ required: true, label: "NIH.Appearance" }),
        trait: new StringField({ required: true, label: "NIH.PersonalityTraits" }),
        gender: new StringField({ label: "NIH.Gender" }),
        eyes: new StringField({ label: "NIH.Eyes" }),
        height: new StringField({ label: "NIH.Height" }),
        faith: new StringField({ label: "NIH.Faith" }),
        hair: new StringField({ label: "NIH.Hair" }),
        skin: new StringField({ label: "NIH.Skin" }),
        age: new StringField({ label: "NIH.Age" }),
        weight: new StringField({ label: "NIH.Weight" })
      }, { label: "NIH.Details" }),
      traits: new SchemaField({
        ...TraitsFields.common,
        ...TraitsFields.creature,
        weaponProf: new SimpleTraitField({
          mastery: new SchemaField({
            value: new SetField(new StringField()),
            bonus: new SetField(new StringField())
          })
        }, { label: "NIH.TraitWeaponProf" }),
        armorProf: new SimpleTraitField({}, { label: "NIH.TraitArmorProf" })
      }, { label: "NIH.Traits" }),
      resources: new SchemaField({
        primary: makeResourceField({ label: "NIH.ResourcePrimary" }),
        secondary: makeResourceField({ label: "NIH.ResourceSecondary" }),
        tertiary: makeResourceField({ label: "NIH.ResourceTertiary" })
      }, { label: "NIH.Resources" }),
      favorites: new ArrayField(new SchemaField({
        type: new StringField({ required: true, blank: false }),
        id: new StringField({ required: true, blank: false }),
        sort: new IntegerSortField()
      }), { label: "NIH.Favorites" })
    });
  }

  /* -------------------------------------------- */
  /*  Data Migration                              */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static _migrateData(source) {
    super._migrateData(source);
    AttributesFields._migrateInitiative(source.attributes);
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareBaseData() {
    this.attributes.hd = new HitDice(this.parent);
    this.details.level = 0;
    this.attributes.attunement.value = 0;

    for ( const item of this.parent.items ) {
      if ( item.type === "class" ) this.details.level += item.system.levels;
    }

    // Character proficiency bonus
    this.attributes.prof = Proficiency.calculateMod(this.details.level);

    // Experience required for next level
    const { xp, level } = this.details;
    xp.max = level >= CONFIG.NIH.maxLevel ? Infinity : this.parent.getLevelExp(level || 1);
    xp.min = level ? this.parent.getLevelExp(level - 1) : 0;
    if ( Number.isFinite(xp.max) ) {
      const required = xp.max - xp.min;
      const pct = Math.round((xp.value - xp.min) * 100 / required);
      xp.pct = Math.clamp(pct, 0, 100);
    } else if ( game.settings.get("nih", "levelingMode") === "xpBoons" ) {
      const overflow = xp.value - this.parent.getLevelExp(CONFIG.NIH.maxLevel);
      xp.boonsEarned = Math.max(0, Math.floor(overflow / CONFIG.NIH.epicBoonInterval));
      const progress = overflow - (CONFIG.NIH.epicBoonInterval * xp.boonsEarned);
      xp.pct = Math.clamp(Math.round((progress / CONFIG.NIH.epicBoonInterval) * 100), 0, 100);
    } else {
      xp.pct = 100;
    }

    AttributesFields.prepareBaseArmorClass.call(this);
    AttributesFields.prepareBaseEncumbrance.call(this);
  }

  /* -------------------------------------------- */

  /**
   * Prepare movement & senses values derived from race item.
   */
  prepareEmbeddedData() {
    super.prepareEmbeddedData();
    if ( this.details.race instanceof Item ) {
      AttributesFields.prepareRace.call(this, this.details.race);
      this.details.type = this.details.race.system.type;
    } else {
      this.details.type = new CreatureTypeField({ swarm: false }).initialize({ value: "humanoid" }, this);
    }
    for ( const key of Object.keys(CONFIG.NIH.movementTypes) ) this.attributes.movement[key] ??= 0;
    for ( const key of Object.keys(CONFIG.NIH.senses) ) this.attributes.senses[key] ??= 0;
    this.attributes.movement.units ??= defaultUnits("length");
    this.attributes.senses.units ??= defaultUnits("length");
  }

  /* -------------------------------------------- */

  /**
   * Prepare remaining character data.
   */
  prepareDerivedData() {
    const rollData = this.parent.getRollData({ deterministic: true });
    const { originalSaves, originalSkills } = this.parent.getOriginalStats();

    AttributesFields.prepareExhaustionLevel.call(this);
    this.prepareAbilities({ rollData, originalSaves });
    this.prepareSkills({ rollData, originalSkills });
    this.prepareTools({ rollData });
    AttributesFields.prepareArmorClass.call(this, rollData);
    AttributesFields.prepareConcentration.call(this, rollData);
    AttributesFields.prepareEncumbrance.call(this, rollData);
    AttributesFields.prepareInitiative.call(this, rollData);
    AttributesFields.prepareMovement.call(this, rollData);
    AttributesFields.prepareSpellcastingAbility.call(this);
    TraitsFields.prepareLanguages.call(this);
    TraitsFields.prepareResistImmune.call(this);

    // Hit Points
    const hpOptions = {};
    if ( this.attributes.hp.max === null ) {
      hpOptions.advancement = Object.values(this.parent.classes)
        .map(c => c.advancement.byType.HitPoints?.[0]).filter(a => a);
      hpOptions.bonus = (simplifyBonus(this.attributes.hp.bonuses.level, rollData) * this.details.level)
        + simplifyBonus(this.attributes.hp.bonuses.overall, rollData);
      hpOptions.mod = this.abilities[CONFIG.NIH.defaultAbilities.hitPoints ?? "con"]?.mod ?? 0;
    }
    AttributesFields.prepareHitPoints.call(this, this.attributes.hp, hpOptions);
  }

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Level used to determine cantrip scaling.
   * @param {Item5e} spell  Spell for which to fetch the cantrip level.
   * @returns {number}
   */
  cantripLevel(spell) {
    return this.details.level;
  }

  /* -------------------------------------------- */

  /**
   * Checks whether the item with the given relative UUID has been favorited
   * @param {string} favoriteId  The relative UUID of the item to check.
   * @returns {boolean}
   */
  hasFavorite(favoriteId) {
    return !!this.favorites.find(f => f.id === favoriteId);
  }

  /* -------------------------------------------- */

  /**
   * Add a favorite item to this actor.
   * If the given item is already favorite, this method has no effect.
   * @param {ActorFavorites5e} favorite  The favorite to add.
   * @returns {Promise<Actor5e>}
   * @throws If the item intended to be favorited does not belong to this actor.
   */
  addFavorite(favorite) {
    if ( this.hasFavorite(favorite.id) ) return Promise.resolve(this.parent);

    if ( favorite.id.startsWith(".") && fromUuidSync(favorite.id, { relative: this.parent }) === null ) {
      // Assume that an ID starting with a "." is a relative ID.
      throw new Error(`The item with id ${favorite.id} is not owned by actor ${this.parent.id}`);
    }

    let maxSort = 0;
    const favorites = this.favorites.map(f => {
      if ( f.sort > maxSort ) maxSort = f.sort;
      return { ...f };
    });
    favorites.push({ ...favorite, sort: maxSort + CONST.SORT_INTEGER_DENSITY });
    return this.parent.update({ "system.favorites": favorites });
  }

  /* -------------------------------------------- */

  /**
   * Removes the favorite with the given relative UUID or resource ID
   * @param {string} favoriteId  The relative UUID or resource ID of the favorite to remove.
   * @returns {Promise<Actor5e>}
   */
  removeFavorite(favoriteId) {
    if ( favoriteId.startsWith("resources.") ) return this.parent.update({ [`system.${favoriteId}.max`]: 0 });
    const favorites = this.favorites.filter(f => f.id !== favoriteId);
    return this.parent.update({ "system.favorites": favorites });
  }
}

/* -------------------------------------------- */

/**
 * Produce the schema field for a simple trait.
 * @param {object} schemaOptions  Options passed to the outer schema.
 * @returns {ResourceData}
 */
function makeResourceField(schemaOptions={}) {
  return new SchemaField({
    value: new NumberField({required: true, integer: true, initial: 0, labels: "NIH.ResourceValue"}),
    max: new NumberField({required: true, integer: true, initial: 0, labels: "NIH.ResourceMax"}),
    sr: new BooleanField({required: true, labels: "NIH.REST.Short.Recovery"}),
    lr: new BooleanField({required: true, labels: "NIH.REST.Long.Recovery"}),
    label: new StringField({required: true, labels: "NIH.ResourceLabel"})
  }, schemaOptions);
}
