import { MappingField } from "../fields.mjs";
import SpellConfigurationData from "./spell-config.mjs";

export default class ItemChoiceConfigurationData extends foundry.abstract.DataModel {
  static defineSchema() {
    return {
      hint: new foundry.data.fields.StringField({label: "NIH.AdvancementHint"}),
      choices: new MappingField(new foundry.data.fields.NumberField(), {
        hint: "NIH.AdvancementItemChoiceLevelsHint"
      }),
      allowDrops: new foundry.data.fields.BooleanField({
        initial: true, label: "NIH.AdvancementConfigureAllowDrops",
        hint: "NIH.AdvancementConfigureAllowDropsHint"
      }),
      type: new foundry.data.fields.StringField({
        blank: false, nullable: true, initial: null,
        label: "NIH.AdvancementItemChoiceType", hint: "NIH.AdvancementItemChoiceTypeHint"
      }),
      pool: new foundry.data.fields.ArrayField(new foundry.data.fields.StringField(), {label: "DOCUMENT.Items"}),
      spell: new foundry.data.fields.EmbeddedDataField(SpellConfigurationData, {nullable: true, initial: null}),
      restriction: new foundry.data.fields.SchemaField({
        type: new foundry.data.fields.StringField({label: "NIH.Type"}),
        subtype: new foundry.data.fields.StringField({label: "NIH.Subtype"}),
        level: new foundry.data.fields.StringField({label: "NIH.SpellLevel"})
      })
    };
  }
}
