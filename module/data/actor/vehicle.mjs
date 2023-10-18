import { FormulaField } from "../fields.mjs";
import AttributesFields from "./templates/attributes.mjs";
import CommonTemplate from "./templates/common.mjs";
import DetailsFields from "./templates/details.mjs";
import TraitsFields from "./templates/traits.mjs";

/**
 * System data definition for Vehicles.
 *
 * @property {string} vehicleType                      Type of vehicle as defined in `NIH.vehicleTypes`.
 * @property {object} attributes
 * @property {object} attributes.ac
 * @property {number} attributes.ac.flat               Flat value used for flat or natural armor calculation.
 * @property {string} attributes.ac.calc               Name of one of the built-in formulas to use.
 * @property {string} attributes.ac.formula            Custom formula to use.
 * @property {string} attributes.ac.motionless         Changes to vehicle AC when not moving.
 * @property {object} attributes.hp
 * @property {number} attributes.hp.value              Current hit points.
 * @property {number} attributes.hp.max                Maximum allowed HP value.
 * @property {number} attributes.hp.temp               Temporary HP applied on top of value.
 * @property {number} attributes.hp.tempmax            Temporary change to the maximum HP.
 * @property {number} attributes.hp.dt                 Damage threshold.
 * @property {number} attributes.hp.mt                 Mishap threshold.
 * @property {object} attributes.actions               Information on how the vehicle performs actions.
 * @property {boolean} attributes.actions.stations     Does this vehicle rely on action stations that required
 *                                                     individual crewing rather than general crew thresholds?
 * @property {number} attributes.actions.value         Maximum number of actions available with full crewing.
 * @property {object} attributes.actions.thresholds    Crew thresholds needed to perform various actions.
 * @property {number} attributes.actions.thresholds.2  Minimum crew needed to take full action complement.
 * @property {number} attributes.actions.thresholds.1  Minimum crew needed to take reduced action complement.
 * @property {number} attributes.actions.thresholds.0  Minimum crew needed to perform any actions.
 * @property {object} attributes.capacity              Information on the vehicle's carrying capacity.
 * @property {string} attributes.capacity.creature     Description of the number of creatures the vehicle can carry.
 * @property {number} attributes.capacity.cargo        Cargo carrying capacity measured in tons.
 * @property {object} traits
 * @property {string} traits.dimensions                Width and length of the vehicle.
 * @property {object} cargo                            Details on this vehicle's crew and cargo capacities.
 * @property {PassengerData[]} cargo.crew              Creatures responsible for operating the vehicle.
 * @property {PassengerData[]} cargo.passengers        Creatures just takin' a ride.
 */
export default class VehicleData extends CommonTemplate {

  /** @inheritdoc */
  static _systemType = "vehicle";

  /* -------------------------------------------- */

