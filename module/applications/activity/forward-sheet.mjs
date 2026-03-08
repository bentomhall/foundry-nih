import ActivitySheet from "./activity-sheet.mjs";

/**
 * Sheet for the forward activity.
 */
export default class ForwardSheet extends ActivitySheet {

  /** @inheritDoc */
  static DEFAULT_OPTIONS = {
    classes: ["forward-activity"]
  };

  /* -------------------------------------------- */

  /** @inheritDoc */
  static PARTS = {
    ...super.PARTS,
    activation: {
      template: "systems/nih/templates/activity/forward-activation.hbs",
      templates: [
        "systems/nih/templates/activity/parts/activity-consumption.hbs"
      ]
    },
    effect: {
      template: "systems/nih/templates/activity/forward-effect.hbs"
    }
  };

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareActivationContext(context, options) {
    context = await super._prepareActivationContext(context, options);
    context.showConsumeSpellSlot = false;
    context.showScaling = true;
    return context;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareEffectContext(context, options) {
    context = await super._prepareEffectContext(context, options);
    context.activityOptions = [
      { value: "", label: "" },
      ...this.item.system.activities.contents
        .filter(a => (a.type !== "forward") && (CONFIG.NIH.activityTypes[a.type] !== false))
        .map(activity => ({ value: activity.id, label: activity.name }))
    ];
    return context;
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareIdentityContext(context, options) {
    context = await super._prepareIdentityContext(context, options);
    context.behaviorFields = [];
    return context;
  }

  /* -------------------------------------------- */

  /**
   * Prepare the tab information for the sheet.
   * @returns {Record<string, Partial<ApplicationTab>>}
   * @protected
   */
  _getTabs() {
    return this._markTabs({
      identity: {
        id: "identity", group: "sheet", icon: "fa-solid fa-tag",
        label: "NIH.ACTIVITY.SECTIONS.Identity"
      },
      activation: {
        id: "activation", group: "sheet", icon: "fa-solid fa-boxes-stacked",
        label: "NIH.CONSUMPTION.FIELDS.consumption.label"
      },
      effect: {
        id: "effect", group: "sheet", icon: "fa-solid fa-sun",
        label: "NIH.ACTIVITY.SECTIONS.Effect"
      }
    });
  }
}
