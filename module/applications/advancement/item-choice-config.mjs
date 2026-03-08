import AdvancementConfig from "./advancement-config-v2.mjs";

/**
 * Configuration application for item choices.
 */
export default class ItemChoiceConfig extends AdvancementConfig {
  /** @override */
  static DEFAULT_OPTIONS = {
    classes: ["item-choice", "three-column"],
    dropKeyPath: "pool",
    position: {
      width: 800
    }
  };

  /* -------------------------------------------- */

  /** @inheritDoc */
  static PARTS = {
    config: {
      container: { classes: ["column-container"], id: "column-left" },
      template: "systems/nih/templates/advancement/advancement-controls-section.hbs"
    },
    details: {
      container: { classes: ["column-container"], id: "column-left" },
      template: "systems/nih/templates/advancement/item-choice-config-details.hbs"
    },
    spellConfig: {
      container: { classes: ["column-container"], id: "column-left" },
      template: "systems/nih/templates/advancement/advancement-spell-config-section.hbs"
    },
    items: {
      container: { classes: ["column-container"], id: "column-center" },
      template: "systems/nih/templates/advancement/item-choice-config-items.hbs"
    },
    levels: {
      container: { classes: ["column-container"], id: "column-right" },
      template: "systems/nih/templates/advancement/item-choice-config-levels.hbs"
    }
  };

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    context.items = this.advancement.configuration.pool.map(data => ({
      data,
      fields: this.advancement.configuration.schema.fields.pool.element.fields,
      index: fromUuidSync(data.uuid)
    }));

    context.abilityOptions = Object.entries(CONFIG.NIH.abilities).map(([value, { label }]) => ({ value, label }));
    context.choices = context.levels.reduce((obj, { value, label }) => {
      obj[value] = { label, ...this.advancement.configuration.choices[value] };
      return obj;
    }, {});
    context.levelRestrictionOptions = [
      { value: "", label: "" },
      {
        value: "available",
        label: game.i18n.localize("NIH.ADVANCEMENT.ItemChoice.FIELDS.restriction.level.Available")
      },
      { rule: true },
      ...Object.entries(CONFIG.NIH.spellLevels).map(([value, label]) => ({ value, label }))
    ];
    context.listRestrictionOptions = nih.registry.spellLists.options;
    context.showContainerWarning = context.items.some(i => i.index?.type === "container");
    context.showSpellConfig = this.advancement.configuration.type === "spell";

    const { spell } = this.advancement.configuration;
    const model = CONFIG.NIH.spellcasting[spell?.method];
    context.showRequireSpellSlot = !spell?.method || model?.slots;
    context.canPrepare = model?.prepares;
    context.spellcastingMethods = Object.values(CONFIG.NIH.spellcasting).map(({ key, label }) => {
      return { label, value: key };
    });
    if ( spell?.method && !(spell.method in CONFIG.NIH.spellcasting) ) {
      context.spellcastingMethods.push({ label: spell.method, value: spell.method });
    }

    context.typeOptions = [
      { value: "", label: game.i18n.localize("NIH.ADVANCEMENT.ItemChoice.FIELDS.type.Any") },
      { rule: true },
      ...this.advancement.constructor.VALID_TYPES
        .map(value => ({ value, label: game.i18n.localize(CONFIG.Item.typeLabels[value]) }))
    ];

    if ( this.advancement.configuration.type === "feat" ) {
      const selectedType = CONFIG.NIH.featureTypes[this.advancement.configuration.restriction.type];
      context.typeRestriction = {
        typeLabel: game.i18n.localize("NIH.ItemFeatureType"),
        typeOptions: [
          { value: "", label: "" },
          ...Object.entries(CONFIG.NIH.featureTypes).map(([value, { label }]) => ({ value, label }))
        ],
        subtypeLabel: game.i18n.format("NIH.ItemFeatureSubtype", {category: selectedType?.label}),
        subtypeOptions: selectedType?.subtypes ? [
          { value: "", label: "" },
          ...Object.entries(selectedType.subtypes).map(([value, label]) => ({ value, label }))
        ] : null
      };
    }

    return context;
  }

  /* -------------------------------------------- */
  /*  Form Handling                               */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async prepareConfigurationUpdate(configuration) {
    if ( configuration.choices ) configuration.choices = this.constructor._cleanedObject(configuration.choices);
    if ( configuration.spell ) configuration.spell.ability ??= [];
    if ( configuration.pool ) configuration.pool = Object.values(configuration.pool);

    // Ensure items are still valid if type restriction or spell restriction are changed
    const pool = [];
    for ( const item of (configuration.pool ?? this.advancement.configuration.pool) ) {
      if ( this.advancement._validateItemType(await fromUuid(item.uuid), {
        type: false, strict: false
      }) ) pool.push(item);
    }
    configuration.pool = pool;

    return configuration;
  }

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  /** @inheritDoc */
  _validateDroppedItem(event, item) {
    this.advancement._validateItemType(item, { type: false });
  }
}
