import CompendiumBrowser from "./applications/compendium-browser.mjs";
import BastionSettingsConfig from "./applications/settings/bastion-settings.mjs";
import CalendarSettingsConfig from "./applications/settings/calendar-settings.mjs";
import CombatSettingsConfig from "./applications/settings/combat-settings.mjs";
import CompendiumBrowserSettingsConfig from "./applications/settings/compendium-browser-settings.mjs";
import ModuleArtSettingsConfig from "./applications/settings/module-art-settings.mjs";
import VariantRulesSettingsConfig from "./applications/settings/variant-rules-settings.mjs";
import VisibilitySettingsConfig from "./applications/settings/visibility-settings.mjs";
import BastionSetting from "./data/settings/bastion-setting.mjs";
import { CalendarConfigSetting, CalendarPreferencesSetting } from "./data/settings/calendar-setting.mjs";
import PrimaryPartySetting from "./data/settings/primary-party-setting.mjs";
import TransformationSetting from "./data/settings/transformation-setting.mjs";
import * as LEGACY from "./config-legacy.mjs";

const { StringField } = foundry.data.fields;

/**
 * Register all of the system's keybindings.
 */
export function registerSystemKeybindings() {
  game.keybindings.register("nih", "skipDialogNormal", {
    name: "KEYBINDINGS.NIH.SkipDialogNormal",
    editable: [{ key: "ShiftLeft" }, { key: "ShiftRight" }]
  });

  game.keybindings.register("nih", "skipDialogAdvantage", {
    name: "KEYBINDINGS.NIH.SkipDialogAdvantage",
    editable: [{ key: "AltLeft" }, { key: "AltRight" }]
  });

  game.keybindings.register("nih", "skipDialogDisadvantage", {
    name: "KEYBINDINGS.NIH.SkipDialogDisadvantage",
    editable: [{ key: "ControlLeft" }, { key: "ControlRight" }, { key: "OsLeft" }, { key: "OsRight" }]
  });

  game.keybindings.register("nih", "dragCopy", {
    name: "KEYBINDINGS.NIH.DragCopy",
    editable: [{ key: "ControlLeft" }, { key: "ControlRight" }, { key: "AltLeft" }, { key: "AltRight" }]
  });

  game.keybindings.register("nih", "dragMove", {
    name: "KEYBINDINGS.NIH.DragMove",
    editable: [{ key: "ShiftLeft" }, { key: "ShiftRight" }, { key: "OsLeft" }, { key: "OsRight" }]
  });
}

/* -------------------------------------------- */

/**
 * Register all of the system's settings.
 */
