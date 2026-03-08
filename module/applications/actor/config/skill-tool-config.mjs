import BaseProficiencyConfig from "./base-proficiency-config.mjs";

/**
 * @import { SkillConfiguration, ToolConfiguration } from "../../../_types.mjs";
 */

/**
 * Configuration application for an actor's skills & tools.
 */
export default class SkillToolConfig extends BaseProficiencyConfig {

  /** @override */
  static PARTS = {
    config: {
      template: "systems/nih/templates/actors/config/skill-tool-config.hbs"
    }
  };

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Configuration data for the ability being edited.
   * @type {SkillConfiguration|ToolConfiguration}
   */
  get propertyConfig() {
    return CONFIG.NIH[this.options.trait === "skills" ? "skills" : "tools"][this.options.key];
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
    context.abilityOptions = Object.entries(CONFIG.NIH.abilities).map(([value, { label }]) => ({ value, label }));
    context.proficiencyOptions = Object.entries(CONFIG.NIH.proficiencyLevels)
      .map(([value, label]) => ({ value, label }));
    context.section = `NIH.${this.options.trait === "skills" ? "SKILL" : "TOOL"}.SECTIONS.`;
    context.global.skill = this.options.trait === "skills";
    return context;
  }
}
