import SystemDataModel from "../abstract.mjs";
import ActionTemplate from "./templates/action.mjs";
import ActivatedEffectTemplate from "./templates/activated-effect.mjs";
import EquippableItemTemplate from "./templates/equippable-item.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import PhysicalItemTemplate from "./templates/physical-item.mjs";
import MountableTemplate from "./templates/mountable.mjs";

/**
 * Data definition for Equipment items.
 * @mixes ItemDescriptionTemplate
 * @mixes PhysicalItemTemplate
 * @mixes EquippableItemTemplate
 * @mixes ActivatedEffectTemplate
 * @mixes ActionTemplate
 * @mixes MountableTemplate
 *
 * @property {object} armor             Armor details and equipment type information.
 * @property {string} armor.type        Equipment type as defined in `NIH.equipmentTypes`.
 * @property {number} armor.value       Base armor class or shield bonus.
 * @property {number} armor.dex         Maximum dex bonus added to armor class.
 * @property {string} baseItem          Base armor as defined in `NIH.armorIds` for determining proficiency.
 * @property {object} speed             Speed granted by a piece of vehicle equipment.
 * @property {number} speed.value       Speed granted by this piece of equipment measured in feet or meters
 *                                      depending on system setting.
 * @property {string} speed.conditions  Conditions that may affect item's speed.
 * @property {number} strength          Minimum strength required to use a piece of armor.
 * @property {boolean} stealth          Does this equipment grant disadvantage on stealth checks when used?
 * @property {number} proficient        Does the owner have proficiency in this piece of equipment?
 */
export default class EquipmentData extends SystemDataModel.mixin(
  ItemDescriptionTemplate, PhysicalItemTemplate, EquippableItemTemplate,
  ActivatedEffectTemplate, ActionTemplate, MountableTemplate
) {
  /** @inheritdoc */
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      armor: new foundry.data.fields.SchemaField({
        type: new foundry.data.fields.StringField({
          required: true, initial: "light", label: "NIH.ItemEquipmentType"
        }),
        value: new foundry.data.fields.NumberField({required: true, integer: true, min: 0, label: "NIH.ArmorClass"}),
        dex: new foundry.data.fields.NumberField({required: true, integer: true, label: "NIH.ItemEquipmentDexMod"})
      }, {label: ""}),
      baseItem: new foundry.data.fields.StringField({required: true, label: "NIH.ItemEquipmentBase"}),
      speed: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.NumberField({required: true, min: 0, label: "NIH.Speed"}),
        conditions: new foundry.data.fields.StringField({required: true, label: "NIH.SpeedConditions"})
      }, {label: "NIH.Speed"}),
      strength: new foundry.data.fields.NumberField({
        required: true, integer: true, min: 0, label: "NIH.ItemRequiredStr"
      }),
      stealth: new foundry.data.fields.BooleanField({required: true, label: "NIH.ItemEquipmentStealthDisav"}),
      proficient: new foundry.data.fields.NumberField({
        required: true, min: 0, max: 1, integer: true, initial: null, label: "NIH.ProficiencyLevel"
      })
    });
  }

  /* -------------------------------------------- */
  /*  Migrations                                  */
  /* -------------------------------------------- */

  /** @inheritdoc */
  static migrateData(source) {
    super.migrateData(source);
    EquipmentData.#migrateArmor(source);
    EquipmentData.#migrateStrength(source);
    EquipmentData.#migrateProficient(source);
  }

  /* -------------------------------------------- */

  /**
   * Apply migrations to the armor field.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateArmor(source) {
    if ( !("armor" in source) ) return;
    source.armor ??= {};
    if ( source.armor.type === "bonus" ) source.armor.type = "trinket";
    if ( (typeof source.armor.dex === "string") ) {
      const dex = source.armor.dex;
      if ( dex === "" ) source.armor.dex = null;
      else if ( Number.isNumeric(dex) ) source.armor.dex = Number(dex);
    }
  }

  /* -------------------------------------------- */

  /**
   * Ensure blank strength values are migrated to null, and string values are converted to numbers.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateStrength(source) {
    if ( typeof source.strength !== "string" ) return;
    if ( source.strength === "" ) source.strength = null;
    if ( Number.isNumeric(source.strength) ) source.strength = Number(source.strength);
  }

  /* -------------------------------------------- */

  /**
   * Migrate the proficient field to convert boolean values.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateProficient(source) {
    if ( typeof source.proficient === "boolean" ) source.proficient = Number(source.proficient);
  }

  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * Properties displayed in chat.
   * @type {string[]}
   */
  get chatProperties() {
    return [
      CONFIG.NIH.equipmentTypes[this.armor.type],
      this.parent.labels?.armor ?? null,
      this.stealth ? game.i18n.localize("NIH.StealthDisadvantage") : null
    ];
  }

  /* -------------------------------------------- */

  /**
   * Is this Item any of the armor subtypes?
   * @type {boolean}
   */
  get isArmor() {
    return this.armor.type in CONFIG.NIH.armorTypes;
  }

  /* -------------------------------------------- */

  /**
   * Is this item a separate large object like a siege engine or vehicle component that is
   * usually mounted on fixtures rather than equipped, and has its own AC and HP?
   * @type {boolean}
   */
  get isMountable() {
    return this.armor.type === "vehicle";
  }

  /* -------------------------------------------- */

  /**
   * The proficiency multiplier for this item.
   * @returns {number}
   */
  get proficiencyMultiplier() {
    if ( Number.isFinite(this.proficient) ) return this.proficient;
    const actor = this.parent.actor;
    if ( !actor ) return 0;
    if ( actor.type === "npc" ) return 1; // NPCs are always considered proficient with any armor in their stat block.
    const config = CONFIG.NIH.armorProficienciesMap;
    const itemProf = config[this.armor?.type];
    const actorProfs = actor.system.traits?.armorProf?.value ?? new Set();
    const isProficient = (itemProf === true) || actorProfs.has(itemProf) || actorProfs.has(this.baseItem);
    return Number(isProficient);
  }
}
