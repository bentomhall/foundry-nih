import FormulaField from "../fields/formula-field.mjs";

const { BooleanField, SetField, StringField } = foundry.data.fields;

/**
 * @import { TravelPace5e } from "../actor/fields/_types.mjs";
 */

/**
 * Field for storing movement data.
 */
export default class MovementField extends foundry.data.fields.SchemaField {
  constructor(fields={}, { initialUnits=null, ...options }={}) {
    fields = {
      walk: new FormulaField({ deterministic: true, label: "NIH.MOVEMENT.Type.Speed", speed: true }),
      burrow: new FormulaField({ deterministic: true, label: "NIH.MOVEMENT.Type.Burrow", speed: true }),
      climb: new FormulaField({ deterministic: true, label: "NIH.MOVEMENT.Type.Climb", speed: true }),
      fly: new FormulaField({ deterministic: true, label: "NIH.MOVEMENT.Type.Fly", speed: true }),
      swim: new FormulaField({ deterministic: true, label: "NIH.MOVEMENT.Type.Swim", speed: true }),
      bonus: new FormulaField({ deterministic: true, label: "NIH.MOVEMENT.FIELDS.bonus.label" }),
      special: new StringField({ label: "NIH.MOVEMENT.FIELDS.special.label" }),
      units: new StringField({
        required: true, nullable: true, blank: false, initial: initialUnits, label: "NIH.MOVEMENT.FIELDS.units.label"
      }),
      hover: new BooleanField({ required: true, label: "NIH.MOVEMENT.Hover" }),
      ignoredDifficultTerrain: new SetField(new StringField(), {
        label: "NIH.MOVEMENT.FIELDS.ignoredDifficultTerrain.label"
      }),
      ...fields
    };
    Object.entries(fields).forEach(([k, v]) => !v ? delete fields[k] : null);
    super(fields, { label: "NIH.Movement", ...options });
  }

  /* -------------------------------------------- */

  /**
   * Apply rules for travel pace to the given skill.
   * @param {TravelPace5e} pace  The travel pace.
   * @param {string} skill       The skill.
   * @returns {{ advantage: boolean, disadvantage: boolean }}
   */
  static getTravelPaceMode(pace, skill) {
    foundry.utils.logCompatibilityWarning(
      "The `MovementField#getTravelPaceMode` has been moved to `TravelField#getTravelPaceMode.",
      { since: "Nih 5.2", until: "Nih 5.4", once: true }
    );
    return nih.dataModels.actor.TravelField.getTravelPaceMode(pace, skill);
  }

  /* -------------------------------------------- */

  /**
   * Prepare movement data.
   * @this {MovementData}
   * @param {DataField} field  The movement field.
   */
  static prepareData(field) {
    foundry.utils.logCompatibilityWarning(
      "The `MovementField#prepareData` is now handled through `TravelField#prepareData`.",
      { since: "Nih 5.2", until: "Nih 5.4", once: true }
    );
  }
}
