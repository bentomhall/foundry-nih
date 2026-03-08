const { StringField } = foundry.data.fields;

/**
 * Field for storing creature type data.
 */
export default class CreatureTypeField extends foundry.data.fields.SchemaField {
  constructor(fields={}, options={}) {
    fields = {
      value: new StringField({ blank: true, label: "NIH.CreatureType" }),
      subtype: new StringField({ label: "NIH.CreatureTypeSelectorSubtype" }),
      swarm: new StringField({ blank: true, label: "NIH.CreatureSwarmSize" }),
      custom: new StringField({ label: "NIH.CreatureTypeSelectorCustom" }),
      ...fields
    };
    Object.entries(fields).forEach(([k, v]) => !v ? delete fields[k] : null);
    super(fields, { label: "NIH.CreatureType", ...options });
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  initialize(value, model, options={}) {
    const obj = super.initialize(value, model, options);

    Object.defineProperty(obj, "label", {
      get() {
        return nih.documents.Actor5e.formatCreatureType(this);
      },
      enumerable: false
    });
    Object.defineProperty(obj, "config", {
      get() {
        return CONFIG.NIH.creatureTypes[this.value];
      },
      enumerable: false
    });

    return obj;
  }
}