export function registerSystemSettings() {
  // Internal System Migration Version
  game.settings.register("nih", "systemMigrationVersion", {
    name: "System Migration Version",
    scope: "world",
    config: false,
    type: String,
    default: ""
  });

  // Polymorph Settings
  game.settings.register("nih", "transformationSettings", {
    scope: "client",
    config: false,
    type: TransformationSetting
  });

  // Rules version
  game.settings.register("nih", "rulesVersion", {
    name: "SETTINGS.NIH.RULESVERSION.Name",
    hint: "SETTINGS.NIH.RULESVERSION.Hint",
    scope: "world",
    config: true,
    default: "modern",
    type: String,
    choices: {
      modern: "SETTINGS.NIH.RULESVERSION.Modern",
      legacy: "SETTINGS.NIH.RULESVERSION.Legacy"
    },
    requiresReload: true
  });

  // Movement automation
  game.settings.register("nih", "movementAutomation", {
    name: "SETTINGS.NIH.AUTOMATION.Movement.Name",
    hint: "SETTINGS.NIH.AUTOMATION.Movement.Hint",
    scope: "world",
    config: true,
    default: "full",
    type: String,
    choices: {
      full: "SETTINGS.NIH.AUTOMATION.Movement.Full",
      noBlocking: "SETTINGS.NIH.AUTOMATION.Movement.NoBlocking",
      none: "SETTINGS.NIH.AUTOMATION.Movement.None"
    }
  });

  // Allow rotating square templates
  game.settings.register("nih", "gridAlignedSquareTemplates", {
    name: "SETTINGS.5eGridAlignedSquareTemplatesN",
    hint: "SETTINGS.5eGridAlignedSquareTemplatesL",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  // Loyalty
  game.settings.register("nih", "loyaltyScore", {
    name: "SETTINGS.NIH.LOYALTY.Name",
    hint: "SETTINGS.NIH.LOYALTY.Hint",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Disable Advancements
  game.settings.register("nih", "disableAdvancements", {
    name: "SETTINGS.5eNoAdvancementsN",
    hint: "SETTINGS.5eNoAdvancementsL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Disable Concentration Tracking
  game.settings.register("nih", "disableConcentration", {
    name: "SETTINGS.5eNoConcentrationN",
    hint: "SETTINGS.5eNoConcentrationL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Collapse Item Cards (by default)
  game.settings.register("nih", "autoCollapseItemCards", {
    name: "SETTINGS.5eAutoCollapseCardN",
    hint: "SETTINGS.5eAutoCollapseCardL",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
    onChange: s => {
      ui.chat.render();
    }
  });

  // Collapse Chat Card Trays
  game.settings.register("nih", "autoCollapseChatTrays", {
    name: "SETTINGS.NIH.COLLAPSETRAYS.Name",
    hint: "SETTINGS.NIH.COLLAPSETRAYS.Hint",
    scope: "client",
    config: true,
    default: "older",
    type: String,
    choices: {
      manual: "SETTINGS.NIH.COLLAPSETRAYS.Manual",
      never: "SETTINGS.NIH.COLLAPSETRAYS.Never",
      older: "SETTINGS.NIH.COLLAPSETRAYS.Older",
      always: "SETTINGS.NIH.COLLAPSETRAYS.Always"
    }
  });

  // Allow Rests from Sheet
  game.settings.register("nih", "allowRests", {
    name: "SETTINGS.NIH.PERMISSIONS.AllowRests.Name",
    hint: "SETTINGS.NIH.PERMISSIONS.AllowRests.Hint",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  // Allow Polymorphing
  game.settings.register("nih", "allowPolymorphing", {
    name: "SETTINGS.NIH.PERMISSIONS.AllowTransformation.Name",
    hint: "SETTINGS.NIH.PERMISSIONS.AllowTransformation.Hint",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Allow Summoning
  game.settings.register("nih", "allowSummoning", {
    name: "SETTINGS.NIH.PERMISSIONS.AllowSummoning.Name",
    hint: "SETTINGS.NIH.PERMISSIONS.AllowSummoning.Hint",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Metric Length Weights
  game.settings.register("nih", "metricLengthUnits", {
    name: "SETTINGS.NIH.METRIC.LengthUnits.Name",
    hint: "SETTINGS.NIH.METRIC.LengthUnits.Hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // Metric Volume Weights
  game.settings.register("nih", "metricVolumeUnits", {
    name: "SETTINGS.NIH.METRIC.VolumeUnits.Name",
    hint: "SETTINGS.NIH.METRIC.VolumeUnits.Hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // Metric Unit Weights
  game.settings.register("nih", "metricWeightUnits", {
    name: "SETTINGS.NIH.METRIC.WeightUnits.Name",
    hint: "SETTINGS.NIH.METRIC.WeightUnits.Hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // Strict validation
  game.settings.register("nih", "strictValidation", {
    scope: "world",
    config: false,
    type: Boolean,
    default: true
  });

  // Dynamic art.
  game.settings.registerMenu("nih", "moduleArtConfiguration", {
    name: "NIH.ModuleArtConfigN",
    label: "NIH.ModuleArtConfigL",
    hint: "NIH.ModuleArtConfigH",
    icon: "fa-solid fa-palette",
    type: ModuleArtSettingsConfig,
    restricted: true
  });

  game.settings.register("nih", "moduleArtConfiguration", {
    name: "Module Art Configuration",
    scope: "world",
    config: false,
    type: Object,
    default: {
      nih: {
        portraits: true,
        tokens: true
      }
    }
  });

  // Compendium Browser source exclusion
  game.settings.registerMenu("nih", "packSourceConfiguration", {
    name: "NIH.CompendiumBrowser.Sources.Name",
    label: "NIH.CompendiumBrowser.Sources.Label",
    hint: "NIH.CompendiumBrowser.Sources.Hint",
    icon: "fas fa-book-open-reader",
    type: CompendiumBrowserSettingsConfig,
    restricted: true
  });

  game.settings.register("nih", "packSourceConfiguration", {
    name: "Pack Source Configuration",
    scope: "world",
    config: false,
    type: Object,
    default: {},
    onChange: () => {
      // Refresh all open Compendium Browser instances when source configuration changes
      foundry.applications.instances.forEach(app => {
        if ( app instanceof CompendiumBrowser ) {
          app.render({ parts: ["results", "filters"], changedTab: true });
        }
      });
    }
  });

  // Bastions
  game.settings.registerMenu("nih", "bastionConfiguration", {
    name: "NIH.Bastion.Configuration.Name",
    label: "NIH.Bastion.Configuration.Label",
    hint: "NIH.Bastion.Configuration.Hint",
    icon: "fas fa-chess-rook",
    type: BastionSettingsConfig,
    restricted: true
  });

  game.settings.register("nih", "bastionConfiguration", {
    name: "Bastion Configuration",
    scope: "world",
    config: false,
    type: BastionSetting,
    default: {
      button: false,
      enabled: false,
      duration: 7
    },
    onChange: () => game.nih.bastion.initializeUI()
  });

  // Calendar Settings
  game.settings.registerMenu("nih", "calendarConfiguration", {
    name: "NIH.CALENDAR.Configuration.Name",
    label: "NIH.CALENDAR.Configuration.Label",
    hint: "NIH.CALENDAR.Configuration.Hint",
    icon: "fas fa-calendar-days",
    type: CalendarSettingsConfig
  });

  game.settings.register("nih", "calendar", {
    name: "NIH.CALENDAR.FIELDS.calendar.label",
    hint: "NIH.CALENDAR.FIELDS.calendar.hint",
    scope: "world",
    config: false,
    type: new StringField({
      required: true, blank: false, initial: "gregorian", choices: () => Object.fromEntries(
        CONFIG.NIH.calendar.calendars.map(({ value, label }) => [value, label])
      )
    }),
    requiresReload: true
  });

  game.settings.register("nih", "calendarConfig", {
    name: "Calendar Configuration",
    scope: "world",
    config: false,
    type: CalendarConfigSetting,
    onChange: () => nih.ui.calendar?.onUpdateSettings?.()
  });

  game.settings.register("nih", "calendarPreferences", {
    name: "Calendar Preferences",
    scope: "user",
    config: false,
    type: CalendarPreferencesSetting,
    onChange: () => nih.ui.calendar?.onUpdateSettings?.()
  });

  // Combat Settings
  game.settings.registerMenu("nih", "combatConfiguration", {
    name: "SETTINGS.NIH.COMBAT.Name",
    label: "SETTINGS.NIH.COMBAT.Label",
    hint: "SETTINGS.NIH.COMBAT.Hint",
    icon: "fas fa-explosion",
    type: CombatSettingsConfig,
    restricted: true
  });

  game.settings.register("nih", "autoRecharge", {
    name: "SETTINGS.NIH.NPCS.AutoRecharge.Name",
    hint: "SETTINGS.NIH.NPCS.AutoRecharge.Hint",
    scope: "world",
    config: false,
    default: "no",
    type: String,
    choices: {
      no: "SETTINGS.NIH.NPCS.AutoRecharge.No",
      silent: "SETTINGS.NIH.NPCS.AutoRecharge.Silent",
      yes: "SETTINGS.NIH.NPCS.AutoRecharge.Yes"
    }
  });

  game.settings.register("nih", "autoRollNPCHP", {
    name: "SETTINGS.NIH.NPCS.AutoRollNPCHP.Name",
    hint: "SETTINGS.NIH.NPCS.AutoRollNPCHP.Hint",
    scope: "world",
    config: false,
    default: "no",
    type: String,
    choices: {
      no: "SETTINGS.NIH.NPCS.AutoRollNPCHP.No",
      silent: "SETTINGS.NIH.NPCS.AutoRollNPCHP.Silent",
      yes: "SETTINGS.NIH.NPCS.AutoRollNPCHP.Yes"
    }
  });

  game.settings.register("nih", "criticalDamageModifiers", {
    name: "SETTINGS.NIH.CRITICAL.MultiplyModifiers.Name",
    hint: "SETTINGS.NIH.CRITICAL.MultiplyModifiers.Hint",
    scope: "world",
    config: false,
    type: Boolean,
    default: false
  });

  game.settings.register("nih", "criticalDamageMaxDice", {
    name: "SETTINGS.NIH.CRITICAL.MaxDice.Name",
    hint: "SETTINGS.NIH.CRITICAL.MaxDice.Hint",
    scope: "world",
    config: false,
    type: Boolean,
    default: false
  });

  game.settings.register("nih", "initiativeDexTiebreaker", {
    name: "SETTINGS.NIH.COMBAT.DexTiebreaker.Name",
    hint: "SETTINGS.NIH.COMBAT.DexTiebreaker.Hint",
    scope: "world",
    config: false,
    default: false,
    type: Boolean
  });

  game.settings.register("nih", "initiativeScore", {
    name: "SETTINGS.NIH.COMBAT.InitiativeScore.Name",
    hint: "SETTINGS.NIH.COMBAT.InitiativeScore.Hint",
    scope: "world",
    config: false,
    default: "none",
    type: String,
    choices: {
      none: "SETTINGS.NIH.COMBAT.InitiativeScore.None",
      npcs: "SETTINGS.NIH.COMBAT.InitiativeScore.NPCs",
      all: "SETTINGS.NIH.COMBAT.InitiativeScore.All"
    }
  });

  // Variant Rules
  game.settings.registerMenu("nih", "variantRulesConfiguration", {
    name: "SETTINGS.NIH.VARIANT.Name",
    label: "SETTINGS.NIH.VARIANT.Label",
    hint: "SETTINGS.NIH.VARIANT.Hint",
    icon: "fas fa-list-check",
    type: VariantRulesSettingsConfig,
    restricted: true
  });

  game.settings.register("nih", "allowFeats", {
    name: "SETTINGS.NIH.VARIANT.AllowFeats.Name",
    hint: "SETTINGS.NIH.VARIANT.AllowFeats.Hint",
    scope: "world",
    config: false,
    default: true,
    type: Boolean
  });

  game.settings.register("nih", "currencyWeight", {
    name: "SETTINGS.NIH.VARIANT.CurrencyWeight.Name",
    hint: "SETTINGS.NIH.VARIANT.CurrencyWeight.Hint",
    scope: "world",
    config: false,
    default: true,
    type: Boolean
  });

  game.settings.register("nih", "encumbrance", {
    name: "SETTINGS.NIH.VARIANT.Encumbrance.Name",
    hint: "SETTINGS.NIH.VARIANT.Encumbrance.Hint",
    scope: "world",
    config: false,
    default: "none",
    type: String,
    choices: {
      none: "SETTINGS.NIH.VARIANT.Encumbrance.None",
      normal: "SETTINGS.NIH.VARIANT.Encumbrance.Normal",
      variant: "SETTINGS.NIH.VARIANT.Encumbrance.Variant"
    }
  });

  game.settings.register("nih", "honorScore", {
    name: "SETTINGS.NIH.VARIANT.HonorScore.Name",
    hint: "SETTINGS.NIH.VARIANT.HonorScore.Hint",
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
    requiresReload: true
  });

  game.settings.register("nih", "levelingMode", {
    name: "SETTINGS.NIH.VARIANT.LevelingMode.Name",
    hint: "SETTINGS.NIH.VARIANT.LevelingMode.Hint",
    scope: "world",
    config: false,
    default: "xpBoons",
    type: String,
    choices: {
      noxp: "SETTINGS.NIH.VARIANT.LevelingMode.NoXP",
      xp: "SETTINGS.NIH.VARIANT.LevelingMode.XP",
      xpBoons: "SETTINGS.NIH.VARIANT.LevelingMode.XPBoons"
    }
  });

  game.settings.register("nih", "proficiencyModifier", {
    name: "SETTINGS.NIH.VARIANT.ProficiencyModifier.Name",
    hint: "SETTINGS.NIH.VARIANT.ProficiencyModifier.Hint",
    scope: "world",
    config: false,
    default: "bonus",
    type: String,
    choices: {
      bonus: "SETTINGS.NIH.VARIANT.ProficiencyModifier.Bonus",
      dice: "SETTINGS.NIH.VARIANT.ProficiencyModifier.Dice"
    }
  });

  game.settings.register("nih", "restVariant", {
    name: "SETTINGS.NIH.VARIANT.Rest.Name",
    hint: "SETTINGS.NIH.VARIANT.Rest.Hint",
    scope: "world",
    config: false,
    default: "normal",
    type: String,
    choices: {
      normal: "SETTINGS.NIH.VARIANT.Rest.Normal",
      gritty: "SETTINGS.NIH.VARIANT.Rest.Gritty",
      epic: "SETTINGS.NIH.VARIANT.Rest.Epic"
    }
  });

  game.settings.register("nih", "sanityScore", {
    name: "SETTINGS.NIH.VARIANT.SanityScore.Name",
    hint: "SETTINGS.NIH.VARIANT.SanityScore.Hint",
    scope: "world",
    config: false,
    default: false,
    type: Boolean,
    requiresReload: true
  });

  // Visibility Settings
  game.settings.registerMenu("nih", "visibilityConfiguration", {
    name: "SETTINGS.NIH.VISIBILITY.Name",
    label: "SETTINGS.NIH.VISIBILITY.Label",
    hint: "SETTINGS.NIH.VISIBILITY.Hint",
    icon: "fas fa-eye",
    type: VisibilitySettingsConfig,
    restricted: true
  });

  game.settings.register("nih", "attackRollVisibility", {
    name: "SETTINGS.NIH.VISIBILITY.Attack.Name",
    hint: "SETTINGS.NIH.VISIBILITY.Attack.Hint",
    scope: "world",
    config: false,
    default: "none",
    type: String,
    choices: {
      all: "SETTINGS.NIH.VISIBILITY.Attack.All",
      hideAC: "SETTINGS.NIH.VISIBILITY.Attack.HideAC",
      none: "SETTINGS.NIH.VISIBILITY.Attack.None"
    }
  });

  game.settings.register("nih", "bloodied", {
    name: "SETTINGS.NIH.BLOODIED.Name",
    hint: "SETTINGS.NIH.BLOODIED.Hint",
    scope: "world",
    config: false,
    default: "player",
    type: String,
    choices: {
      all: "SETTINGS.NIH.BLOODIED.All",
      player: "SETTINGS.NIH.BLOODIED.Player",
      none: "SETTINGS.NIH.BLOODIED.None"
    }
  });

  game.settings.register("nih", "challengeVisibility", {
    name: "SETTINGS.NIH.VISIBILITY.Challenge.Name",
    hint: "SETTINGS.NIH.VISIBILITY.Challenge.Hint",
    scope: "world",
    config: false,
    default: "player",
    type: String,
    choices: {
      all: "SETTINGS.NIH.VISIBILITY.Challenge.All",
      player: "SETTINGS.NIH.VISIBILITY.Challenge.Player",
      none: "SETTINGS.NIH.VISIBILITY.Challenge.None"
    }
  });

  game.settings.register("nih", "concealItemDescriptions", {
    name: "SETTINGS.NIH.VISIBILITY.ItemDescriptions.Name",
    hint: "SETTINGS.NIH.VISIBILITY.ItemDescriptions.Hint",
    scope: "world",
    config: false,
    default: false,
    type: Boolean
  });

  // Primary Group
  game.settings.register("nih", "primaryParty", {
    name: "Primary Party",
    scope: "world",
    config: false,
    default: null,
    type: PrimaryPartySetting,
    onChange: s => ui.actors.render()
  });

  // Control hints
  game.settings.register("nih", "controlHints", {
    name: "NIH.Controls.Name",
    hint: "NIH.Controls.Hint",
    scope: "client",
    config: true,
    type: Boolean,
    default: true
  });

  // NPC sheet default skills
  game.settings.register("nih", "defaultSkills", {
    name: "SETTINGS.NIH.DEFAULTSKILLS.Name",
    hint: "SETTINGS.NIH.DEFAULTSKILLS.Hint",
    type: new foundry.data.fields.SetField(
      new foundry.data.fields.StringField({
        choices: () => CONFIG.NIH.skills
      })
    ),
    default: [],
    config: true
  });
}

/* -------------------------------------------- */

/**
 * Register additional settings after modules have had a chance to initialize to give them a chance to modify choices.
 */
export function registerDeferredSettings() {
  game.settings.register("nih", "theme", {
    name: "SETTINGS.NIH.THEME.Name",
    hint: "SETTINGS.NIH.THEME.Hint",
    scope: "client",
    config: false,
    default: "",
    type: String,
    choices: {
      "": "SHEETS.NIH.THEME.Automatic",
      ...CONFIG.NIH.themes
    },
    onChange: s => setTheme(document.body, s)
  });

  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    setTheme(document.body, game.settings.get("nih", "theme"));
  });
  matchMedia("(prefers-contrast: more)").addEventListener("change", () => {
    setTheme(document.body, game.settings.get("nih", "theme"));
  });

  // Hook into core color scheme setting.
  const setting = game.settings.get("core", "uiConfig");
  const settingConfig = game.settings.settings.get("core.uiConfig");
  const { onChange } = settingConfig ?? {};
  if ( onChange ) settingConfig.onChange = (s, ...args) => {
    onChange(s, ...args);
    setTheme(document.body, s.colorScheme);
  };
  setTheme(document.body, setting.colorScheme);
}

/* -------------------------------------------- */

/**
 * Update configuration data when legacy rules are set.
 */
export function applyLegacyRules() {
  const NIH = CONFIG.NIH;

  // Set half-casters to round down.
  NIH.spellcasting.spell.progression.half.roundUp = false;

  // Adjust Wild Shape and Polymorph presets.
  for ( const preset of ["polymorph", "wildshape"] ) {
    NIH.transformation.presets[preset].settings.keep.delete("hp");
    NIH.transformation.presets[preset].settings.keep.delete("languages");
    NIH.transformation.presets[preset].settings.keep.delete("type");
    delete NIH.transformation.presets[preset].settings.tempFormula;
  }

  // Adjust language categories.
  delete NIH.languages.standard.children.sign;
  NIH.languages.exotic.children.draconic = NIH.languages.standard.children.draconic;
  delete NIH.languages.standard.children.draconic;
  NIH.languages.cant = NIH.languages.exotic.children.cant;
  delete NIH.languages.exotic.children.cant;
  NIH.languages.druidic = NIH.languages.exotic.children.druidic;
  delete NIH.languages.exotic.children.druidic;

  // Stunned stops movement in legacy & surprised doesn't provide initiative disadvantage.
  NIH.conditionEffects.noMovement.add("stunned");
  NIH.conditionEffects.initiativeAdvantage.delete("invisible");
  NIH.conditionEffects.initiativeDisadvantage.delete("incapacitated");
  NIH.conditionEffects.initiativeDisadvantage.delete("surprised");

  // Incapacitated creatures within 2 size categories still cannot be moved through in legacy
  delete NIH.conditionTypes.incapacitated.neverBlockMovement;

  // Adjust references.
  Object.assign(NIH.rules, LEGACY.RULES);
  for ( const [cat, value] of Object.entries(LEGACY.REFERENCES) ) {
    Object.entries(value).forEach(([k, v]) => NIH[cat][k].reference = v);
  }

  // Adjust base item IDs.
  for ( const [cat, value] of Object.entries(LEGACY.IDS) ) {
    if ( cat === "focusTypes" ) Object.entries(value).forEach(([k, v]) => NIH[cat][k].itemIds = v);
    else if ( cat === "tools" ) Object.entries(value).forEach(([k, v]) => NIH[cat][k].id = v);
    else NIH[cat] = value;
  }

  // Swap spell lists.
  NIH.SPELL_LISTS = LEGACY.SPELL_LISTS;
}

/* -------------------------------------------- */

/**
 * Set the theme on an element, removing the previous theme class in the process.
 * @param {HTMLElement} element     Body or sheet element on which to set the theme data.
 * @param {string} [theme=""]       Theme key to set.
 * @param {Set<string>} [flags=[]]  Additional theming flags to set.
 */
export function setTheme(element, theme="", flags=new Set()) {
  if ( foundry.utils.getType(theme) === "Object" ) theme = theme.applications;
  element.className = element.className.replace(/\bnih-(theme|flag)-[\w-]+\b/g, "");

  // Primary Theme
  if ( !theme && (element === document.body) ) {
    if ( matchMedia("(prefers-color-scheme: dark)").matches ) theme = "dark";
    if ( matchMedia("(prefers-color-scheme: light)").matches ) theme = "light";
  }
  if ( theme ) {
    element.classList.add(`nih-theme-${theme.slugify()}`);
    element.dataset.theme = theme;
  }
  else delete element.dataset.theme;

  // Additional Flags
  if ( (element === document.body) && matchMedia("(prefers-contrast: more)").matches ) flags.add("high-contrast");
  for ( const flag of flags ) element.classList.add(`nih-flag-${flag.slugify()}`);
  element.dataset.themeFlags = Array.from(flags).join(" ");
}
