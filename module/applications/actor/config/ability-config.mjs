import BaseProficiencyConfig from "./base-proficiency-config.mjs";

/**
 * Configuration application for an actor's abilities.
 */
export default class AbilityConfig extends BaseProficiencyConfig {
  /** @override */
  static DEFAULT_OPTIONS = {
    trait: "saves"
  };

  /* -------------------------------------------- */

  /** @override */
  static PARTS = {
    config: {
      template: "systems/nih/templates/actors/config/ability-config.hbs"
    }
  };

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /** @override */
  get propertyConfig() {
    return CONFIG.NIH.abilities[this.options.key];
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
    context.proficiencyOptions = [
      { value: 0, label: CONFIG.NIH.proficiencyLevels[0] },
      { value: 1, label: CONFIG.NIH.proficiencyLevels[1] }
    ];
    context.checkLabel = game.i18n.format("NIH.ABILITY.Configure.CheckLabel", { ability: context.label });
    context.saveLabel = game.i18n.format("NIH.ABILITY.Configure.SaveLabel", { ability: context.label });
    return context;
  }
}
