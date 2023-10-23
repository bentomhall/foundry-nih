import SystemDataModel from "../abstract.mjs";
import { AdvancementField, IdentifierField } from "../fields.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";

/**
 * Data definition for Class items.
 * @mixes ItemDescriptionTemplate
 *
 * @property {string} identifier        Identifier slug for this class.
 * @property {number} levels            Current number of levels in this class.
 * @property {string} hitDice           Denomination of hit dice available as defined in `NIH.hitDieTypes`.
 * @property {number} hitDiceUsed       Number of hit dice consumed.
 * @property {object[]} advancement     Advancement objects for this class.
 * @property {string[]} saves           Savings throws in which this class grants proficiency.
 * @property {object} skills            Available class skills and selected skills.
 * @property {number} skills.number     Number of skills selectable by the player.
 * @property {string[]} skills.choices  List of skill keys that are valid to be chosen.
 * @property {string[]} skills.value    List of skill keys the player has chosen.
 * @property {object} spellcasting      Details on class's spellcasting ability.
 * @property {string} spellcasting.progression  Spell access progression granted by class as from `NIH.spellProgression`.
 * @property {string} spellcasting.ability      Ability score to use for spellcasting.
 * @property {number} spellcasting.multiplier   Aether progression multiplier (level * multiplier, rounded up)
 * @property {object} stamina
 * @property {boolean} stamina.includesCon
 * @property {number} stamina.multiplier        Stamina = (level * multiplier) + (includesCon ? con mod : 0);
 */
export default class ClassData extends SystemDataModel.mixin(ItemDescriptionTemplate) {
  /** @inheritdoc */
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      identifier: new IdentifierField({required: true, label: "NIH.Identifier"}),
      levels: new foundry.data.fields.NumberField({
        required: true, nullable: false, integer: true, min: 0, initial: 1, label: "NIH.ClassLevels"
      }),
      hitDice: new foundry.data.fields.StringField({
        required: true, initial: "d6", blank: false, label: "NIH.HitDice",
        validate: v => /d\d+/.test(v), validationError: "must be a dice value in the format d#"
      }),
      hitDiceUsed: new foundry.data.fields.NumberField({
        required: true, nullable: false, integer: true, initial: 0, min: 0, label: "NIH.HitDiceUsed"
      }),
      advancement: new foundry.data.fields.ArrayField(new AdvancementField(), {label: "NIH.AdvancementTitle"}),
      saves: new foundry.data.fields.ArrayField(new foundry.data.fields.StringField(), {label: "NIH.ClassSaves"}),
      skills: new foundry.data.fields.SchemaField({
        number: new foundry.data.fields.NumberField({
          required: true, nullable: false, integer: true, min: 0, initial: 2, label: "NIH.ClassSkillsNumber"
        }),
        choices: new foundry.data.fields.ArrayField(
          new foundry.data.fields.StringField(), {label: "NIH.ClassSkillsEligible"}
        ),
        value: new foundry.data.fields.ArrayField(
          new foundry.data.fields.StringField(), {label: "NIH.ClassSkillsChosen"}
        )
      }),
      spellcasting: new foundry.data.fields.SchemaField({
        progression: new foundry.data.fields.StringField({
          required: true, initial: "martial", blank: false, label: "NIH.SpellProgression"
        }),
        ability: new foundry.data.fields.StringField({required: true, label: "NIH.SpellAbility"}),
        multiplier: new foundry.data.fields.NumberField({required: true, nullable: false, integer: false, min: 0.5, initial: 0.5, label: "NIH.SpellMultiplier"})
      }, {label: "NIH.Spellcasting"}),
      stamina: new foundry.data.fields.SchemaField({
        includesCon: new foundry.data.fields.BoolField({required: true, initial: false, blank: false, label: "NIH.StaminaIncludesCon"}),
        multiplier: new foundry.data.fields.NumberField({
          required: true, nullable: false, integer: false, min: 0.5, initial: 1, label: "NIH.StaminaMultiplier"
        })
      })
    });
  }

  /* -------------------------------------------- */
  /*  Migrations                                  */
  /* -------------------------------------------- */

  /** @inheritdoc */
  static migrateData(source) {
    super.migrateData(source);
    ClassData.#migrateLevels(source);
    ClassData.#migrateSpellcastingData(source);
  }

  /* -------------------------------------------- */

  /**
   * Migrate the class levels.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateLevels(source) {
    if ( typeof source.levels !== "string" ) return;
    if ( source.levels === "" ) source.levels = 1;
    else if ( Number.isNumeric(source.levels) ) source.levels = Number(source.levels);
  }

  /* -------------------------------------------- */

  /**
   * Migrate the class's spellcasting string to object.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateSpellcastingData(source) {
    if ( source.spellcasting?.progression === "" ) source.spellcasting.progression = "none";
    if ( typeof source.spellcasting !== "string" ) return;
    source.spellcasting = {
      progression: source.spellcasting,
      ability: ""
    };
  }
}
