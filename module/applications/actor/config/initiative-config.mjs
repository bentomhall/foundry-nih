import BaseConfigSheet from "../api/base-config-sheet.mjs";

const { BooleanField } = foundry.data.fields;

/**
 * Configuration application for an actor's initiative.
 */
export default class InitiativeConfig extends BaseConfigSheet {

  /** @override */
  static DEFAULT_OPTIONS = {
    position: {
      width: 420
    }
  };

  /* -------------------------------------------- */

  /** @override */
  static PARTS = {
    config: {
      template: "systems/nih/templates/actors/config/initiative-config.hbs"
    }
  };

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /** @override */
  get title() {
    return game.i18n.localize("NIH.Initiative");
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
    const source = this.document._source;

    const defaultAbility = CONFIG.NIH.abilities[CONFIG.NIH.defaultAbilities.initiative];
    context.abilityOptions = [
      { value: "", label: game.i18n.format("NIH.DefaultSpecific", { default: defaultAbility.label.toLowerCase() }) },
      { rule: true },
      ...Object.entries(CONFIG.NIH.abilities).map(([value, { label }]) => ({ value, label }))
    ];
    context.data = source.system.attributes.init;
    context.fields = this.document.system.schema.fields.attributes.fields.init.fields;

    const ability = this.document.system.attributes.init.ability || CONFIG.NIH.defaultAbilities.initiative;
    const abilityConfig = CONFIG.NIH.abilities[ability];
    context.ability = {
      label: game.i18n.format("NIH.AbilityCheckConfigure", { ability: abilityConfig.label }),
      global: {
        field: this.document.system.schema.fields.bonuses?.fields.abilities.fields.check,
        name: "system.bonuses.abilities.check",
        value: source.system.bonuses?.abilities.check
      },
      local: {
        field: this.document.system.schema.fields.abilities.model.fields.bonuses.fields.check,
        name: `system.abilities.${ability}.bonuses.check`,
        value: source.system.abilities[ability]?.bonuses.check
      }
    };

    context.flags = {
      alert: {
        field: new BooleanField({ label: game.i18n.localize("NIH.FlagsAlert") }),
        name: "flags.nih.initiativeAlert",
        value: source.flags.nih?.initiativeAlert
      }
    };

    return context;
  }
}
