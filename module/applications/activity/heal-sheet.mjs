import ActivitySheet from "./activity-sheet.mjs";

/**
 * Sheet for the healing activity.
 */
export default class HealSheet extends ActivitySheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    classes: ["heal-activity"]
  };

  /* -------------------------------------------- */

  /** @inheritDoc */
  static PARTS = {
    ...super.PARTS,
    effect: {
      template: "systems/nih/templates/activity/heal-effect.hbs",
      templates: [
        ...super.PARTS.effect.templates,
        "systems/nih/templates/activity/parts/damage-part.hbs",
        "systems/nih/templates/activity/parts/heal-healing.hbs"
      ]
    }
  };

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareEffectContext(context, options) {
    context = await super._prepareEffectContext(context, options);
    context.typeOptions = Object.entries(CONFIG.NIH.healingTypes).map(([value, config]) => ({
      value, label: config.label, selected: context.activity.healing.types.has(value)
    }));
    const scaleKey = (this.item.type === "spell" && this.item.system.level === 0) ? "labelCantrip" : "label";
    context.scalingOptions = [
      { value: "", label: game.i18n.localize("NIH.DAMAGE.Scaling.None") },
      ...Object.entries(CONFIG.NIH.damageScalingModes).map(([value, { [scaleKey]: label }]) => ({ value, label }))
    ];
    return context;
  }
}