  /** @inheritdoc */
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      vehicleType: new foundry.data.fields.StringField({required: true, initial: "water", label: "NIH.VehicleType"}),
      attributes: new foundry.data.fields.SchemaField({
        ...AttributesFields.common,
        ac: new foundry.data.fields.SchemaField({
          flat: new foundry.data.fields.NumberField({integer: true, min: 0, label: "NIH.ArmorClassFlat"}),
          calc: new foundry.data.fields.StringField({initial: "default", label: "NIH.ArmorClassCalculation"}),
          formula: new FormulaField({deterministic: true, label: "NIH.ArmorClassFormula"}),
          motionless: new foundry.data.fields.StringField({required: true, label: "NIH.ArmorClassMotionless"})
        }, {label: "NIH.ArmorClass"}),
        hp: new foundry.data.fields.SchemaField({
          value: new foundry.data.fields.NumberField({
            nullable: true, integer: true, min: 0, initial: null, label: "NIH.HitPointsCurrent"
          }),
          max: new foundry.data.fields.NumberField({
            nullable: true, integer: true, min: 0, initial: null, label: "NIH.HitPointsMax"
          }),
          temp: new foundry.data.fields.NumberField({integer: true, initial: 0, min: 0, label: "NIH.HitPointsTemp"}),
          tempmax: new foundry.data.fields.NumberField({integer: true, initial: 0, label: "NIH.HitPointsTempMax"}),
          dt: new foundry.data.fields.NumberField({
            required: true, integer: true, min: 0, label: "NIH.DamageThreshold"
          }),
          mt: new foundry.data.fields.NumberField({
            required: true, integer: true, min: 0, label: "NIH.VehicleMishapThreshold"
          })
        }, {label: "NIH.HitPoints"}),
        actions: new foundry.data.fields.SchemaField({
          stations: new foundry.data.fields.BooleanField({required: true, label: "NIH.VehicleActionStations"}),
          value: new foundry.data.fields.NumberField({
            required: true, nullable: false, integer: true, initial: 0, min: 0, label: "NIH.VehicleActionMax"
          }),
          thresholds: new foundry.data.fields.SchemaField({
            2: new foundry.data.fields.NumberField({
              required: true, integer: true, min: 0, label: "NIH.VehicleActionThresholdsFull"
            }),
            1: new foundry.data.fields.NumberField({
              required: true, integer: true, min: 0, label: "NIH.VehicleActionThresholdsMid"
            }),
            0: new foundry.data.fields.NumberField({
              required: true, integer: true, min: 0, label: "NIH.VehicleActionThresholdsMin"
            })
          }, {label: "NIH.VehicleActionThresholds"})
        }, {label: "NIH.VehicleActions"}),
        capacity: new foundry.data.fields.SchemaField({
          creature: new foundry.data.fields.StringField({required: true, label: "NIH.VehicleCreatureCapacity"}),
          cargo: new foundry.data.fields.NumberField({
            required: true, nullable: false, integer: true, initial: 0, min: 0, label: "NIH.VehicleCargoCapacity"
          })
        }, {label: "NIH.VehicleCargoCrew"})
      }, {label: "NIH.Attributes"}),
      details: new foundry.data.fields.SchemaField({
        ...DetailsFields.common,
        source: new foundry.data.fields.StringField({required: true, label: "NIH.Source"})
      }, {label: "NIH.Details"}),
      traits: new foundry.data.fields.SchemaField({
        ...TraitsFields.common,
        size: new foundry.data.fields.StringField({required: true, initial: "lg", label: "NIH.Size"}),
        di: TraitsFields.makeDamageTrait({label: "NIH.DamImm"}, {initial: ["poison", "psychic"]}),
        ci: TraitsFields.makeSimpleTrait({label: "NIH.ConImm"}, {initial: [
          "blinded", "charmed", "deafened", "frightened", "paralyzed",
          "petrified", "poisoned", "stunned", "unconscious"
        ]}),
        dimensions: new foundry.data.fields.StringField({required: true, label: "NIH.Dimensions"})
      }, {label: "NIH.Traits"}),
      cargo: new foundry.data.fields.SchemaField({
        crew: new foundry.data.fields.ArrayField(makePassengerData(), {label: "NIH.VehicleCrew"}),
        passengers: new foundry.data.fields.ArrayField(makePassengerData(), {label: "NIH.VehiclePassengers"})
      }, {label: "NIH.VehicleCrewPassengers"})
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  static migrateData(source) {
    super.migrateData(source);
    AttributesFields._migrateInitiative(source.attributes);
  }
}

/* -------------------------------------------- */

/**
 * Data structure for an entry in a vehicle's crew or passenger lists.
 *
 * @typedef {object} PassengerData
 * @property {string} name      Name of individual or type of creature.
 * @property {number} quantity  How many of this creature are onboard?
 */

/**
 * Produce the schema field for a simple trait.
 * @param {object} schemaOptions  Options passed to the outer schema.
 * @returns {PassengerData}
 */
function makePassengerData(schemaOptions={}) {
  return new foundry.data.fields.SchemaField({
    name: new foundry.data.fields.StringField({required: true, label: "NIH.VehiclePassengerName"}),
    quantity: new foundry.data.fields.NumberField({
      required: true, nullable: false, integer: true, initial: 0, min: 0, label: "NIH.VehiclePassengerQuantity"
    })
  }, schemaOptions);
}
