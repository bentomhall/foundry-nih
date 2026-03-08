import BaseSettingsConfig from "./base-settings.mjs";

/**
 * An application for configuring combat settings.
 */
export default class CombatSettingsConfig extends BaseSettingsConfig {
  /** @override */
  static DEFAULT_OPTIONS = {
    window: {
      title: "SETTINGS.NIH.COMBAT.Label"
    }
  };

  /* -------------------------------------------- */

  /** @override */
  static PARTS = {
    initiative: {
      template: "systems/nih/templates/settings/base-config.hbs"
    },
    criticals: {
      template: "systems/nih/templates/settings/base-config.hbs"
    },
    npcs: {
      template: "systems/nih/templates/settings/base-config.hbs"
    },
    footer: {
      template: "templates/generic/form-footer.hbs"
    }
  };

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
    switch ( partId ) {
      case "initiative":
        context.fields = [
          this.createSettingField("initiativeDexTiebreaker"),
          this.createSettingField("initiativeScore")
        ];
        context.legend = game.i18n.localize("NIH.Initiative");
        break;
      case "criticals":
        context.fields = [
          this.createSettingField("criticalDamageModifiers"),
          this.createSettingField("criticalDamageMaxDice")
        ];
        context.legend = game.i18n.localize("SETTINGS.NIH.CRITICAL.Name");
        break;
      case "npcs":
        context.fields = [
          this.createSettingField("autoRecharge"),
          this.createSettingField("autoRollNPCHP")
        ];
        context.legend = game.i18n.localize("SETTINGS.NIH.NPCS.Name");
        break;
    }
    return context;
  }
}
