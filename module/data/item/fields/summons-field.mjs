import FormulaField from "../../fields/formula-field.mjs";
import IdentifierField from "../../fields/identifier-field.mjs";

const {
  ArrayField, BooleanField, DocumentIdField, EmbeddedDataField, NumberField, SchemaField, SetField, StringField
} = foundry.data.fields;

/**
 * A field for storing summons data.
 *
 * @param {object} [options={}]  Options to configure this field's behavior.
 */
export default class SummonsField extends EmbeddedDataField {
  constructor(options={}) {
    foundry.utils.logCompatibilityWarning(
      "The `SummonsField` field has been deprecated in favor of the Summons activity.",
      { since: "Nih 5.2", until: "Nih 5.3", once: true }
    );
    super(SummonsData, foundry.utils.mergeObject({ required: false, nullable: true, initial: null }, options));
  }
}

/**
 * Information for a single summoned creature.
 *
 * @typedef {object} SummonsProfile
 * @property {string} _id         Unique ID for this profile.
 * @property {string} count       Formula for the number of creatures to summon.
 * @property {string} cr          Formula for the CR of summoned creatures if in CR mode.
 * @property {object} level
 * @property {number} level.min   Minimum level at which this profile can be used.
 * @property {number} level.max   Maximum level at which this profile can be used.
 * @property {string} name        Display name for this profile if it differs from actor's name.
 * @property {Set<string>} types  Types of summoned creatures if in CR mode.
 * @property {string} uuid        UUID of the actor to summon if in default mode.
 */

/**
 * Data model for summons configuration.
 *
 * @property {object} bonuses
 * @property {string} bonuses.ac            Formula for armor class bonus on summoned actor.
 * @property {string} bonuses.hd            Formula for bonus hit dice to add to each summoned NPC.
 * @property {string} bonuses.hp            Formula for bonus hit points to add to each summoned actor.
 * @property {string} bonuses.attackDamage  Formula for bonus added to damage for attacks.
 * @property {string} bonuses.saveDamage    Formula for bonus added to damage for saving throws.
 * @property {string} bonuses.healing       Formula for bonus added to healing.
 * @property {string} classIdentifier       Class identifier that will be used to determine applicable level.
 * @property {Set<string>} creatureSizes    Set of creature sizes that will be set on summoned creature.
 * @property {Set<string>} creatureTypes    Set of creature types that will be set on summoned creature.
 * @property {object} match
 * @property {boolean} match.attacks        Match the to hit values on summoned actor's attack to the summoner.
 * @property {boolean} match.proficiency    Match proficiency on summoned actor to the summoner.
 * @property {boolean} match.saves          Match the save DC on summoned actor's abilities to the summoner.
 * @property {""|"cr"} mode                 Method of determining what type of creature is summoned.
 * @property {SummonsProfile[]} profiles    Information on creatures that can be summoned.
 * @property {boolean} prompt               Should the player be prompted to place the summons?
 */
export class SummonsData extends foundry.abstract.DataModel {
  constructor(...args) {
    foundry.utils.logCompatibilityWarning(
      "The `SummonsData` data model has been deprecated in favor of the Summon activity.",
      { since: "Nih 5.2", until: "Nih 5.3", once: true }
    );
    super(...args);
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    return {
      bonuses: new SchemaField({
        ac: new FormulaField({
          label: "NIH.Summoning.Bonuses.ArmorClass.Label", hint: "NIH.Summoning.Bonuses.ArmorClass.hint"
        }),
        hd: new FormulaField({
          label: "NIH.Summoning.Bonuses.HitDice.Label", hint: "NIH.Summoning.Bonuses.HitDice.hint"
        }),
        hp: new FormulaField({
          label: "NIH.Summoning.Bonuses.HitPoints.Label", hint: "NIH.Summoning.Bonuses.HitPoints.hint"
        }),
        attackDamage: new FormulaField({
          label: "NIH.Summoning.Bonuses.Attack.Label", hint: "NIH.Summoning.Bonuses.Attack.Hint"
        }),
        saveDamage: new FormulaField({
          label: "NIH.Summoning.Bonuses.Saves.Label", hint: "NIH.Summoning.Bonuses.Saves.Hint"
        }),
        healing: new FormulaField({
          label: "NIH.Summoning.Bonuses.Healing.Label", hint: "NIH.Summoning.Bonuses.Healing.Hint"
        })
      }),
      classIdentifier: new IdentifierField(),
      creatureSizes: new SetField(new StringField(), {
        label: "NIH.Summoning.CreatureSizes.Label", hint: "NIH.Summoning.CreatureSizes.Hint"
      }),
      creatureTypes: new SetField(new StringField(), {
        label: "NIH.Summoning.CreatureTypes.Label", hint: "NIH.Summoning.CreatureTypes.Hint"
      }),
      match: new SchemaField({
        attacks: new BooleanField({
          label: "NIH.Summoning.Match.Attacks.Label", hint: "NIH.Summoning.Match.Attacks.Hint"
        }),
        proficiency: new BooleanField({
          label: "NIH.Summoning.Match.Proficiency.Label", hint: "NIH.Summoning.Match.Proficiency.Hint"
        }),
        saves: new BooleanField({
          label: "NIH.Summoning.Match.Saves.Label", hint: "NIH.Summoning.Match.Saves.Hint"
        })
      }),
      mode: new StringField({label: "NIH.Summoning.Mode.Label", hint: "NIH.Summoning.Mode.Hint"}),
      profiles: new ArrayField(new SchemaField({
        _id: new DocumentIdField({initial: () => foundry.utils.randomID()}),
        count: new FormulaField(),
        cr: new FormulaField({deterministic: true}),
        level: new SchemaField({
          min: new NumberField({integer: true, min: 0}),
          max: new NumberField({integer: true, min: 0})
        }),
        name: new StringField(),
        types: new SetField(new StringField()),
        uuid: new StringField()
      })),
      prompt: new BooleanField({
        initial: true, label: "NIH.Summoning.Prompt.Label", hint: "NIH.Summoning.Prompt.Hint"
      })
    };
  }
}
