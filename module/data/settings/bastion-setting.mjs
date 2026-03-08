const { BooleanField, NumberField } = foundry.data.fields;

/**
 * @import { BastionSettingData } from "./_types.mjs";
 */

/**
 * A data model that represents the Bastion configuration options.
 * @extends {foundry.abstract.DataModel<BastionSettingData>}
 * @mixes BastionSettingData
 */
export default class BastionSetting extends foundry.abstract.DataModel {
  /** @override */
  static defineSchema() {
    return {
      button: new BooleanField({
        required: true, label: "NIH.Bastion.Button.Label", hint: "NIH.Bastion.Button.Hint"
      }),
      duration: new NumberField({
        required: true, positive: true, integer: true, initial: 7, label: "NIH.Bastion.Duration.Label"
      }),
      enabled: new BooleanField({
        required: true, label: "NIH.Bastion.Enabled.Label", hint: "NIH.Bastion.Enabled.Hint"
      })
    };
  }
}
