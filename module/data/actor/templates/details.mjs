import LocalDocumentField from "../../fields/local-document-field.mjs";
const { HTMLField, SchemaField, StringField } = foundry.data.fields;

/**
 * @import { DetailsCommonData, DetailsCreatureData } from "./_types.mjs";
 */

/**
 * Shared contents of the details schema between various actor types.
 */
export default class DetailsField {
  /**
   * Fields shared between characters, NPCs, and vehicles.
   * @type {DetailsCommonData}
   */
  static get common() {
    return {
      biography: new SchemaField({
        value: new HTMLField({label: "NIH.Biography"}),
        public: new HTMLField({label: "NIH.BiographyPublic"})
      }, {label: "NIH.Biography"})
    };
  }

  /* -------------------------------------------- */

  /**
   * Fields shared between characters and NPCs.
   * @type {DetailsCreatureData}
   */
  static get creature() {
    return {
      alignment: new StringField({required: true, label: "NIH.Alignment"}),
      ideal: new StringField({required: true, label: "NIH.Ideals"}),
      bond: new StringField({required: true, label: "NIH.Bonds"}),
      flaw: new StringField({required: true, label: "NIH.Flaws"}),
      race: new LocalDocumentField(foundry.documents.BaseItem, {
        required: true, fallback: true, label: "NIH.Species"
      })
    };
  }
}
