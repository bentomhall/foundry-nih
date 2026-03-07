import CalenderHUD from "./applications/calendar/calendar-hud.mjs";
import MapLocationControlIcon from "./canvas/map-location-control-icon.mjs";
import { ConsumptionTargetData } from "./data/activity/fields/consumption-targets-field.mjs";
import { CalendarGreyhawk, CALENDAR_OF_GREYHAWK } from "./data/calendar/calendar-of-greyhawk.mjs";
import { CalendarHarptos, CALENDAR_OF_HARPTOS } from "./data/calendar/calendar-of-harptos.mjs";
import { CalendarKhorvaire, CALENDAR_OF_KHORVAIRE } from "./data/calendar/calendar-of-khorvaire.mjs";
import * as activities from "./documents/activity/_module.mjs";
import Actor5e from "./documents/actor/actor.mjs";
import * as advancement from "./documents/advancement/_module.mjs";
import { preLocalize } from "./utils.mjs";
import MappingField from "./data/fields/mapping-field.mjs";
import VehicleData from "./data/actor/vehicle.mjs";

/**
 * @import {
 *   AbilityConfiguration, ActivityActivationTypeConfiguration, ActivityConsumptionTargetConfiguration,
 *   ActivityTypeConfiguration, ActorSizeConfiguration, AdvancementTypeConfiguration,
 *   AreaTargetDefinition, CalendarHUDConfiguration, CharacterFlagConfiguration, ConditionConfiguration,
 *   CraftingConfiguration, CreatureTypeConfiguration, CurrencyConfiguration, DamageTypeConfiguration,
 *   EncumbranceConfiguration, FacilityConfiguration, HabitatConfiguration5e,
 *   IndividualTargetDefinition, ItemPropertyConfiguration, LimitedUsePeriodConfiguration,
 *   MapLocationMarkerStyle, MovementTypeConfiguration, MovementUnitConfiguration,
 *   RestTypeConfiguration, RequestCallback5e, RuleTypeConfiguration, SkillConfiguration,
 *   SpellcastingFocusConfiguration, SpellcastingPreparationState5e, SpellSchoolConfiguration,
 *   SpellScrollValues, StatusEffectConfig5e, SubtypeTypeConfiguration, TimeUnitConfiguration,
 *   ToolConfiguration, TraitConfiguration, TransformationConfiguration, TravelPaceConfiguration,
 *   TravelUnitConfiguration, TreasureConfiguration5e, UnitConfiguration, WeaponMasterConfiguration
 * } from "./_types.mjs";
 * @import { TravelPace5e } from "./data/actor/fields/_types.mjs";
 * @import {
 *   MultiLevelSpellcasting, SingleLevelSpellcastingData, SlotSpellcastingData, SpellcastingModelData,
 *   SpellcastingTable5e, SpellcastingTableSingle5e
 * } from "./data/spellcasting/_types.mjs";
 */

// Namespace Configuration Values
const NIH = {};

// ASCII Artwork
NIH.ASCII = `_______________________________
______      ______ _____ _____
|  _  \\___  |  _  \\  ___|  ___|
| | | ( _ ) | | | |___ \\| |__
| | | / _ \\/\\ | | |   \\ \\  __|
| |/ / (_>  < |/ //\\__/ / |___
|___/ \\___/\\/___/ \\____/\\____/
_______________________________`;

/* -------------------------------------------- */
/*  Abilities                                   */
/* -------------------------------------------- */

/**
 * The set of Ability Scores used within the system.
 * @enum {AbilityConfiguration}
 */
NIH.abilities = {
  str: {
    label: "NIH.AbilityStr",
    abbreviation: "NIH.AbilityStrAbbr",
    type: "physical",
    fullKey: "strength",
    reference: "",
    icon: "systems/nih/icons/svg/abilities/strength.svg"
  },
  dex: {
    label: "NIH.AbilityDex",
    abbreviation: "NIH.AbilityDexAbbr",
    type: "physical",
    fullKey: "dexterity",
    reference: "",
    icon: "systems/nih/icons/svg/abilities/dexterity.svg"
  },
  con: {
    label: "NIH.AbilityCon",
    abbreviation: "NIH.AbilityConAbbr",
    type: "physical",
    fullKey: "constitution",
    reference: "",
    icon: "systems/nih/icons/svg/abilities/constitution.svg"
  },
  int: {
    label: "NIH.AbilityInt",
    abbreviation: "NIH.AbilityIntAbbr",
    type: "mental",
    fullKey: "intelligence",
    reference: "",
    icon: "systems/nih/icons/svg/abilities/intelligence.svg",
    defaults: { vehicle: 0 }
  },
  wis: {
    label: "NIH.AbilityWis",
    abbreviation: "NIH.AbilityWisAbbr",
    type: "mental",
    fullKey: "wisdom",
    reference: "",
    icon: "systems/nih/icons/svg/abilities/wisdom.svg",
    defaults: { vehicle: 0 }
  },
  cha: {
    label: "NIH.AbilityCha",
    abbreviation: "NIH.AbilityChaAbbr",
    type: "mental",
    fullKey: "charisma",
    reference: "",
    icon: "systems/nih/icons/svg/abilities/charisma.svg",
    defaults: { vehicle: 0 }
  }
};
preLocalize("abilities", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */

/**
 * Configure which ability score is used as the default modifier for initiative rolls,
 * when calculating hit points per level and hit dice, and as the default modifier for
 * saving throws to maintain concentration.
 * @enum {string}
 */
NIH.defaultAbilities = {
  meleeAttack: "str",
  rangedAttack: "dex",
  initiative: "dex",
  hitPoints: "con",
  concentration: "con"
};

/* -------------------------------------------- */

/**
 * Maximum ability score value allowed by default.
 * @type {number}
 */
NIH.maxAbilityScore = 5;

/* -------------------------------------------- */
/*  Skills                                      */
/* -------------------------------------------- */

/**
 * The set of skill which can be trained with their default ability scores.
 * @enum {SkillConfiguration}
 */
NIH.skills = {
  acr: {
    label: "NIH.SkillAcr",
    ability: "dex",
    fullKey: "acrobatics",
    reference: "",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  ani: {
    label: "NIH.SkillAni",
    ability: "wis",
    fullKey: "animalHandling",
    reference: "",
    icon: "icons/environment/creatures/horse-brown.webp"
  },
  arc: {
    label: "NIH.SkillArc",
    ability: "int",
    fullKey: "arcana",
    reference: "",
    icon: "icons/sundries/books/book-embossed-jewel-silver-green.webp"
  },
  ath: {
    label: "NIH.SkillAth",
    ability: "str",
    fullKey: "athletics",
    reference: "",
    icon: "icons/magic/control/buff-strength-muscle-damage-orange.webp"
  },
  dec: {
    label: "NIH.SkillDec",
    ability: "cha",
    fullKey: "deception",
    reference: "",
    icon: "icons/magic/control/mouth-smile-deception-purple.webp"
  },
  his: {
    label: "NIH.SkillHis",
    ability: "int",
    fullKey: "history",
    reference: "",
    icon: "icons/sundries/books/book-embossed-bound-brown.webp"
  },
  ins: {
    label: "NIH.SkillIns",
    ability: "wis",
    fullKey: "insight",
    reference: "",
    icon: "icons/magic/perception/orb-crystal-ball-scrying-blue.webp"
  },
  itm: {
    label: "NIH.SkillItm",
    ability: "cha",
    fullKey: "intimidation",
    reference: "",
    icon: "icons/skills/social/intimidation-impressing.webp"
  },
  inv: {
    label: "NIH.SkillInv",
    ability: "int",
    fullKey: "investigation",
    reference: "",
    icon: "icons/tools/scribal/magnifying-glass.webp"
  },
  med: {
    label: "NIH.SkillMed",
    ability: "wis",
    fullKey: "medicine",
    reference: "",
    icon: "icons/tools/cooking/mortar-herbs-yellow.webp"
  },
  nat: {
    label: "NIH.SkillNat",
    ability: "int",
    fullKey: "nature",
    reference: "",
    icon: "icons/magic/nature/plant-sprout-snow-green.webp"
  },
  prc: {
    label: "NIH.SkillPrc",
    ability: "wis",
    fullKey: "perception",
    reference: "",
    icon: "icons/magic/perception/eye-ringed-green.webp",
    pace: {
      advantage: new Set(["slow"]),
      disadvantage: new Set(["fast"])
    }
  },
  prf: {
    label: "NIH.SkillPrf",
    ability: "cha",
    fullKey: "performance",
    reference: "",
    icon: "icons/tools/instruments/lute-gold-brown.webp"
  },
  per: {
    label: "NIH.SkillPer",
    ability: "cha",
    fullKey: "persuasion",
    reference: "",
    icon: "icons/skills/social/diplomacy-handshake.webp"
  },
  rel: {
    label: "NIH.SkillRel",
    ability: "int",
    fullKey: "religion",
    reference: "",
    icon: "icons/magic/holy/saint-glass-portrait-halo.webp"
  },
  slt: {
    label: "NIH.SkillSlt",
    ability: "dex",
    fullKey: "sleightOfHand",
    reference: "",
    icon: "icons/sundries/gaming/playing-cards.webp"
  },
  ste: {
    label: "NIH.SkillSte",
    ability: "dex",
    fullKey: "stealth",
    reference: "",
    icon: "icons/magic/perception/shadow-stealth-eyes-purple.webp",
    pace: {
      disadvantage: new Set(["normal", "fast"])
    }
  },
  sur: {
    label: "NIH.SkillSur",
    ability: "wis",
    fullKey: "survival",
    reference: "",
    icon: "icons/magic/fire/flame-burning-campfire-yellow-blue.webp",
    pace: {
      advantage: new Set(["slow"]),
      disadvantage: new Set(["fast"])
    }
  }
};
preLocalize("skills", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Base passive score and the amount by which the passive skill scores are modified when that skill has
 * advantage or disadvantage.
 * @type {{ base: number, modifier: number }}
 */
NIH.skillPassive = {
  base: 10,
  modifier: 5
};

/* -------------------------------------------- */

/**
 * An enumeration of item attunement types.
 * @enum {string}
 */
NIH.attunementTypes = {
  required: "NIH.AttunementRequired",
  optional: "NIH.AttunementOptional"
};
preLocalize("attunementTypes");

/* -------------------------------------------- */
/*  Weapon Details                              */
/* -------------------------------------------- */

/**
 * The set of types which a weapon item can take.
 * @enum {string}
 */
NIH.weaponTypes = {
  simpleM: "NIH.WeaponSimpleM",
  simpleR: "NIH.WeaponSimpleR",
  martialM: "NIH.WeaponMartialM",
  martialR: "NIH.WeaponMartialR",
  natural: "NIH.WeaponNatural",
  improv: "NIH.WeaponImprov",
  siege: "NIH.WeaponSiege"
};
preLocalize("weaponTypes");

/* -------------------------------------------- */

/**
 * General weapon categories.
 * @enum {string}
 */
NIH.weaponProficiencies = {
  sim: "NIH.WeaponSimpleProficiency",
  mar: "NIH.WeaponMartialProficiency"
};
preLocalize("weaponProficiencies");

/* -------------------------------------------- */

/**
 * A mapping between `NIH.weaponTypes` and `NIH.weaponProficiencies` that
 * is used to determine if character has proficiency when adding an item.
 * @enum {(boolean|string)}
 */
NIH.weaponProficienciesMap = {
  simpleM: "sim",
  simpleR: "sim",
  martialM: "mar",
  martialR: "mar"
};

/* -------------------------------------------- */

/**
 * A mapping between `NIH.weaponTypes` and `NIH.attackClassifications`. Unlisted types are assumed to be
 * of the "weapon" classification.
 * @enum {string}
 */
NIH.weaponClassificationMap = {};

/* -------------------------------------------- */

/**
 * A mapping between `NIH.weaponTypes` and `NIH.attackTypes`.
 * @enum {string}
 */
NIH.weaponTypeMap = {
  simpleM: "melee",
  simpleR: "ranged",
  martialM: "melee",
  martialR: "ranged",
  siege: "ranged"
};

/* -------------------------------------------- */

/**
 * The basic weapon types in 5e. This enables specific weapon proficiencies or
 * starting equipment provided by classes and backgrounds.
 * @enum {string}
 */
NIH.weaponIds = {
  // battleaxe: "",
  // blowgun: "",
  // club: "",
  // dagger: "",
  // dart: "",
  // flail: "",
  // glaive: "",
  // greataxe: "",
  // greatclub: "",
  // greatsword: "",
  // halberd: "",
  // handaxe: "",
  // handcrossbow: "",
  // heavycrossbow: "",
  // javelin: "",
  // lance: "",
  // lightcrossbow: "",
  // lighthammer: "",
  // longbow: "",
  // longsword: "",
  // mace: "",
  // maul: "",
  // morningstar: "",
  // musket: "",
  // pike: "",
  // pistol: "",
  // quarterstaff: "",
  // rapier: "",
  // scimitar: "",
  // shortsword: "",
  // sickle: "",
  // spear: "",
  // shortbow: "",
  // sling: "",
  // trident: "",
  // warpick: "",
  // warhammer: "",
  // whip: ""
};

/* -------------------------------------------- */

/**
 * The basic ammunition types.
 * @enum {string}
 */
NIH.ammoIds = {
  // arrow: "",
  // blowgunNeedle: "",
  // crossbowBolt: "",
  // firearmBullet: "",
  // slingBullet: ""
};

/* -------------------------------------------- */
/*  Tool Details                                */
/* -------------------------------------------- */

/**
 * The categories into which Tool items can be grouped.
 *
 * @enum {string}
 */
NIH.toolTypes = {
  art: "NIH.ToolArtisans",
  game: "NIH.ToolGamingSet",
  music: "NIH.ToolMusicalInstrument"
};
preLocalize("toolTypes", { sort: true });

/**
 * The categories of tool proficiencies that a character can gain.
 *
 * @enum {string}
 */
NIH.toolProficiencies = {
  ...NIH.toolTypes,
  vehicle: "NIH.ToolVehicle"
};
preLocalize("toolProficiencies", { sort: true });

/**
 * Configuration data for tools.
 * @enum {ToolConfiguration}
 */
NIH.tools = {
  alchemist: {
    ability: "int",
    id: ""
  },
  bagpipes: {
    ability: "cha",
    id: ""
  },
  brewer: {
    ability: "int",
    id: ""
  },
  calligrapher: {
    ability: "dex",
    id: ""
  },
  card: {
    ability: "wis",
    id: ""
  },
  carpenter: {
    ability: "str",
    id: ""
  },
  cartographer: {
    ability: "wis",
    id: ""
  },
  chess: {
    ability: "wis",
    id: ""
  },
  cobbler: {
    ability: "dex",
    id: ""
  },
  cook: {
    ability: "wis",
    id: ""
  },
  dice: {
    ability: "wis",
    id: ""
  },
  disg: {
    ability: "cha",
    id: ""
  },
  drum: {
    ability: "cha",
    id: ""
  },
  dulcimer: {
    ability: "cha",
    id: ""
  },
  flute: {
    ability: "cha",
    id: ""
  },
  forg: {
    ability: "dex",
    id: ""
  },
  glassblower: {
    ability: "int",
    id: ""
  },
  herb: {
    ability: "int",
    id: ""
  },
  horn: {
    ability: "cha",
    id: ""
  },
  jeweler: {
    ability: "int",
    id: ""
  },
  leatherworker: {
    ability: "dex",
    id: ""
  },
  lute: {
    ability: "cha",
    id: ""
  },
  lyre: {
    ability: "cha",
    id: ""
  },
  mason: {
    ability: "str",
    id: ""
  },
  navg: {
    ability: "wis",
    id: ""
  },
  painter: {
    ability: "wis",
    id: ""
  },
  panflute: {
    ability: "cha",
    id: ""
  },
  pois: {
    ability: "int",
    id: ""
  },
  potter: {
    ability: "int",
    id: ""
  },
  shawm: {
    ability: "cha",
    id: ""
  },
  smith: {
    ability: "str",
    id: ""
  },
  thief: {
    ability: "dex",
    id: ""
  },
  tinker: {
    ability: "dex",
    id: ""
  },
  viol: {
    ability: "cha",
    id: ""
  },
  weaver: {
    ability: "dex",
    id: ""
  },
  woodcarver: {
    ability: "dex",
    id: ""
  }
};

/**
 * The basic tool types in 5e. This enables specific tool proficiencies or
 * starting equipment provided by classes and backgrounds.
 * @enum {string}
 */
NIH.toolIds = new Proxy(NIH.tools, {
  get(target, prop) {
    return target[prop]?.id ?? target[prop];
  }
});

/* -------------------------------------------- */
/*  Time                                        */
/* -------------------------------------------- */

/**
 * Configuration for time units available to the system.
 * @enum {TimeUnitConfiguration}
 */
NIH.timeUnits = {
  turn: {
    label: "NIH.UNITS.TIME.Turn.Label",
    counted: "NIH.UNITS.TIME.Turn.Counted",
    conversion: .1,
    combat: true
  },
  round: {
    label: "NIH.UNITS.TIME.Round.Label",
    counted: "NIH.UNITS.TIME.Round.Counted",
    conversion: .1,
    combat: true
  },
  second: {
    label: "NIH.UNITS.TIME.Second.Label",
    conversion: 1 / 60,
    option: false,
    timeComponent: "second"
  },
  minute: {
    label: "NIH.UNITS.TIME.Minute.Label",
    conversion: 1,
    timeComponent: "minute"
  },
  hour: {
    label: "NIH.UNITS.TIME.Hour.Label",
    conversion: 60,
    timeComponent: "hour"
  },
  day: {
    label: "NIH.UNITS.TIME.Day.Label",
    conversion: 1_440,
    timeComponent: "day"
  },
  week: {
    label: "NIH.UNITS.TIME.Week.Label",
    conversion: 10_080,
    option: false
  },
  month: {
    label: "NIH.UNITS.TIME.Month.Label",
    conversion: 43_200
  },
  year: {
    label: "NIH.UNITS.TIME.Year.Label",
    conversion: 525_600,
    timeComponent: "year"
  }
};
preLocalize("timeUnits", { key: "label" });

/* -------------------------------------------- */

/**
 * Time periods that accept a numeric value.
 * @enum {string}
 */
NIH.scalarTimePeriods = new Proxy(NIH.timeUnits, {
  get(target, prop) {
    return target[prop]?.label;
  },
  has(target, key) {
    return target[key] && target[key].option !== false;
  },
  ownKeys(target) {
    return Object.keys(target).filter(k => target[k]?.option !== false);
  }
});

/* -------------------------------------------- */

/**
 * Time periods for spells that don't have a defined ending.
 * @enum {string}
 */
NIH.permanentTimePeriods = {
  disp: "NIH.TimeDisp",
  dstr: "NIH.TimeDispTrig",
  perm: "NIH.TimePerm"
};
preLocalize("permanentTimePeriods");

/* -------------------------------------------- */

/**
 * Time periods that don't accept a numeric value.
 * @enum {string}
 */
NIH.specialTimePeriods = {
  inst: "NIH.TimeInst",
  spec: "NIH.Special"
};
preLocalize("specialTimePeriods");

/* -------------------------------------------- */

/**
 * The various lengths of time over which effects can occur.
 * @enum {string}
 */
NIH.timePeriods = {
  ...NIH.specialTimePeriods,
  ...NIH.permanentTimePeriods,
  ...NIH.scalarTimePeriods
};
preLocalize("timePeriods");

/* -------------------------------------------- */

/**
 * Ways in which to activate an item that cannot be labeled with a cost.
 * @enum {string}
 */
NIH.staticAbilityActivationTypes = {
  none: "NIH.NoneActionLabel",
  special: NIH.timePeriods.spec
};

/**
 * Various ways in which an item or ability can be activated.
 * @enum {string}
 */
NIH.abilityActivationTypes = {
  ...NIH.staticAbilityActivationTypes,
  action: "NIH.Action",
  bonus: "NIH.BonusAction",
  reaction: "NIH.Reaction",
  minute: NIH.timePeriods.minute,
  hour: NIH.timePeriods.hour,
  day: NIH.timePeriods.day,
  legendary: "NIH.LegendaryAction.Label",
  mythic: "NIH.MythicActionLabel",
  lair: "NIH.LAIR.Action.Label",
  crew: "NIH.VEHICLE.Activation.Crew.label"
};
preLocalize("abilityActivationTypes");

/* -------------------------------------------- */

/**
 * Configuration data for activation types on activities.
 * @enum {ActivityActivationTypeConfiguration}
 */
NIH.activityActivationTypes = {
  action: {
    label: "NIH.ACTIVATION.Type.Action.Label",
    header: "NIH.ACTIVATION.Type.Action.Header",
    group: "NIH.ACTIVATION.Category.Standard"
  },
  bonus: {
    label: "NIH.ACTIVATION.Type.BonusAction.Label",
    header: "NIH.ACTIVATION.Type.BonusAction.Header",
    group: "NIH.ACTIVATION.Category.Standard"
  },
  reaction: {
    label: "NIH.ACTIVATION.Type.Reaction.Label",
    header: "NIH.ACTIVATION.Type.Reaction.Header",
    group: "NIH.ACTIVATION.Category.Standard"
  },
  minute: {
    label: "NIH.ACTIVATION.Type.Minute.Label",
    header: "NIH.ACTIVATION.Type.Minute.Header",
    group: "NIH.ACTIVATION.Category.Time",
    scalar: true
  },
  hour: {
    label: "NIH.ACTIVATION.Type.Hour.Label",
    header: "NIH.ACTIVATION.Type.Hour.Header",
    group: "NIH.ACTIVATION.Category.Time",
    scalar: true
  },
  day: {
    label: "NIH.ACTIVATION.Type.Day.Label",
    header: "NIH.ACTIVATION.Type.Day.Header",
    group: "NIH.ACTIVATION.Category.Time",
    scalar: true
  },
  longRest: {
    label: "NIH.ACTIVATION.Type.LongRest.Label",
    group: "NIH.ACTIVATION.Category.Rest",
    passive: true
  },
  shortRest: {
    label: "NIH.ACTIVATION.Type.ShortRest.Label",
    group: "NIH.ACTIVATION.Category.Rest",
    passive: true
  },
  encounter: {
    label: "NIH.ACTIVATION.Type.Encounter.Label",
    group: "NIH.ACTIVATION.Category.Combat",
    passive: true
  },
  turnStart: {
    label: "NIH.ACTIVATION.Type.TurnStart.Label",
    group: "NIH.ACTIVATION.Category.Combat",
    passive: true
  },
  turnEnd: {
    label: "NIH.ACTIVATION.Type.TurnEnd.Label",
    group: "NIH.ACTIVATION.Category.Combat",
    passive: true
  },
  legendary: {
    counted: "NIH.ACTIVATION.Type.Legendary.Counted",
    consume: {
      property: "resources.legact"
    },
    label: "NIH.ACTIVATION.Type.Legendary.Label",
    header: "NIH.ACTIVATION.Type.Legendary.Header",
    group: "NIH.ACTIVATION.Category.Monster",
    scalar: true
  },
  mythic: {
    counted: "NIH.ACTIVATION.Type.Mythic.Counted",
    consume: {
      property: "resources.legact"
    },
    label: "NIH.ACTIVATION.Type.Mythic.Label",
    header: "NIH.ACTIVATION.Type.Mythic.Header",
    group: "NIH.ACTIVATION.Category.Monster",
    scalar: true
  },
  lair: {
    label: "NIH.ACTIVATION.Type.Lair.Label",
    header: "NIH.ACTIVATION.Type.Lair.Header",
    group: "NIH.ACTIVATION.Category.Monster"
  },
  crew: {
    counted: "NIH.ACTIVATION.Type.Crew.Counted",
    consume: {
      canConsume: VehicleData.canConsumeCrewAction,
      property: "attributes.actions"
    },
    label: "NIH.ACTIVATION.Type.Crew.Label",
    header: "NIH.ACTIVATION.Type.Crew.Header",
    group: "NIH.ACTIVATION.Category.Vehicle",
    scalar: true
  },
  special: {
    label: "NIH.Special",
    passive: true
  }
};
preLocalize("activityActivationTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Different things that an ability can consume upon use.
 * @enum {string}
 */
NIH.abilityConsumptionTypes = {
  ammo: "NIH.ConsumeAmmunition",
  attribute: "NIH.ConsumeAttribute",
  hitDice: "NIH.ConsumeHitDice",
  material: "NIH.ConsumeMaterial",
  charges: "NIH.ConsumeCharges"
};
preLocalize("abilityConsumptionTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Configuration information for different consumption targets.
 * @enum {ActivityConsumptionTargetConfiguration}
 */
NIH.activityConsumptionTypes = {
  activityUses: {
    label: "NIH.CONSUMPTION.Type.ActivityUses.Label",
    consume: ConsumptionTargetData.consumeActivityUses,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsActivityUses
  },
  itemUses: {
    label: "NIH.CONSUMPTION.Type.ItemUses.Label",
    consume: ConsumptionTargetData.consumeItemUses,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsItemUses,
    nonEmbeddedHint: "NIH.CONSUMPTION.Type.ItemUses.NonEmbeddedHint",
    targetRequiresEmbedded: true,
    validTargets: ConsumptionTargetData.validItemUsesTargets
  },
  material: {
    label: "NIH.CONSUMPTION.Type.Material.Label",
    consume: ConsumptionTargetData.consumeMaterial,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsMaterial,
    nonEmbeddedHint: "NIH.CONSUMPTION.Type.Material.NonEmbeddedHint",
    targetRequiresEmbedded: true,
    validTargets: ConsumptionTargetData.validMaterialTargets
  },
  hitDice: {
    label: "NIH.CONSUMPTION.Type.HitDice.Label",
    consume: ConsumptionTargetData.consumeHitDice,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsHitDice,
    validTargets: ConsumptionTargetData.validHitDiceTargets
  },
  spellSlots: {
    label: "NIH.CONSUMPTION.Type.SpellSlots.Label",
    consume: ConsumptionTargetData.consumeSpellSlots,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsSpellSlots,
    scalingModes: [{ value: "level", label: "NIH.CONSUMPTION.Scaling.SlotLevel" }],
    validTargets: ConsumptionTargetData.validSpellSlotsTargets
  },
  attribute: {
    label: "NIH.CONSUMPTION.Type.Attribute.Label",
    consume: ConsumptionTargetData.consumeAttribute,
    consumptionLabels: ConsumptionTargetData.consumptionLabelsAttribute,
    nonEmbeddedHint: "NIH.CONSUMPTION.Type.Attribute.NonEmbeddedHint",
    targetRequiresEmbedded: true,
    validTargets: ConsumptionTargetData.validAttributeTargets
  }
};
preLocalize("activityConsumptionTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Creature sizes ordered from smallest to largest.
 * @enum {ActorSizeConfiguration}
 */
NIH.actorSizes = {
  diminutive: {
    label: "NIH.SizeDiminutive",
    abbreviation: "NIH.SizeDiminutiveAbbr",
    hitDie: 1,
    token: 0.25,
    capacityMultiplier: 0.25,
    numerical: 0
  },
  tiny: {
    label: "NIH.SizeTiny",
    abbreviation: "NIH.SizeTinyAbbr",
    hitDie: 4,
    token: 0.5,
    capacityMultiplier: 0.5,
    numerical: 1
  },
  sm: {
    label: "NIH.SizeSmall",
    abbreviation: "NIH.SizeSmallAbbr",
    hitDie: 6,
    dynamicTokenScale: 0.8,
    numerical: 2
  },
  med: {
    label: "NIH.SizeMedium",
    abbreviation: "NIH.SizeMediumAbbr",
    hitDie: 8,
    numerical: 3
  },
  lg: {
    label: "NIH.SizeLarge",
    abbreviation: "NIH.SizeLargeAbbr",
    hitDie: 10,
    token: 2,
    capacityMultiplier: 2,
    numerical: 4
  },
  huge: {
    label: "NIH.SizeHuge",
    abbreviation: "NIH.SizeHugeAbbr",
    hitDie: 12,
    token: 3,
    capacityMultiplier: 4,
    numerical: 5
  },
  grg: {
    label: "NIH.SizeGargantuan",
    abbreviation: "NIH.SizeGargantuanAbbr",
    hitDie: 20,
    token: 4,
    capacityMultiplier: 8,
    numerical: 6
  }
};
preLocalize("actorSizes", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */
/*  Canvas                                      */
/* -------------------------------------------- */

/**
 * Colors used to visualize temporary and temporary maximum HP in token health bars.
 * @enum {number}
 */
NIH.tokenHPColors = {
  damage: 0xFF0000,
  healing: 0x00FF00,
  temp: 0x66CCFF,
  tempmax: 0x440066,
  negmax: 0x550000
};

/* -------------------------------------------- */

/**
 * Colors used when a dynamic token ring effects.
 * @enum {number}
 */
NIH.tokenRingColors = {
  damage: 0xFF0000,
  defeated: 0x000000,
  healing: 0x00FF00,
  temp: 0x33AAFF
};

/* -------------------------------------------- */

/**
 * Colors used to denote movement speed on ruler segments & grid highlighting
 * @enum {number}
 */
NIH.tokenRulerColors = {
  normal: 0x33BC4E,
  double: 0xF1D836,
  triple: 0xE72124
};

/* -------------------------------------------- */

/**
 * Settings used to render map location markers on the canvas.
 * @enum {MapLocationMarkerStyle}
 */
NIH.mapLocationMarker = {
  default: {
    icon: MapLocationControlIcon,
    backgroundColor: 0xFBF8F5,
    borderColor: 0x000000,
    borderHoverColor: 0xFF5500,
    fontFamily: "Roboto Slab",
    shadowColor: 0x000000,
    textColor: 0x000000
  }
};

/* -------------------------------------------- */

/**
 * Default types of creatures.
 * @enum {CreatureTypeConfiguration}
 */
NIH.creatureTypes = {
  aberration: {
    label: "NIH.CreatureAberration",
    plural: "NIH.CreatureAberrationPl",
    icon: "icons/creatures/tentacles/tentacle-eyes-yellow-pink.webp",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.yy50qVC1JhPHt4LC",
    detectAlignment: true
  },
  beast: {
    label: "NIH.CreatureBeast",
    plural: "NIH.CreatureBeastPl",
    icon: "icons/creatures/claws/claw-bear-paw-swipe-red.webp",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6bTHn7pZek9YX2tv"
  },
  celestial: {
    label: "NIH.CreatureCelestial",
    plural: "NIH.CreatureCelestialPl",
    icon: "icons/creatures/abilities/wings-birdlike-blue.webp",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.T5CJwxjhBbi6oqaM",
    detectAlignment: true
  },
  construct: {
    label: "NIH.CreatureConstruct",
    plural: "NIH.CreatureConstructPl",
    icon: "icons/creatures/magical/construct-stone-earth-gray.webp",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.jQGAJZBZTqDFod8d"
  },
  dragon: {
    label: "NIH.CreatureDragon",
    plural: "NIH.CreatureDragonPl",
    icon: "icons/creatures/abilities/dragon-fire-breath-orange.webp",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.k2IRXZwGk9W0PM2S"
  },
  elemental: {
    label: "NIH.CreatureElemental",
    plural: "NIH.CreatureElementalPl",
    icon: "icons/creatures/magical/spirit-fire-orange.webp",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.7z1LXGGkXpHuzkFh",
    detectAlignment: true
  },
  fey: {
    label: "NIH.CreatureFey",
    plural: "NIH.CreatureFeyPl",
    icon: "icons/creatures/magical/fae-fairy-winged-glowing-green.webp",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.OFsRUt3pWljgm8VC",
    detectAlignment: true
  },
  fiend: {
    label: "NIH.CreatureFiend",
    plural: "NIH.CreatureFiendPl",
    icon: "icons/magic/death/skull-horned-goat-pentagram-red.webp",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ElHKBJeiJPC7gj6k",
    detectAlignment: true
  },
  giant: {
    label: "NIH.CreatureGiant",
    plural: "NIH.CreatureGiantPl",
    icon: "icons/creatures/magical/humanoid-giant-forest-blue.webp",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AOXn3Mv5vPZwo0Uf"
  },
  humanoid: {
    label: "NIH.CreatureHumanoid",
    plural: "NIH.CreatureHumanoidPl",
    icon: "icons/environment/people/group.webp",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.iFzQs4AenN8ALRvw"
  },
  monstrosity: {
    label: "NIH.CreatureMonstrosity",
    plural: "NIH.CreatureMonstrosityPl",
    icon: "icons/creatures/abilities/mouth-teeth-rows-red.webp",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.TX0yPEFTn79AMZ8P"
  },
  ooze: {
    label: "NIH.CreatureOoze",
    plural: "NIH.CreatureOozePl",
    icon: "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.cgzIC1ecG03D97Fg"
  },
  plant: {
    label: "NIH.CreaturePlant",
    plural: "NIH.CreaturePlantPl",
    icon: "icons/magic/nature/tree-animated-strike.webp",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.1oT7t6tHE4kZuSN1"
  },
  undead: {
    label: "NIH.CreatureUndead",
    plural: "NIH.CreatureUndeadPl",
    icon: "icons/magic/death/skull-horned-worn-fire-blue.webp",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.D2BdqS1GeD5rcZ6q",
    detectAlignment: true
  }
};
preLocalize("creatureTypes", { keys: ["label", "plural"], sort: true });

/* -------------------------------------------- */

/**
 * Classification types for item action types.
 * @enum {string}
 */
NIH.itemActionTypes = {
  mwak: "NIH.ActionMWAK",
  rwak: "NIH.ActionRWAK",
  msak: "NIH.ActionMSAK",
  rsak: "NIH.ActionRSAK",
  abil: "NIH.ActionAbil",
  save: "NIH.ActionSave",
  ench: "NIH.ActionEnch",
  summ: "NIH.ActionSumm",
  heal: "NIH.ActionHeal",
  util: "NIH.ActionUtil",
  other: "NIH.ActionOther"
};
preLocalize("itemActionTypes");

/* -------------------------------------------- */

/**
 * Different ways in which item capacity can be limited.
 * @enum {string}
 */
NIH.itemCapacityTypes = {
  items: "NIH.ItemContainerCapacityItems",
  weight: "NIH.ItemContainerCapacityWeight"
};
preLocalize("itemCapacityTypes", { sort: true });

/* -------------------------------------------- */

/**
 * List of various item rarities.
 * @enum {string}
 */
NIH.itemRarity = {
  journeyman: "NIH.ItemRarityJourneyman",
  adventurer: "NIH.ItemRarityAdventurer",
  hero: "NIH.ItemRarityHero",
  legendary: "NIH.ItemRarityLegendary",
  artifact: "NIH.ItemRarityArtifact"
};
preLocalize("itemRarity");

/* -------------------------------------------- */

/**
 * Enumerate the lengths of time over which an item can have limited use ability.
 * @enum {LimitedUsePeriodConfiguration}
 */
NIH.limitedUsePeriods = {
  lr: {
    label: "NIH.USES.Recovery.Period.LongRest.Label",
    abbreviation: "NIH.USES.Recovery.Period.LongRest.Abbreviation"
  },
  sr: {
    label: "NIH.USES.Recovery.Period.ShortRest.Label",
    abbreviation: "NIH.USES.Recovery.Period.ShortRest.Abbreviation"
  },
  day: {
    label: "NIH.USES.Recovery.Period.Day.Label",
    abbreviation: "NIH.USES.Recovery.Period.Day.Label"
  },
  dawn: {
    label: "NIH.USES.Recovery.Period.Dawn.Label",
    abbreviation: "NIH.USES.Recovery.Period.Dawn.Label",
    formula: true
  },
  dusk: {
    label: "NIH.USES.Recovery.Period.Dusk.Label",
    abbreviation: "NIH.USES.Recovery.Period.Dusk.Label",
    formula: true
  },
  initiative: {
    label: "NIH.USES.Recovery.Period.Initiative.Label",
    abbreviation: "NIH.USES.Recovery.Period.Initiative.Label",
    type: "special"
  },
  turnStart: {
    label: "NIH.USES.Recovery.Period.TurnStart.Label",
    abbreviation: "NIH.USES.Recovery.Period.TurnStart.Abbreviation",
    type: "combat"
  },
  turnEnd: {
    label: "NIH.USES.Recovery.Period.TurnEnd.Label",
    abbreviation: "NIH.USES.Recovery.Period.TurnEnd.Abbreviation",
    type: "combat"
  },
  turn: {
    label: "NIH.USES.Recovery.Period.Turn.Label",
    abbreviation: "NIH.USES.Recovery.Period.Turn.Label",
    type: "combat"
  }
};
preLocalize("limitedUsePeriods", { keys: ["label", "abbreviation"] });

Object.defineProperty(NIH.limitedUsePeriods, "recoveryOptions", {
  get() {
    return [
      ...Object.entries(CONFIG.NIH.limitedUsePeriods)
        .filter(([, config]) => !config.deprecated)
        .map(([value, { label, type }]) => ({
          value, label, group: game.i18n.localize(`NIH.USES.Recovery.${type?.capitalize() ?? "Time"}`)
        })),
      { value: "recharge", label: game.i18n.localize("NIH.USES.Recovery.Recharge.Label") }
    ];
  }
});

/* -------------------------------------------- */

/**
 * Periods at which enchantments can be re-bound to new items.
 * @enum {{ label: string }}
 */
NIH.enchantmentPeriods = {
  sr: {
    label: "NIH.ENCHANTMENT.Period.ShortRest"
  },
  lr: {
    label: "NIH.ENCHANTMENT.Period.LongRest"
  },
  atwill: {
    label: "NIH.ENCHANTMENT.Period.AtWill"
  }
};
preLocalize("enchantmentPeriods", { key: "label" });

/* -------------------------------------------- */
/*  Armor                                       */
/* -------------------------------------------- */

/**
 * Specific equipment types that modify base AC.
 * @enum {string}
 */
NIH.armorTypes = {
  light: "NIH.EquipmentLight",
  medium: "NIH.EquipmentMedium",
  heavy: "NIH.EquipmentHeavy",
  natural: "NIH.EquipmentNatural",
  shield: "NIH.EquipmentShield"
};
preLocalize("armorTypes");

/* -------------------------------------------- */

/**
 * The set of Armor Proficiencies which a character may have.
 * @enum {string}
 */
NIH.armorProficiencies = {
  lgt: "NIH.ArmorLightProficiency",
  med: "NIH.ArmorMediumProficiency",
  hvy: "NIH.ArmorHeavyProficiency",
  shl: "NIH.EquipmentShieldProficiency"
};
preLocalize("armorProficiencies");

/* -------------------------------------------- */

/**
 * A mapping between `NIH.equipmentTypes` and `NIH.armorProficiencies` that
 * is used to determine if character has proficiency when adding an item.
 * @enum {(boolean|string)}
 */
NIH.armorProficienciesMap = {
  natural: true,
  clothing: true,
  light: "lgt",
  medium: "med",
  heavy: "hvy",
  shield: "shl"
};

/* -------------------------------------------- */

/**
 * The basic armor types in 5e. This enables specific armor proficiencies,
 * automated AC calculation in NPCs, and starting equipment.
 * @enum {string}
 */
NIH.armorIds = {
  breastplate: "",
  brigandine: "",
  chainmail: "",
  chainshirt: "",
  halfplate: "",
  hide: "",
  leather: "",
  lamellar: "",
  plate: "",
  reinforced: ""
};

/* -------------------------------------------- */

/**
 * The basic shield in 5e.
 * @enum {string}
 */
NIH.shieldIds = {
  shield: ""
};

/* -------------------------------------------- */

/**
 * Common armor class calculations.
 * @enum {{ label: string, [formula]: string }}
 */
NIH.armorClasses = {
  flat: {
    label: "NIH.ArmorClassFlat",
    formula: "@attributes.ac.flat"
  },
  natural: {
    label: "NIH.ArmorClassNatural",
    formula: "@attributes.ac.flat"
  },
  default: {
    label: "NIH.ArmorClassEquipment",
    formula: "@attributes.ac.armor + @attributes.ac.dex"
  },
  mage: {
    label: "NIH.ArmorClassMage",
    formula: "13 + @abilities.dex.mod"
  },
  draconic: {
    label: "NIH.ArmorClassDraconic",
    formula: "13 + @abilities.dex.mod"
  },
  unarmoredMonk: {
    label: "NIH.ArmorClassUnarmoredBrawler",
    formula: "10 + @abilities.dex.mod + @abilities.wis.mod"
  },
  unarmoredBarb: {
    label: "NIH.ArmorClassUnarmoredWarden",
    formula: "10 + @abilities.dex.mod + @abilities.con.mod"
  },
  unarmoredBard: {
    label: "NIH.ArmorClassUnarmoredBard",
    formula: "10 + @abilities.dex.mod + @abilities.cha.mod"
  },
  custom: {
    label: "NIH.ArmorClassCustom"
  }
};
preLocalize("armorClasses", { key: "label" });

/* -------------------------------------------- */
/*  Other Equipment Types                       */
/* -------------------------------------------- */

/**
 * Equipment types that aren't armor.
 * @enum {string}
 */
NIH.miscEquipmentTypes = {
  clothing: "NIH.EQUIPMENT.Type.Clothing.Label",
  ring: "NIH.EQUIPMENT.Type.Ring.Label",
  rod: "NIH.EQUIPMENT.Type.Rod.Label",
  trinket: "NIH.EQUIPMENT.Type.Trinket.Label",
  vehicle: "NIH.EQUIPMENT.Type.Vehicle.Label",
  wand: "NIH.EQUIPMENT.Type.Wand.Label",
  wondrous: "NIH.EQUIPMENT.Type.Wondrous.Label"
};
preLocalize("miscEquipmentTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The set of equipment types for armor, clothing, and other objects which can be worn by the character.
 * @enum {string}
 */
NIH.equipmentTypes = {
  ...NIH.miscEquipmentTypes,
  ...NIH.armorTypes
};
preLocalize("equipmentTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The various types of vehicles in which characters can be proficient.
 * @enum {string}
 */
NIH.vehicleTypes = {
  air: "NIH.VEHICLE.Type.Air.label",
  land: "NIH.VEHICLE.Type.Land.label",
  space: "NIH.VEHICLE.Type.Space.label",
  water: "NIH.VEHICLE.Type.Water.label"
};
preLocalize("vehicleTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Enumerate the valid consumable types which are recognized by the system.
 * @enum {SubtypeTypeConfiguration}
 */
NIH.consumableTypes = {
  ammo: {
    label: "NIH.CONSUMABLE.Type.Ammunition.Label",
    subtypes: {
      arrow: "NIH.CONSUMABLE.Type.Ammunition.Arrow",
      crossbowBolt: "NIH.CONSUMABLE.Type.Ammunition.Bolt",
      slingBullet: "NIH.CONSUMABLE.Type.Ammunition.BulletSling",
      blowgunNeedle: "NIH.CONSUMABLE.Type.Ammunition.Needle"
    }
  },
  potion: {
    label: "NIH.CONSUMABLE.Type.Potion.Label"
  },
  poison: {
    label: "NIH.CONSUMABLE.Type.Poison.Label",
    subtypes: {
      contact: "NIH.CONSUMABLE.Type.Poison.Contact",
      ingested: "NIH.CONSUMABLE.Type.Poison.Ingested",
      inhaled: "NIH.CONSUMABLE.Type.Poison.Inhaled",
      injury: "NIH.CONSUMABLE.Type.Poison.Injury"
    }
  },
  food: {
    label: "NIH.CONSUMABLE.Type.Food.Label"
  },
  scroll: {
    label: "NIH.CONSUMABLE.Type.Scroll.Label"
  },
  wand: {
    label: "NIH.CONSUMABLE.Type.Wand.Label"
  },
  rod: {
    label: "NIH.CONSUMABLE.Type.Rod.Label"
  },
  trinket: {
    label: "NIH.CONSUMABLE.Type.Trinket.Label"
  },
  wondrous: {
    label: "NIH.CONSUMABLE.Type.Wondrous.Label"
  }
};
preLocalize("consumableTypes", { key: "label", sort: true });
preLocalize("consumableTypes.ammo.subtypes", { sort: true });
preLocalize("consumableTypes.poison.subtypes", { sort: true });

/* -------------------------------------------- */

/**
 * Types of containers.
 * @enum {string}
 */
NIH.containerTypes = {
  backpack: "H8YCd689ezlD26aT",
  barrel: "7Yqbqg5EtVW16wfT",
  basket: "Wv7HzD6dv1P0q78N",
  boltcase: "eJtPBiZtr2pp6ynt",
  bottle: "HZp69hhyNZUUCipF",
  bucket: "mQVYcHmMSoCUnBnM",
  case: "5mIeX824uMklU3xq",
  chest: "2YbuclKfhDL0bU4u",
  flask: "lHS63sC6bypENNlR",
  jug: "0ZBWwjFz3nIAXMLW",
  pot: "M8xM8BLK4tpUayEE",
  pitcher: "nXWdGtzi8DXDLLsL",
  pouch: "9bWTRRDym06PzSAf",
  quiver: "4MtQKPn9qMWCFjDA",
  sack: "CNdDj8dsXVpRVpXt",
  saddlebags: "TmfaFUSZJAotndn9",
  tankard: "uw6fINSmZ2j2o57A",
  vial: "meJEfX3gZgtMX4x2"
};

/* -------------------------------------------- */

/**
 * Type of spellcasting foci.
 * @enum {SpellcastingFocusConfiguration}
 */
NIH.focusTypes = {
  arcane: {
    label: "NIH.Focus.Arcane",
    itemIds: {
      crystal: "",
      orb: "",
      rod: "",
      staff: "",
      wand: ""
    }
  },
  druidic: {
    label: "NIH.Focus.Druidic",
    itemIds: {
      mistletoe: "",
      woodenstaff: "",
      yewwand: ""
    }
  },
  holy: {
    label: "NIH.Focus.Holy",
    itemIds: {
      amulet: "",
      emblem: "",
      reliquary: ""
    }
  }
};
preLocalize("focusTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Types of "features" items.
 * @enum {SubtypeTypeConfiguration}
 */
NIH.featureTypes = {
  background: {
    label: "NIH.Feature.Background"
  },
  class: {
    label: "NIH.Feature.Class.Label",
    subtypes: {
      // arcaneShot: "NIH.Feature.Class.ArcaneShot",
      // artificerInfusion: "NIH.Feature.Class.ArtificerPlan",
      // channelDivinity: "NIH.Feature.Class.ChannelDivinity",
      // defensiveTactic: "NIH.Feature.Class.DefensiveTactic",
      // eldritchInvocation: "NIH.Feature.Class.EldritchInvocation",
      // elementalDiscipline: "NIH.Feature.Class.ElementalDiscipline",
      // fightingStyle: "NIH.Feature.Class.FightingStyle",
      // huntersPrey: "NIH.Feature.Class.HuntersPrey",
      // ki: "NIH.Feature.Class.Ki",
      // maneuver: "NIH.Feature.Class.Maneuver",
      // metamagic: "NIH.Feature.Class.Metamagic",
      // multiattack: "NIH.Feature.Class.Multiattack",
      // pact: "NIH.Feature.Class.PactBoon",
      // psionicPower: "NIH.Feature.Class.PsionicPower",
      // rune: "NIH.Feature.Class.Rune",
      // superiorHuntersDefense: "NIH.Feature.Class.SuperiorHuntersDefense"
    }
  },
  monster: {
    label: "NIH.Feature.Monster"
  },
  race: {
    label: "NIH.Feature.Species"
  },
  // enchantment: {
  //   label: "NIH.ENCHANTMENT.Label",
  //   subtypes: {
  //     artificerInfusion: "NIH.Feature.Class.ArtificerPlan",
  //     rune: "NIH.Feature.Class.Rune"
  //   }
  // },
  skillTrick: {
    label: "NIH.Feature.SkillTrick.Label",
    subtypes: {
      basic: "NIH.Feature.SkillTrick.basic",
      advanced: "NIH.Feature.SkillTrick.advanced",
      expert: "NIH.Feature.SkillTrick.expert",
      master: "NIH.Feature.SkillTrick.master"
    }
  },
  supernaturalGift: {
    label: "NIH.Feature.SupernaturalGift.Label",
    subtypes: {
      blessing: "NIH.Feature.SupernaturalGift.Blessing",
      charm: "NIH.Feature.SupernaturalGift.Charm",
      epicBoon: "NIH.Feature.SupernaturalGift.EpicBoon"
    }
  },
  vehicle: {
    label: "NIH.Feature.Vehicle.Label"
  }
};
preLocalize("featureTypes", { key: "label" });
preLocalize("featureTypes.class.subtypes", { sort: true });
preLocalize("featureTypes.enchantment.subtypes", { sort: true });
preLocalize("featureTypes.skillTrick.subtypes", { sort: true });
preLocalize("featureTypes.supernaturalGift.subtypes", { sort: true });

/* -------------------------------------------- */

/**
 * The various properties of all item types.
 * @enum {ItemPropertyConfiguration}
 */
NIH.itemProperties = {
  ada: {
    label: "NIH.ITEM.Property.Adamantine",
    isPhysical: true
  },
  amm: {
    label: "NIH.ITEM.Property.Ammunition"
  },
  bat: {
    label: "NIH.ITEM.Property.Battering"
  },
  con: {
    label: "NIH.ITEM.Property.Consumed"
  },
  clv: {
    label: "NIH.ITEM.Property.Cleaving"
  },
  concentration: {
    label: "NIH.ITEM.Property.Concentration",
    abbreviation: "NIH.ConcentrationAbbr",
    icon: "systems/nih/icons/svg/statuses/concentrating.svg",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ow58p27ctAnr4VPH",
    isTag: true
  },
  foc: {
    label: "NIH.ITEM.Property.Focus"
  },
  hvy: {
    label: "NIH.ITEM.Property.Heavy"
  },
  lgt: {
    label: "NIH.ITEM.Property.Light"
  },
  lod: {
    label: "NIH.ITEM.Property.Loading"
  },
  mst: {
    label: "NIH.ITEM.Property.Masterwork"
  },
  material: {
    label: "NIH.ITEM.Property.Material",
    abbreviation: "NIH.ComponentMaterialAbbr",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AeH5eDS4YeM9RETC"
  },
  mgc: {
    label: "NIH.ITEM.Property.Magical",
    icon: "systems/nih/icons/svg/properties/magical.svg",
    isPhysical: true
  },
  pry: {
    label: "NIH.ITEM.Property.Parrying"
  },
  prec: {
    label: "NIH.ITEM.Property.Precise"
  },
  rch: {
    label: "NIH.ITEM.Property.Reach"
  },
  rel: {
    label: "NIH.ITEM.Property.Reload"
  },
  ret: {
    label: "NIH.ITEM.Property.Returning"
  },
  sil: {
    label: "NIH.ITEM.Property.Silvered",
    isPhysical: true
  },
  somatic: {
    label: "NIH.ITEM.Property.Somatic",
    abbreviation: "NIH.ComponentSomaticAbbr",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.qwUNgUNilEmZkSC9"
  },
  spc: {
    label: "NIH.ITEM.Property.Special"
  },
  stealthDisadvantage: {
    label: "NIH.ITEM.Property.StealthDisadvantage"
  },
  thr: {
    label: "NIH.ITEM.Property.Thrown"
  },
  trait: {
    label: "NIH.ITEM.Property.Trait"
  },
  two: {
    label: "NIH.ITEM.Property.TwoHanded"
  },
  vocal: {
    label: "NIH.ITEM.Property.Verbal",
    abbreviation: "NIH.ComponentVerbalAbbr",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6UXTNWMCQ0nSlwwx"
  },
  weightlessContents: {
    label: "NIH.ITEM.Property.WeightlessContents"
  }
};
preLocalize("itemProperties", { keys: ["label", "abbreviation"], sort: true });

/* -------------------------------------------- */

/**
 * The various properties of an item per item type.
 * @enum {object}
 */
NIH.validProperties = {
  consumable: new Set([
    "mgc"
  ]),
  container: new Set([
    "mgc",
    "weightlessContents"
  ]),
  equipment: new Set([
    "ada",
    "foc",
    "mgc",
    "stealthDisadvantage"
  ]),
  feat: new Set([
    "mgc",
    "trait"
  ]),
  loot: new Set([
    "mgc"
  ]),
  weapon: new Set([
    "ada",
    "amm",
    "bat",
    "con",
    "clv",
    "fir",
    "foc",
    "hvy",
    "lgt",
    "lod",
    "mst",
    "mgc",
    "rch",
    "pry",
    "rel",
    "ret",
    "sil",
    "spc",
    "thr",
    "two"
  ]),
  spell: new Set([
    "vocal",
    "somatic",
    "material",
    "concentration"
  ]),
  tool: new Set([
    "foc",
    "mgc"
  ])
};

/* -------------------------------------------- */

/**
 * Types of "loot" items.
 * @enum {{ label: string }}
 */
NIH.lootTypes = {
  art: {
    label: "NIH.Loot.Art"
  },
  gear: {
    label: "NIH.Loot.Gear"
  },
  gem: {
    label: "NIH.Loot.Gem"
  },
  junk: {
    label: "NIH.Loot.Junk"
  },
  material: {
    label: "NIH.Loot.Material"
  },
  resource: {
    label: "NIH.Loot.Resource"
  },
  trade: {
    label: "NIH.Loot.Trade"
  },
  treasure: {
    label: "NIH.Loot.Treasure"
  }
};
preLocalize("lootTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * The valid currency denominations with localized labels, abbreviations, and conversions.
 * The conversion number defines how many of that currency are equal to one GP.
 * @enum {CurrencyConfiguration}
 */
NIH.currencies = {
  ac: {
    label: "NIH.CurrencyAC",
    abbreviation: "NIH.CurrencyAbbrAC",
    conversion: 0.01,
    icon: "systems/nih/icons/currency/platinum.webp"
  },
  pp: {
    label: "NIH.CurrencyPP",
    abbreviation: "NIH.CurrencyAbbrPP",
    conversion: 0.1,
    icon: "systems/nih/icons/currency/platinum.webp"
  },
  gp: {
    label: "NIH.CurrencyGP",
    abbreviation: "NIH.CurrencyAbbrGP",
    conversion: 1,
    icon: "systems/nih/icons/currency/gold.webp"
  },
  sp: {
    label: "NIH.CurrencySP",
    abbreviation: "NIH.CurrencyAbbrSP",
    conversion: 10,
    icon: "systems/nih/icons/currency/silver.webp"
  },
  cp: {
    label: "NIH.CurrencyCP",
    abbreviation: "NIH.CurrencyAbbrCP",
    conversion: 100,
    icon: "systems/nih/icons/currency/copper.webp"
  }
};
preLocalize("currencies", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */

/**
 * Configuration data for crafting costs.
 * FIXME
 * @type {CraftingConfiguration}
 */
NIH.crafting = {
  consumable: {
    days: .5,
    gold: .5
  },
  exceptions: {
    "potion-of-healing": {
      days: 1,
      gold: 25
    }
  },
  magic: {
    common: {
      days: 5,
      gold: 50
    },
    uncommon: {
      days: 10,
      gold: 200
    },
    rare: {
      days: 50,
      gold: 2_000
    },
    veryRare: {
      days: 125,
      gold: 20_000
    },
    legendary: {
      days: 250,
      gold: 100_000
    }
  },
  mundane: {
    days: .1,
    gold: .5
  },
  scrolls: {
    0: {
      days: 1,
      gold: 15
    },
    1: {
      days: 1,
      gold: 25
    },
    2: {
      days: 3,
      gold: 100
    },
    3: {
      days: 5,
      gold: 150
    },
    4: {
      days: 10,
      gold: 1_000
    },
    5: {
      days: 25,
      gold: 1_500
    },
    6: {
      days: 40,
      gold: 10_000
    },
    7: {
      days: 50,
      gold: 12_500
    },
    8: {
      days: 60,
      gold: 15_000
    },
    9: {
      days: 120,
      gold: 50_000
    }
  }
};

/* -------------------------------------------- */
/*  Damage                                      */
/* -------------------------------------------- */

/**
 * Standard dice spread available for things like damage.
 * @type {number[]}
 */
NIH.dieSteps = [4, 6, 8, 10, 12, 20, 100];

/* -------------------------------------------- */

/**
 * Methods by which damage scales relative to the overall scaling increase.
 * @enum {{ label: string, labelCantrip: string }}
 */
NIH.damageScalingModes = {
  whole: {
    label: "NIH.DAMAGE.Scaling.Whole",
    labelCantrip: "NIH.DAMAGE.Scaling.WholeCantrip"
  },
  half: {
    label: "NIH.DAMAGE.Scaling.Half",
    labelCantrip: "NIH.DAMAGE.Scaling.HalfCantrip"
  }
};
preLocalize("damageScalingModes", { keys: ["label", "labelCantrip"] });

/* -------------------------------------------- */

/**
 * Types of damage the can be caused by abilities.
 * @enum {DamageTypeConfiguration}
 */
NIH.damageTypes = {
  acid: {
    label: "NIH.DamageAcid",
    icon: "systems/nih/icons/svg/damage/acid.svg",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.IQhbKRPe1vCPdh8v",
    color: new Color(0x839D50)
  },
  bludgeoning: {
    label: "NIH.DamageBludgeoning",
    icon: "systems/nih/icons/svg/damage/bludgeoning.svg",
    isPhysical: true,
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.39LFrlef94JIYO8m",
    color: new Color(0x0000A0)
  },
  cold: {
    label: "NIH.DamageCold",
    icon: "systems/nih/icons/svg/damage/cold.svg",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4xsFUooHDEdfhw6g",
    color: new Color(0xADD8E6)
  },
  fire: {
    label: "NIH.DamageFire",
    icon: "systems/nih/icons/svg/damage/fire.svg",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.f1S66aQJi4PmOng6",
    color: new Color(0xFF4500)
  },
  lightning: {
    label: "NIH.DamageLightning",
    icon: "systems/nih/icons/svg/damage/lightning.svg",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9SaxFJ9bM3SutaMC",
    color: new Color(0x1E90FF)
  },
  necrotic: {
    label: "NIH.DamageNecrotic",
    icon: "systems/nih/icons/svg/damage/necrotic.svg",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.klOVUV5G1U7iaKoG",
    color: new Color(0x006400)
  },
  piercing: {
    label: "NIH.DamagePiercing",
    icon: "systems/nih/icons/svg/damage/piercing.svg",
    isPhysical: true,
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.95agSnEGTdAmKhyC",
    color: new Color(0xC0C0C0)
  },
  poison: {
    label: "NIH.DamagePoison",
    icon: "systems/nih/icons/svg/damage/poison.svg",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.k5wOYXdWPzcWwds1",
    color: new Color(0x8A2BE2)
  },
  psychic: {
    label: "NIH.DamagePsychic",
    icon: "systems/nih/icons/svg/damage/psychic.svg",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.YIKbDv4zYqbE5teJ",
    color: new Color(0xFF1493)
  },
  radiant: {
    label: "NIH.DamageRadiant",
    icon: "systems/nih/icons/svg/damage/radiant.svg",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.5tcK9buXWDOw8yHH",
    color: new Color(0xFFD700)
  },
  slashing: {
    label: "NIH.DamageSlashing",
    icon: "systems/nih/icons/svg/damage/slashing.svg",
    isPhysical: true,
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.sz2XKQ5lgsdPEJOa",
    color: new Color(0x8B0000)
  },
  thunder: {
    label: "NIH.DamageThunder",
    icon: "systems/nih/icons/svg/damage/thunder.svg",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.iqsmMHk7FSpiNkQy",
    color: new Color(0x708090)
  }
};
preLocalize("damageTypes", { keys: ["label"], sort: true });

/* -------------------------------------------- */

/**
 * Display aggregated damage in chat cards.
 * @type {boolean}
 */
NIH.aggregateDamageDisplay = true;

/* -------------------------------------------- */

/**
 * Different types of healing that can be applied using abilities.
 * @enum {DamageTypeConfiguration}
 */
NIH.healingTypes = {
  healing: {
    label: "NIH.Healing",
    icon: "systems/nih/icons/svg/damage/healing.svg",
    color: new Color(0x46C252)
  },
  temphp: {
    label: "NIH.HealingTemp",
    icon: "systems/nih/icons/svg/damage/temphp.svg",
    color: new Color(0x4B66DE)
  }
};
preLocalize("healingTypes", { keys: ["label"] });

/* -------------------------------------------- */
/*  Movement                                    */
/* -------------------------------------------- */

/**
 * Types of terrain that can cause difficult terrain.
 * @enum {{ label: string }}
 */
NIH.difficultTerrainTypes = {
  ice: {
    label: "NIH.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Ice"
  },
  liquid: {
    label: "NIH.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Liquid"
  },
  plants: {
    label: "NIH.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Plants"
  },
  rocks: {
    label: "NIH.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Rocks"
  },
  mud: {
    label: "NIH.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Mud"
  },
  sand: {
    label: "NIH.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Sand"
  },
  slope: {
    label: "NIH.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Slope"
  },
  snow: {
    label: "NIH.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Snow"
  },
  web: {
    label: "NIH.REGIONBEHAVIORS.DIFFICULTTERRAIN.Type.Webs"
  }
};
preLocalize("difficultTerrainTypes", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Types of movement supported by creature actors in the system.
 * @enum {MovementTypeConfiguration}
 */
NIH.movementTypes = {
  walk: {
    label: "NIH.MOVEMENT.Type.Speed"
  },
  burrow: {
    label: "NIH.MOVEMENT.Type.Burrow"
  },
  climb: {
    label: "NIH.MOVEMENT.Type.Climb",
    walkFallback: true
  },
  fly: {
    label: "NIH.MOVEMENT.Type.Fly",
    travel: "air"
  },
  swim: {
    label: "NIH.MOVEMENT.Type.Swim",
    travel: "water",
    walkFallback: true
  }
};
preLocalize("movementTypes", { key: "label" });
patchConfig("movementTypes", "label", { since: "DnD5e 5.1", until: "DnD5e 5.3" });

/* -------------------------------------------- */

/**
 * Default number of hours per day traveled by specific actor types.
 * @enum {number}
 */
NIH.travelTimes = {
  group: 8,
  vehicle: 24
};

/* -------------------------------------------- */

/**
 * Types of movement supported by creature actors in the system.
 * @enum {Omit<MovementTypeConfiguration, "travel">}
 */
NIH.travelTypes = {
  land: {
    label: "NIH.TRAVEL.Type.Land"
  },
  water: {
    label: "NIH.TRAVEL.Type.Water"
  },
  air: {
    label: "NIH.TRAVEL.Type.Air"
  }
};
preLocalize("travelTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Available travel paces.
 * @type {Readonly<Record<string, TravelPaceConfiguration>>}
 */
NIH.travelPace = Object.freeze({
  slow: {
    label: "NIH.TRAVEL.Pace.Slow",
    standard: 18,
    multiplier: 2 / 3,
    round: "down"
  },
  normal: {
    label: "NIH.TRAVEL.Pace.Normal",
    standard: 24,
    multiplier: 1,
    round: "down"
  },
  fast: {
    label: "NIH.TRAVEL.Pace.Fast",
    standard: 30,
    multiplier: 4 / 3,
    round: "down"
  }
});
preLocalize("travelPace", { key: "label" });

/* -------------------------------------------- */
/*  Measurement                                 */
/* -------------------------------------------- */

/**
 * Default units used for imperial & metric settings.
 * @enum {{ imperial: string, metric: string }}
 */
NIH.defaultUnits = {
  length: {
    imperial: "ft",
    metric: "m"
  },
  travel: {
    imperial: "mph",
    metric: "kph"
  },
  volume: {
    imperial: "cubicFoot",
    metric: "liter"
  },
  weight: {
    imperial: "lb",
    metric: "kg"
  }
};

/* -------------------------------------------- */

/**
 * The valid units of measure for movement distances in the game system.
 * @enum {MovementUnitConfiguration}
 */
NIH.movementUnits = {
  ft: {
    label: "NIH.UNITS.DISTANCE.Foot.Label",
    abbreviation: "NIH.UNITS.DISTANCE.Foot.Abbreviation",
    conversion: 1,
    formattingUnit: "foot",
    type: "imperial",
    travelResolution: "round"
  },
  mi: {
    label: "NIH.UNITS.DISTANCE.Mile.Label",
    abbreviation: "NIH.UNITS.DISTANCE.Mile.Abbreviation",
    conversion: 5_280,
    formattingUnit: "mile",
    type: "imperial",
    travelResolution: "day"
  },
  m: {
    label: "NIH.UNITS.DISTANCE.Meter.Label",
    abbreviation: "NIH.UNITS.DISTANCE.Meter.Abbreviation",
    conversion: 10 / 3, // D&D uses a simplified 5ft -> 1.5m conversion.
    formattingUnit: "meter",
    type: "metric",
    travelResolution: "round"
  },
  km: {
    label: "NIH.UNITS.DISTANCE.Kilometer.Label",
    abbreviation: "NIH.UNITS.DISTANCE.Kilometer.Abbreviation",
    conversion: 10_000 / 3, // Matching simplified conversion
    formattingUnit: "kilometer",
    type: "metric",
    travelResolution: "day"
  }
};
preLocalize("movementUnits", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */

/**
 * The valid units for measuring travel speed. When being formatted, the formatting unit will be combined with
 * `-per-hour` or `-per-day` to result in the final unit passed to `Intl.NumberFormat`.
 * @enum {TravelUnitConfiguration}
 */
NIH.travelUnits = {
  mph: {
    label: "NIH.UNITS.TRAVEL.Mile.Label",
    abbreviationDay: "NIH.UNITS.TRAVEL.Mile.AbbreviationDay",
    abbreviationHour: "NIH.UNITS.TRAVEL.Mile.AbbreviationHour",
    formattingUnit: "mile",
    conversion: 1,
    type: "imperial"
  },
  kph: {
    label: "NIH.UNITS.TRAVEL.Kilometer.Label",
    abbreviationDay: "NIH.UNITS.TRAVEL.Kilometer.AbbreviationDay",
    abbreviationHour: "NIH.UNITS.TRAVEL.Kilometer.AbbreviationHour",
    formattingUnit: "kilometer",
    conversion: 0.6,
    type: "metric"
  }
};
preLocalize("travelUnits", { keys: ["label", "abbreviationDay", "abbreviationHour"] });

/* -------------------------------------------- */

/**
 * The types of range that are used for measuring actions and effects.
 * @enum {string}
 */
NIH.rangeTypes = {
  self: "NIH.DistSelf",
  touch: "NIH.DistTouch",
  spec: "NIH.Special",
  any: "NIH.DistAny"
};
preLocalize("rangeTypes");

/* -------------------------------------------- */

/**
 * The valid units of measure for the range of an action or effect. A combination of `NIH.movementUnits` and
 * `NIH.rangeUnits`.
 * @enum {string}
 */
NIH.distanceUnits = {
  ...Object.fromEntries(Object.entries(NIH.movementUnits).map(([k, { label }]) => [k, label])),
  ...NIH.rangeTypes
};
preLocalize("distanceUnits");

/* -------------------------------------------- */

/**
 * The valid units for measurement of volume.
 * @enum {UnitConfiguration}
 */
NIH.volumeUnits = {
  cubicFoot: {
    label: "NIH.UNITS.VOLUME.CubicFoot.Label",
    abbreviation: "NIH.UNITS.Volume.CubicFoot.Abbreviation",
    counted: "NIH.UNITS.Volume.CubicFoot.Counted",
    conversion: 1,
    type: "imperial"
  },
  liter: {
    label: "NIH.UNITS.VOLUME.Liter.Label",
    abbreviation: "NIH.UNITS.Volume.Liter.Abbreviation",
    conversion: 1 / 28.317,
    type: "metric"
  }
};
preLocalize("volumeUnits", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */

/**
 * The valid units for measurement of weight.
 * @enum {UnitConfiguration}
 */
NIH.weightUnits = {
  lb: {
    label: "NIH.UNITS.WEIGHT.Pound.Label",
    abbreviation: "NIH.UNITS.WEIGHT.Pound.Abbreviation",
    conversion: 1,
    formattingUnit: "pound",
    type: "imperial"
  },
  tn: {
    label: "NIH.UNITS.WEIGHT.Ton.Label",
    abbreviation: "NIH.UNITS.WEIGHT.Ton.Abbreviation",
    counted: "NIH.UNITS.WEIGHT.Ton.Counted",
    conversion: 2000,
    type: "imperial"
  },
  kg: {
    label: "NIH.UNITS.WEIGHT.Kilogram.Label",
    abbreviation: "NIH.UNITS.WEIGHT.Kilogram.Abbreviation",
    conversion: 2.5,
    formattingUnit: "kilogram",
    type: "metric"
  },
  Mg: {
    label: "NIH.UNITS.WEIGHT.Megagram.Label",
    abbreviation: "NIH.UNITS.WEIGHT.Megagram.Abbreviation",
    counted: "NIH.UNITS.WEIGHT.Megagram.Counted",
    conversion: 2500,
    type: "metric"
  }
};
preLocalize("weightUnits", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */

/**
 * Configure aspects of encumbrance calculation so that it could be configured by modules.
 * @type {EncumbranceConfiguration}
 */
NIH.encumbrance = {
  currencyPerWeight: {
    imperial: 100,
    metric: 220
  },
  draftMultiplier: 5,
  effects: {
    encumbered: {
      name: "EFFECT.NIH.StatusEncumbered",
      img: "systems/nih/icons/svg/statuses/encumbered.svg"
    },
    heavilyEncumbered: {
      name: "EFFECT.NIH.StatusHeavilyEncumbered",
      img: "systems/nih/icons/svg/statuses/heavily-encumbered.svg"
    },
    exceedingCarryingCapacity: {
      name: "EFFECT.NIH.StatusExceedingCarryingCapacity",
      img: "systems/nih/icons/svg/statuses/exceeding-carrying-capacity.svg"
    }
  },
  threshold: {
    encumbered: {
      imperial: 5,
      metric: 2.5
    },
    heavilyEncumbered: {
      imperial: 10,
      metric: 5
    },
    maximum: {
      imperial: 15,
      metric: 7.5
    }
  },
  speedReduction: {
    encumbered: {
      ft: 10,
      m: 3
    },
    heavilyEncumbered: {
      ft: 20,
      m: 6
    },
    exceedingCarryingCapacity: {
      ft: 5,
      m: 1.5
    }
  },
  baseUnits: {
    default: {
      imperial: "lb",
      metric: "kg"
    }
  }
};
preLocalize("encumbrance.effects", { key: "name" });

/* -------------------------------------------- */
/*  Targeting                                   */
/* -------------------------------------------- */

/**
 * Targeting types that apply to one or more distinct targets.
 * @enum {IndividualTargetDefinition}
 */
NIH.individualTargetTypes = {
  self: {
    label: "NIH.TARGET.Type.Self.Label",
    scalar: false
  },
  ally: {
    label: "NIH.TARGET.Type.Ally.Label",
    counted: "NIH.TARGET.Type.Ally.Counted"
  },
  enemy: {
    label: "NIH.TARGET.Type.Enemy.Label",
    counted: "NIH.TARGET.Type.Enemy.Counted"
  },
  creature: {
    label: "NIH.TARGET.Type.Creature.Label",
    counted: "NIH.TARGET.Type.Creature.Counted"
  },
  object: {
    label: "NIH.TARGET.Type.Object.Label",
    counted: "NIH.TARGET.Type.Object.Counted"
  },
  space: {
    label: "NIH.TARGET.Type.Space.Label",
    counted: "NIH.TARGET.Type.Space.Counted"
  },
  creatureOrObject: {
    label: "NIH.TARGET.Type.CreatureOrObject.Label",
    counted: "NIH.TARGET.Type.CreatureOrObject.Counted"
  },
  any: {
    label: "NIH.TARGET.Type.Any.Label",
    counted: "NIH.TARGET.Type.Target.Counted"
  },
  willing: {
    label: "NIH.TARGET.Type.WillingCreature.Label",
    counted: "NIH.TARGET.Type.WillingCreature.Counted"
  }
};
preLocalize("individualTargetTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Targeting types that cover an area.
 * @enum {AreaTargetDefinition}
 */
NIH.areaTargetTypes = {
  circle: {
    label: "NIH.TARGET.Type.Circle.Label",
    counted: "NIH.TARGET.Type.Circle.Counted",
    template: "circle",
    sizes: ["radius"]
  },
  cone: {
    label: "NIH.TARGET.Type.Cone.Label",
    counted: "NIH.TARGET.Type.Cone.Counted",
    template: "cone",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.DqqAOr5JnX71OCOw",
    sizes: ["length"],
    standard: true
  },
  cube: {
    label: "NIH.TARGET.Type.Cube.Label",
    counted: "NIH.TARGET.Type.Cube.Counted",
    template: "rect",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.dRfDIwuaHmUQ06uA",
    sizes: ["width"],
    standard: true
  },
  cylinder: {
    label: "NIH.TARGET.Type.Cylinder.Label",
    counted: "NIH.TARGET.Type.Cylinder.Counted",
    template: "circle",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.jZFp4R7tXsIqkiG3",
    sizes: ["radius", "height"],
    standard: true
  },
  line: {
    label: "NIH.TARGET.Type.Line.Label",
    counted: "NIH.TARGET.Type.Line.Counted",
    template: "ray",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6DOoBgg7okm9gBc6",
    sizes: ["length", "width"],
    standard: true
  },
  radius: {
    label: "NIH.TARGET.Type.Emanation.Label",
    counted: "NIH.TARGET.Type.Emanation.Counted",
    template: "circle",
    standard: true
  },
  sphere: {
    label: "NIH.TARGET.Type.Sphere.Label",
    counted: "NIH.TARGET.Type.Sphere.Counted",
    template: "circle",
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.npdEWb2egUPnB5Fa",
    sizes: ["radius"],
    standard: true
  },
  square: {
    label: "NIH.TARGET.Type.Square.Label",
    counted: "NIH.TARGET.Type.Square.Counted",
    template: "rect",
    sizes: ["width"]
  },
  wall: {
    label: "NIH.TARGET.Type.Wall.Label",
    counted: "NIH.TARGET.Type.Wall.Counted",
    template: "ray",
    sizes: ["length", "thickness", "height"]
  }
};
preLocalize("areaTargetTypes", { key: "label", sort: true });

Object.defineProperty(NIH, "areaTargetOptions", {
  get() {
    const { primary, secondary } = Object.entries(this.areaTargetTypes).reduce((obj, [value, data]) => {
      const entry = { value, label: data.label };
      if ( data.standard ) obj.primary.push(entry);
      else obj.secondary.push(entry);
      return obj;
    }, { primary: [], secondary: [] });
    return [{ value: "", label: "" }, ...primary, { rule: true }, ...secondary];
  }
});

/* -------------------------------------------- */

/**
 * The types of single or area targets which can be applied to abilities.
 * @enum {string}
 */
NIH.targetTypes = {
  ...Object.fromEntries(Object.entries(NIH.individualTargetTypes).map(([k, v]) => [k, v.label])),
  ...Object.fromEntries(Object.entries(NIH.areaTargetTypes).map(([k, v]) => [k, v.label]))
};
preLocalize("targetTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Denominations of hit dice which can apply to classes.
 * @type {string[]}
 */
NIH.hitDieTypes = ["d4", "d6", "d8", "d10", "d12"];

/* -------------------------------------------- */

/**
 * Types of rests.
 * @enum {RestTypeConfiguration}
 */
NIH.restTypes = {
  short: {
    duration: {
      normal: 60,
      gritty: 480,
      epic: 1
    },
    label: "NIH.REST.Short.Label",
    icon: "fa-solid fa-utensils",
    activationPeriods: ["shortRest"],
    recoverPeriods: ["sr"],
    recoverSpellSlotTypes: new Set(["pact"])
  },
  long: {
    duration: {
      normal: 480,
      gritty: 10_080,
      epic: 60
    },
    exhaustionDelta: -1,
    label: "NIH.REST.Long.Label",
    icon: "fa-solid fa-campground",
    activationPeriods: ["longRest"],
    recoverHitDice: true,
    recoverHitPoints: true,
    recoverPeriods: ["lr", "sr"],
    recoverSpellSlotTypes: new Set(["spell", "pact"]),
    recoverTemp: true,
    recoverTempMax: true
  }
};
preLocalize("restTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * The set of possible sensory perception types which an Actor may have.
 * @enum {string}
 */
NIH.senses = {
  blindsight: "NIH.SenseBlindsight",
  darkvision: "NIH.SenseDarkvision",
  tremorsense: "NIH.SenseTremorsense",
  truesight: "NIH.SenseTruesight"
};
preLocalize("senses", { sort: true });

/* -------------------------------------------- */
/*  Attacks                                     */
/* -------------------------------------------- */

/**
 * Classifications of attacks based on what is performing them.
 * @enum {{ label: string }}
 */
NIH.attackClassifications = {
  weapon: {
    label: "NIH.ATTACK.Classification.Weapon"
  },
  spell: {
    label: "NIH.ATTACK.Classification.Spell"
  },
  unarmed: {
    label: "NIH.ATTACK.Classification.Unarmed"
  }
};
preLocalize("attackClassifications", { key: "label" });

/* -------------------------------------------- */

/**
 * Attack modes available for weapons.
 * @enum {string}
 */
NIH.attackModes = Object.seal({
  oneHanded: {
    label: "NIH.ATTACK.Mode.OneHanded"
  },
  twoHanded: {
    label: "NIH.ATTACK.Mode.TwoHanded"
  },
  offhand: {
    label: "NIH.ATTACK.Mode.Offhand"
  },
  ranged: {
    label: "NIH.ATTACK.Mode.Ranged"
  },
  thrown: {
    label: "NIH.ATTACK.Mode.Thrown"
  },
  "thrown-offhand": {
    label: "NIH.ATTACK.Mode.ThrownOffhand"
  }
});
preLocalize("attackModes", { key: "label" });

/* -------------------------------------------- */

/**
 * Types of attacks based on range.
 * @enum {{ label: string }}
 */
NIH.attackTypes = Object.seal({
  melee: {
    label: "NIH.ATTACK.Type.Melee"
  },
  ranged: {
    label: "NIH.ATTACK.Type.Ranged"
  }
});
preLocalize("attackTypes", { key: "label" });

/* -------------------------------------------- */
/*  Spellcasting                                */
/*  FIXME                                       */
/* -------------------------------------------- */

/**
 * Define the standard slot progression by character level.
 * The entries of this array represent the spell slot progression for a full spell-caster.
 * @type {SpellcastingTable5e}
 */
const SPELL_SLOT_TABLE = NIH.SPELL_SLOT_TABLE = [
  [2],
  [3],
  [4, 2],
  [4, 3],
  [4, 3, 2],
  [4, 3, 3],
  [4, 3, 3, 1],
  [4, 3, 3, 2],
  [4, 3, 3, 3, 1],
  [4, 3, 3, 3, 2],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 2, 1, 1]
];

/* -------------------------------------------- */

/**
 * Define the pact slot & level progression by pact caster level.
 * @type {SpellcastingTableSingle5e}
 */
const pactCastingProgression = NIH.pactCastingProgression = {
  1: { slots: 1, level: 1 },
  2: { slots: 2, level: 1 },
  3: { slots: 2, level: 2 },
  5: { slots: 2, level: 3 },
  7: { slots: 2, level: 4 },
  9: { slots: 2, level: 5 },
  11: { slots: 3, level: 5 },
  17: { slots: 4, level: 5 }
};

/* -------------------------------------------- */

/**
 * @typedef {Partial<
 *   SpellcastingModelData & SlotSpellcastingData & SingleLevelSpellcastingData & MultiLevelSpellcasting
 * >} SpellcastingMethod5e
 * @property {SpellcastingTable5e|SpellcastingTableSingle5e} [table]
 */

/**
 * Available spellcasting methods.
 * @type {Record<string, SpellcastingMethod5e>}
 */
NIH.spellcasting = {
  atwill: {
    label: "NIH.SPELLCASTING.METHODS.AtWill.label",
    order: -30
  },
  innate: {
    label: "NIH.SPELLCASTING.METHODS.Innate.label",
    order: -20
  },
  ritual: {
    label: "NIH.SPELLCASTING.METHODS.Ritual.label",
    order: -10
  },
  pact: {
    label: "NIH.SPELLCASTING.METHODS.Pact.label",
    type: "single",
    cantrips: true,
    prepares: true,
    order: 10,
    img: "icons/magic/unholy/silhouette-robe-evil-power.webp",
    table: pactCastingProgression,
    progression: {
      pact: {
        label: "NIH.SPELLCASTING.METHODS.Pact.Full.label",
        divisor: 1
      }
    }
  },
  spell: {
    label: "NIH.SPELLCASTING.METHODS.Spell.label",
    type: "multi",
    cantrips: true,
    prepares: true,
    order: 20,
    img: "systems/nih/icons/spell-tiers/{id}.webp",
    table: SPELL_SLOT_TABLE,
    progression: {
      full: {
        label: "NIH.SPELLCASTING.METHODS.Spell.Full.label",
        divisor: 1
      },
      half: {
        label: "NIH.SPELLCASTING.METHODS.Spell.Half.label",
        divisor: 2,
        roundUp: true
      },
      third: {
        label: "NIH.SPELLCASTING.METHODS.Spell.Third.label",
        divisor: 3
      },
      artificer: {
        label: "NIH.SPELLCASTING.METHODS.Spell.Artificer.label",
        divisor: 2,
        roundUp: true
      }
    }
  }
};
preLocalize("spellcasting", { key: "label" });
preLocalize("spellcasting.spell.progression", { key: "label" });
preLocalize("spellcasting.pact.progression", { key: "label" });

/* -------------------------------------------- */

/**
 * Spell preparation states.
 * @type {Record<string, SpellcastingPreparationState5e>}
 */
NIH.spellPreparationStates = {
  unprepared: {
    label: "NIH.SPELLCASTING.STATES.Unprepared",
    value: 0
  },
  prepared: {
    label: "NIH.SPELLCASTING.STATES.Prepared",
    value: 1
  },
  always: {
    label: "NIH.SPELLCASTING.STATES.AlwaysPrepared",
    value: 2
  }
};
preLocalize("spellPreparationStates", { key: "label" });

/* -------------------------------------------- */

/**
 * Spell lists that will be registered by the system during init.
 * @type {string[]}
 */
NIH.SPELL_LISTS = Object.freeze([
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  ""
]);

/* -------------------------------------------- */

/**
 * @deprecated since 5.1
 * @ignore
 */
NIH.spellPreparationModes = new Proxy(NIH.spellcasting, {
  get(target, prop, receiver) {
    foundry.utils.logCompatibilityWarning("CONFIG.NIH.spellPreparationModes is deprecated, use CONFIG.NIH.spellcasting"
      + " instead.", { since: "DnD5e 5.1", until: "DnD5e 5.4" });
    if ( (prop === "prepared") || (prop === "always") ) prop = "spell";
    return Reflect.get(target, prop, receiver);
  },

  set(target, prop, value, receiver) {
    foundry.utils.logCompatibilityWarning("CONFIG.NIH.spellPreparationModes is deprecated, use CONFIG.NIH.spellcasting"
      + " instead.", { since: "DnD5e 5.1", until: "DnD5e 5.4" });
    if ( (prop === "prepared") || (prop === "always") ) prop = "spell";
    return Reflect.set(target, prop, value, receiver);
  }
});

/* -------------------------------------------- */

/**
 * @deprecated since 5.1
 * @ignore
 */
NIH.spellcastingTypes = new Proxy(NIH.spellcasting, {
  get(target, prop, receiver) {
    foundry.utils.logCompatibilityWarning("CONFIG.NIH.spellcastingTypes is deprecated, use CONFIG.NIH.spellcasting"
      + " instead.", { since: "DnD5e 5.1", until: "DnD5e 5.4" });
    if ( prop === "leveled" ) prop = "spell";
    return Reflect.get(target, prop, receiver);
  },

  set(target, prop, value, receiver) {
    foundry.utils.logCompatibilityWarning("CONFIG.NIH.spellcastingTypes is deprecated, use CONFIG.NIH.spellcasting"
      + " instead.", { since: "DnD5e 5.1", until: "DnD5e 5.4" });
    if ( prop === "leveled" ) prop = "spell";
    if ( !("type" in value) ) value.type = "single";
    if ( !("table" in value) ) value.table = NIH.pactCastingProgression;
    if ( !("progression" in value) ) value.progression = { [prop]: { label: value.label } };
    return Reflect.set(target, prop, value, receiver);
  }
});

/* -------------------------------------------- */

/**
 * @ignore
 */
NIH.spellProgression = new Proxy({}, {
  set() {
    foundry.utils.logCompatibilityWarning("CONFIG.NIH.spellProgression is read-only. Spell progressions must be set "
      + "on CONFIG.NIH.spellcasting instead.", { since: "DnD5e 5.1", until: "DnD5e 5.4" });
    return true;
  }
});


/* -------------------------------------------- */

/**
 * Valid spell levels.
 * @enum {string}
 */
NIH.spellLevels = {
  0: "NIH.SpellLevel0",
  1: "NIH.SpellLevel1",
  2: "NIH.SpellLevel2",
  3: "NIH.SpellLevel3",
  4: "NIH.SpellLevel4",
  5: "NIH.SpellLevel5",
  6: "NIH.SpellLevel6",
  7: "NIH.SpellLevel7",
  8: "NIH.SpellLevel8",
  9: "NIH.SpellLevel9"
};
preLocalize("spellLevels");

/* -------------------------------------------- */

/**
 * The available choices for how spell damage scaling may be computed.
 * @enum {string}
 */
NIH.spellScalingModes = {
  none: "NIH.SpellNone",
  cantrip: "NIH.SpellCantrip",
  level: "NIH.SpellLevel"
};
preLocalize("spellScalingModes", { sort: true });

/* -------------------------------------------- */

/**
 * Schools to which a spell can belong.
 * @enum {SpellSchoolConfiguration}
 */
NIH.spellSchools = {
  abj: {
    label: "NIH.SchoolAbj",
    icon: "systems/nih/icons/svg/schools/abjuration.svg",
    fullKey: "abjuration",
    reference: ""
  },
  con: {
    label: "NIH.SchoolCon",
    icon: "systems/nih/icons/svg/schools/conjuration.svg",
    fullKey: "conjuration",
    reference: ""
  },
  div: {
    label: "NIH.SchoolDiv",
    icon: "systems/nih/icons/svg/schools/divination.svg",
    fullKey: "divination",
    reference: ""
  },
  enc: {
    label: "NIH.SchoolEnc",
    icon: "systems/nih/icons/svg/schools/enchantment.svg",
    fullKey: "enchantment",
    reference: ""
  },
  evo: {
    label: "NIH.SchoolEvo",
    icon: "systems/nih/icons/svg/schools/evocation.svg",
    fullKey: "evocation",
    reference: ""
  },
  ill: {
    label: "NIH.SchoolIll",
    icon: "systems/nih/icons/svg/schools/illusion.svg",
    fullKey: "illusion",
    reference: ""
  },
  nec: {
    label: "NIH.SchoolNec",
    icon: "systems/nih/icons/svg/schools/necromancy.svg",
    fullKey: "necromancy",
    reference: ""
  },
  trs: {
    label: "NIH.SchoolTrs",
    icon: "systems/nih/icons/svg/schools/transmutation.svg",
    fullKey: "transmutation",
    reference: ""
  }
};
preLocalize("spellSchools", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Types of spell lists.
 * @enum {string}
 */
NIH.spellListTypes = {
  class: "TYPES.Item.class",
  subclass: "TYPES.Item.subclass",
  background: "TYPES.Item.background",
  race: "TYPES.Item.race",
  other: "JOURNALENTRYPAGE.NIH.SpellList.Type.Other"
};
preLocalize("spellListTypes");

/* -------------------------------------------- */

/**
 * Spell scroll item ID within the `NIH.sourcePacks` compendium or a full UUID for each spell level.
 * @enum {string}
 */
NIH.spellScrollIds = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: ""
};

/* -------------------------------------------- */

/**
 * Spell scroll save DCs and attack bonus values based on spell level. If matching level isn't found,
 * then the nearest level lower than it will be selected.
 * @enum {SpellScrollValues}
 */
NIH.spellScrollValues = {
  0: { dc: 13, bonus: 5 },
  3: { dc: 15, bonus: 7 },
  5: { dc: 17, bonus: 9 },
  7: { dc: 18, bonus: 10 },
  9: { dc: 19, bonus: 11 }
};

/* -------------------------------------------- */

/**
 * Compendium packs used for localized items.
 * @enum {string}
 */
NIH.sourcePacks = {
  BACKGROUNDS: "nih.backgrounds",
  CLASSES: "nih.classes",
  ITEMS: "nih.items",
  RACES: "nih.races"
};

/* -------------------------------------------- */

/**
 * Settings that configuration how actors are changed when transformation is applied.
 * @typedef {TransformationConfiguration}
 */
NIH.transformation = {
  effects: {
    all: {
      label: "NIH.TRANSFORM.Setting.Effects.All.Label",
      hint: "NIH.TRANSFORM.Setting.Effects.All.Hint",
      disables: ["effects.*"]
    },
    origin: {
      label: "NIH.TRANSFORM.Setting.Effects.Origin.Label",
      hint: "NIH.TRANSFORM.Setting.Effects.Origin.Hint",
      default: true
    },
    otherOrigin: {
      label: "NIH.TRANSFORM.Setting.Effects.OtherOrigin.Label",
      hint: "NIH.TRANSFORM.Setting.Effects.OtherOrigin.Hint",
      default: true
    },
    background: {
      label: "NIH.TRANSFORM.Setting.Effects.Background.Label",
      default: true
    },
    class: {
      label: "NIH.TRANSFORM.Setting.Effects.Class.Label",
      default: true
    },
    feat: {
      label: "NIH.TRANSFORM.Setting.Effects.Feature.Label",
      default: true
    },
    equipment: {
      label: "NIH.TRANSFORM.Setting.Effects.Equipment.Label",
      default: true
    },
    spell: {
      label: "NIH.TRANSFORM.Setting.Effects.Spell.Label",
      default: true
    }
  },
  keep: {
    physical: {
      label: "NIH.TRANSFORM.Setting.Keep.Physical.Label",
      hint: "NIH.TRANSFORM.Setting.Keep.Physical.Hint"
    },
    mental: {
      label: "NIH.TRANSFORM.Setting.Keep.Mental.Label",
      hint: "NIH.TRANSFORM.Setting.Keep.Mental.Hint"
    },
    saves: {
      label: "NIH.TRANSFORM.Setting.Keep.Saves.Label",
      disables: ["merge.saves"]
    },
    skills: {
      label: "NIH.TRANSFORM.Setting.Keep.Skills.Label",
      disables: ["merge.skills"]
    },
    gearProf: {
      label: "NIH.TRANSFORM.Setting.Keep.GearProficiency.Label"
    },
    languages: {
      label: "NIH.TRANSFORM.Setting.Keep.Languages.Label"
    },
    class: {
      label: "NIH.TRANSFORM.Setting.Keep.Proficiency.Label"
    },
    feats: {
      label: "NIH.TRANSFORM.Setting.Keep.Features.Label"
    },
    items: {
      label: "NIH.TRANSFORM.Setting.Keep.Equipment.Label"
    },
    spells: {
      label: "NIH.TRANSFORM.Setting.Keep.Spells.Label"
    },
    bio: {
      label: "NIH.TRANSFORM.Setting.Keep.Biography.Label"
    },
    type: {
      label: "NIH.TRANSFORM.Setting.Keep.CreatureType.Label"
    },
    hp: {
      label: "NIH.TRANSFORM.Setting.Keep.Health.Label"
    },
    tempHP: {
      label: "NIH.TRANSFORM.Setting.Keep.TempHP.Label"
    },
    resistances: {
      label: "NIH.TRANSFORM.Setting.Keep.Resistances.Label"
    },
    vision: {
      label: "NIH.TRANSFORM.Setting.Keep.Vision.Label",
      default: true
    },
    self: {
      label: "NIH.TRANSFORM.Setting.Keep.Self.Label",
      hint: "NIH.TRANSFORM.Setting.Keep.Self.Hint",
      disables: ["keep.*", "merge.*", "minimumAC", "tempFormula"]
    }
  },
  merge: {
    saves: {
      label: "NIH.TRANSFORM.Setting.Merge.Saves.Label",
      disables: ["keep.saves"]
    },
    skills: {
      label: "NIH.TRANSFORM.Setting.Merge.Skills.Label",
      disables: ["keep.skills"]
    }
  },
  other: {},
  presets: {
    wildshape: {
      icon: '<i class="fas fa-paw" inert></i>',
      label: "NIH.TRANSFORM.Preset.WildShape.Label",
      settings: {
        effects: new Set(["otherOrigin", "origin", "feat", "spell", "class", "background"]),
        keep: new Set(["bio", "class", "feats", "hp", "languages", "mental", "tempHP", "type"]),
        merge: new Set(["saves", "skills"]),
        minimumAC: "(13 + @abilities.wis.mod) * sign(@subclasses.moon.levels)",
        spellLists: new Set(["subclass:moon"]),
        tempFormula: "max(@classes.druid.levels, @subclasses.moon.levels * 3)"
      }
    },
    polymorph: {
      icon: '<i class="fas fa-pastafarianism" inert></i>',
      label: "NIH.TRANSFORM.Preset.Polymorph.Label",
      settings: {
        effects: new Set(["otherOrigin", "origin", "spell"]),
        keep: new Set(["hp", "type"]),
        tempFormula: "@source.attributes.hp.max"
      }
    },
    polymorphSelf: {
      icon: '<i class="fas fa-eye" inert></i>',
      label: "NIH.TRANSFORM.Preset.Appearance.Label",
      settings: {
        effects: new Set(["all"]),
        keep: new Set(["self"])
      }
    }
  }
};
preLocalize("transformation.effects", { keys: ["label", "hint"] });
preLocalize("transformation.keep", { keys: ["label", "hint"] });
preLocalize("transformation.merge", { keys: ["label", "hint"] });
preLocalize("transformation.other", { keys: ["label", "hint"], sort: true });
preLocalize("transformation.presets", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Skill, ability, and tool proficiency levels.
 * The key for each level represents its proficiency multiplier.
 * @enum {string}
 */
NIH.proficiencyLevels = {
  0: "NIH.NotProficient",
  1: "NIH.Proficient",
  0.5: "NIH.HalfProficient",
  2: "NIH.Expertise"
};
preLocalize("proficiencyLevels");

/* -------------------------------------------- */

/**
 * Weapon and armor item proficiency levels.
 * @enum {string}
 */
NIH.weaponAndArmorProficiencyLevels = {
  0: "NIH.NotProficient",
  1: "NIH.Proficient"
};
preLocalize("weaponAndArmorProficiencyLevels");

/* -------------------------------------------- */

/**
 * The amount of cover provided by an object. In cases where multiple pieces
 * of cover are in play, we take the highest value.
 * @enum {string}
 */
NIH.cover = {
  0: "NIH.None",
  .5: "NIH.CoverHalf",
  .75: "NIH.CoverThreeQuarters",
  1: "NIH.CoverTotal"
};
preLocalize("cover");

/* -------------------------------------------- */

/**
 * A selection of actor attributes that can be tracked on token resource bars.
 * @type {string[]}
 * @deprecated since v10
 */
NIH.trackableAttributes = [
  "attributes.ac.value", "attributes.init.bonus", "attributes.movement", "attributes.senses",
  "attributes.spell.attack", "attributes.spell.dc", "attributes.spell.level", "details.cr",
  "details.xp.value", "skills.*.passive", "abilities.*.value"
];

/* -------------------------------------------- */

/**
 * A selection of actor and item attributes that are valid targets for item resource consumption.
 * @type {string[]}
 */
NIH.consumableResources = [
  // Configured during init.
];

/* -------------------------------------------- */

/**
 * Conditions that can affect an actor.
 * @enum {ConditionConfiguration}
 */
NIH.conditionTypes = {
  bleeding: {
    name: "EFFECT.NIH.StatusBleeding",
    img: "systems/nih/icons/svg/statuses/bleeding.svg",
    pseudo: true
  },
  blinded: {
    name: "NIH.ConBlinded",
    img: "systems/nih/icons/svg/statuses/blinded.svg",
    reference: "",
    special: "BLIND"
  },
  burning: {
    name: "EFFECT.NIH.StatusBurning",
    img: "systems/nih/icons/svg/statuses/burning.svg",
    reference: "",
    pseudo: true
  },
  charmed: {
    name: "NIH.ConCharmed",
    img: "systems/nih/icons/svg/statuses/charmed.svg",
    reference: ""
  },
  cursed: {
    name: "EFFECT.NIH.StatusCursed",
    img: "systems/nih/icons/svg/statuses/cursed.svg",
    pseudo: true
  },
  dehydration: {
    name: "EFFECT.NIH.StatusDehydration",
    img: "systems/nih/icons/svg/statuses/dehydration.svg",
    reference: "",
    pseudo: true
  },
  deafened: {
    name: "NIH.ConDeafened",
    img: "systems/nih/icons/svg/statuses/deafened.svg",
    reference: ""
  },
  diseased: {
    name: "NIH.ConDiseased",
    img: "systems/nih/icons/svg/statuses/diseased.svg",
    pseudo: true,
    reference: "Compendium.nih.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.oNQWvyRZkTOJ8PBq"
  },
  exhaustion: {
    name: "NIH.ConExhaustion",
    img: "systems/nih/icons/svg/statuses/exhaustion.svg",
    reference: "",
    levels: 6,
    reduction: { rolls: 2, speed: 5 }
  },
  falling: {
    name: "EFFECT.NIH.StatusFalling",
    img: "systems/nih/icons/svg/statuses/falling.svg",
    reference: "",
    pseudo: true
  },
  frightened: {
    name: "NIH.ConFrightened",
    img: "systems/nih/icons/svg/statuses/frightened.svg",
    reference: ""
  },
  grappled: {
    name: "NIH.ConGrappled",
    img: "systems/nih/icons/svg/statuses/grappled.svg",
    reference: ""
  },
  incapacitated: {
    name: "NIH.ConIncapacitated",
    img: "systems/nih/icons/svg/statuses/incapacitated.svg",
    reference: "",
    neverBlockMovement: true
  },
  invisible: {
    name: "NIH.ConInvisible",
    img: "systems/nih/icons/svg/statuses/invisible.svg",
    reference: ""
  },
  malnutrition: {
    name: "EFFECT.NIH.StatusMalnutrition",
    img: "systems/nih/icons/svg/statuses/malnutrition.svg",
    reference: "",
    pseudo: true
  },
  paralyzed: {
    name: "NIH.ConParalyzed",
    img: "systems/nih/icons/svg/statuses/paralyzed.svg",
    reference: "",
    statuses: ["incapacitated"]
  },
  petrified: {
    name: "NIH.ConPetrified",
    img: "systems/nih/icons/svg/statuses/petrified.svg",
    reference: "",
    statuses: ["incapacitated"]
  },
  poisoned: {
    name: "NIH.ConPoisoned",
    img: "systems/nih/icons/svg/statuses/poisoned.svg",
    reference: ""
  },
  prone: {
    name: "NIH.ConProne",
    img: "systems/nih/icons/svg/statuses/prone.svg",
    reference: ""
  },
  restrained: {
    name: "NIH.ConRestrained",
    img: "systems/nih/icons/svg/statuses/restrained.svg",
    reference: ""
  },
  silenced: {
    name: "EFFECT.NIH.StatusSilenced",
    img: "systems/nih/icons/svg/statuses/silenced.svg",
    pseudo: true
  },
  stunned: {
    name: "NIH.ConStunned",
    img: "systems/nih/icons/svg/statuses/stunned.svg",
    reference: "",
    statuses: ["incapacitated"]
  },
  suffocation: {
    name: "EFFECT.NIH.StatusSuffocation",
    img: "systems/nih/icons/svg/statuses/suffocation.svg",
    reference: "",
    pseudo: true
  },
  surprised: {
    name: "EFFECT.NIH.StatusSurprised",
    img: "systems/nih/icons/svg/statuses/surprised.svg",
    pseudo: true
  },
  transformed: {
    name: "EFFECT.NIH.StatusTransformed",
    img: "systems/nih/icons/svg/statuses/transformed.svg",
    pseudo: true
  },
  unconscious: {
    name: "NIH.ConUnconscious",
    img: "systems/nih/icons/svg/statuses/unconscious.svg",
    reference: "",
    statuses: ["incapacitated"],
    riders: ["prone"]
  }
};
preLocalize("conditionTypes", { key: "name", sort: true });

/* -------------------------------------------- */

/**
 * Various effects of conditions and which conditions apply it. Either keys for the conditions,
 * and with a number appended for a level of exhaustion.
 * @enum {Set<string>}
 */
NIH.conditionEffects = {
  noMovement: new Set(["exhaustion-5", "grappled", "paralyzed", "petrified", "restrained", "unconscious"]),
  halfMovement: new Set(["exhaustion-2"]),
  crawl: new Set(["prone", "exceedingCarryingCapacity"]),
  petrification: new Set(["petrified"]),
  halfHealth: new Set(["exhaustion-4"]),
  dehydrated: new Set(["dehydration"]),
  malnourished: new Set(["malnutrition"]),
  abilityCheckDisadvantage: new Set(["poisoned", "exhaustion-1"]),
  abilitySaveDisadvantage: new Set(["exhaustion-3"]),
  attackDisadvantage: new Set(["poisoned", "exhaustion-3"]),
  dexteritySaveDisadvantage: new Set(["restrained"]),
  initiativeAdvantage: new Set(["invisible"]),
  initiativeDisadvantage: new Set(["incapacitated", "surprised"])
};

/* -------------------------------------------- */

/**
 * Extra status effects not specified in `conditionTypes`. If the ID matches a core-provided effect, then this
 * data will be merged into the core data.
 * @enum {StatusEffectConfig5e}
 */
NIH.statusEffects = {
  burrowing: {
    name: "EFFECT.NIH.StatusBurrowing",
    img: "systems/nih/icons/svg/statuses/burrowing.svg",
    special: "BURROW"
  },
  concentrating: {
    name: "EFFECT.NIH.StatusConcentrating",
    img: "systems/nih/icons/svg/statuses/concentrating.svg",
    special: "CONCENTRATING"
  },
  coverHalf: {
    name: "EFFECT.NIH.StatusHalfCover",
    img: "systems/nih/icons/svg/statuses/cover-half.svg",
    order: 2,
    exclusiveGroup: "cover",
    coverBonus: 2
  },
  coverThreeQuarters: {
    name: "EFFECT.NIH.StatusThreeQuartersCover",
    img: "systems/nih/icons/svg/statuses/cover-three-quarters.svg",
    order: 3,
    exclusiveGroup: "cover",
    coverBonus: 5
  },
  coverTotal: {
    name: "EFFECT.NIH.StatusTotalCover",
    img: "systems/nih/icons/svg/statuses/cover-total.svg",
    order: 4,
    exclusiveGroup: "cover"
  },
  dead: {
    name: "EFFECT.NIH.StatusDead",
    img: "systems/nih/icons/svg/statuses/dead.svg",
    special: "DEFEATED",
    order: 1,
    neverBlockMovement: true
  },
  dodging: {
    name: "EFFECT.NIH.StatusDodging",
    img: "systems/nih/icons/svg/statuses/dodging.svg"
  },
  ethereal: {
    name: "EFFECT.NIH.StatusEthereal",
    img: "systems/nih/icons/svg/statuses/ethereal.svg",
    neverBlockMovement: true
  },
  flying: {
    name: "EFFECT.NIH.StatusFlying",
    img: "systems/nih/icons/svg/statuses/flying.svg",
    special: "FLY"
  },
  hiding: {
    name: "EFFECT.NIH.StatusHiding",
    img: "systems/nih/icons/svg/statuses/hiding.svg"
  },
  hovering: {
    name: "EFFECT.NIH.StatusHovering",
    img: "systems/nih/icons/svg/statuses/hovering.svg",
    special: "HOVER"
  },
  marked: {
    name: "EFFECT.NIH.StatusMarked",
    img: "systems/nih/icons/svg/statuses/marked.svg"
  },
  sleeping: {
    name: "EFFECT.NIH.StatusSleeping",
    img: "systems/nih/icons/svg/statuses/sleeping.svg",
    statuses: ["incapacitated", "unconscious"]
  },
  stable: {
    name: "EFFECT.NIH.StatusStable",
    img: "systems/nih/icons/svg/statuses/stable.svg"
  }
};

/* -------------------------------------------- */

/**
 * Status effects that never block token movement. Populated during the setup process.
 * @type {Set<string>}
 */
NIH.neverBlockStatuses = new Set();

/* -------------------------------------------- */

/**
 * Configuration for the special bloodied status effect.
 * @type {{ name: string, icon: string, threshold: number }}
 */
NIH.bloodied = {
  name: "EFFECT.NIH.StatusBloodied",
  img: "systems/nih/icons/svg/statuses/bloodied.svg",
  threshold: .5
};

/* -------------------------------------------- */
/*  Languages                                   */
/* -------------------------------------------- */

/**
 * Languages a character can learn.
 * @enum {object}
 */
NIH.languages = {
  standard: {
    label: "NIH.Language.Category.Standard",
    selectable: false,
    children: {
      common: "NIH.Language.Language.Common",
      draconic: "NIH.Language.Language.Draconic",
      dwarvish: "NIH.Language.Language.Dwarvish",
      elvish: "NIH.Language.Language.Elvish",
      giant: "NIH.Language.Language.Giant",
      gnomish: "NIH.Language.Language.Gnomish",
      goblin: "NIH.Language.Language.Goblin",
      halfling: "NIH.Language.Language.Halfling",
      orc: "NIH.Language.Language.Orc",
      sign: "NIH.Language.Language.CommonSign"
    }
  },
  exotic: {
    label: "NIH.Language.Category.Rare",
    selectable: false,
    children: {
      aarakocra: "NIH.Language.Language.Aarakocra",
      abyssal: "NIH.Language.Language.Abyssal",
      cant: "NIH.Language.Language.ThievesCant",
      celestial: "NIH.Language.Language.Celestial",
      deep: "NIH.Language.Language.DeepSpeech",
      druidic: "NIH.Language.Language.Druidic",
      gith: "NIH.Language.Language.Gith",
      gnoll: "NIH.Language.Language.Gnoll",
      infernal: "NIH.Language.Language.Infernal",
      primordial: {
        label: "NIH.Language.Language.Primordial",
        children: {
          aquan: "NIH.Language.Language.Aquan",
          auran: "NIH.Language.Language.Auran",
          ignan: "NIH.Language.Language.Ignan",
          terran: "NIH.Language.Language.Terran"
        }
      },
      sylvan: "NIH.Language.Language.Sylvan",
      undercommon: "NIH.Language.Language.Undercommon"
    }
  }
};
preLocalize("languages", { key: "label" });
preLocalize("languages.standard.children", { key: "label", sort: true });
preLocalize("languages.exotic.children", { key: "label", sort: true });
preLocalize("languages.exotic.children.primordial.children", { sort: true });

/* -------------------------------------------- */

/**
 * Communication types that take ranges such as telepathy.
 * @enum {{ label: string }}
 */
NIH.communicationTypes = {
  telepathy: {
    label: "NIH.Language.Communication.Telepathy"
  }
};
preLocalize("communicationTypes", { key: "label" });

/* -------------------------------------------- */
/*  Habitats & Treasure                         */
/* -------------------------------------------- */

/**
 * NPC habitats.
 * @enum {HabitatConfiguration5e}
 */
NIH.habitats = {
  any: {
    label: "NIH.Habitat.Categories.Any"
  },
  arctic: {
    label: "NIH.Habitat.Categories.Arctic"
  },
  coastal: {
    label: "NIH.Habitat.Categories.Coastal"
  },
  desert: {
    label: "NIH.Habitat.Categories.Desert"
  },
  forest: {
    label: "NIH.Habitat.Categories.Forest"
  },
  grassland: {
    label: "NIH.Habitat.Categories.Grassland"
  },
  hill: {
    label: "NIH.Habitat.Categories.Hill"
  },
  mountain: {
    label: "NIH.Habitat.Categories.Mountain"
  },
  planar: {
    label: "NIH.Habitat.Categories.Planar",
    subtypes: true
  },
  swamp: {
    label: "NIH.Habitat.Categories.Swamp"
  },
  underdark: {
    label: "NIH.Habitat.Categories.Underdark"
  },
  underwater: {
    label: "NIH.Habitat.Categories.Underwater"
  },
  urban: {
    label: "NIH.Habitat.Categories.Urban"
  }
};
preLocalize("habitats", { key: "label" });

/* -------------------------------------------- */

/**
 * NPC Treasure
 * @enum {TreasureConfiguration5e}
 */
NIH.treasure = {
  any: {
    label: "NIH.Treasure.Categories.Any"
  },
  arcana: {
    label: "NIH.Treasure.Categories.Arcana"
  },
  armaments: {
    label: "NIH.Treasure.Categories.Armaments"
  },
  implements: {
    label: "NIH.Treasure.Categories.Implements"
  },
  individual: {
    label: "NIH.Treasure.Categories.Individual"
  },
  relics: {
    label: "NIH.Treasure.Categories.Relics"
  }
};
preLocalize("treasure", { key: "label" });

/* -------------------------------------------- */
/*  Leveling & Experience                       */
/* -------------------------------------------- */

/**
 * Maximum allowed character level.
 * @type {number}
 */
NIH.maxLevel = 20;

/* -------------------------------------------- */

/**
 * XP required to achieve each character level.
 * @type {number[]}
 */
NIH.CHARACTER_EXP_LEVELS = [
  0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000,
  120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
];

/* -------------------------------------------- */

/**
 * XP granted for each challenge rating.
 * @type {number[]}
 */
NIH.CR_EXP_LEVELS = [
  10, 200, 450, 700, 1100, 1800, 2300, 2900, 3900, 5000, 5900, 7200, 8400, 10000, 11500, 13000, 15000, 18000,
  20000, 22000, 25000, 33000, 41000, 50000, 62000, 75000, 90000, 105000, 120000, 135000, 155000
];

/* -------------------------------------------- */

/**
 * XP thresholds for encounter difficulty.
 * @type {number[][]}
 */
NIH.ENCOUNTER_DIFFICULTY = [
  [0, 0, 0],
  [50, 75, 100],
  [100, 150, 200],
  [150, 225, 400],
  [250, 375, 500],
  [500, 750, 1100],
  [600, 1000, 1400],
  [750, 1300, 1700],
  [1000, 1700, 2100],
  [1300, 2000, 2600],
  [1600, 2300, 3100],
  [1900, 2900, 4100],
  [2200, 3700, 4700],
  [2600, 4200, 5400],
  [2900, 4900, 6200],
  [3300, 5400, 7800],
  [3800, 6100, 9800],
  [4500, 7200, 11700],
  [5000, 8700, 14200],
  [5500, 10700, 17200],
  [6400, 13200, 22000]
];

/* -------------------------------------------- */

/**
 * Intervals above the maximum XP that result in an epic boon.
 * @type {number}
 */
NIH.epicBoonInterval = 30000;

/* -------------------------------------------- */
/*  Traits                                      */
/* -------------------------------------------- */

/**
 * Configurable traits on actors.
 * @enum {TraitConfiguration}
 */
NIH.traits = {
  saves: {
    labels: {
      title: "NIH.ClassSaves",
      localization: "NIH.TraitSavesPlural"
    },
    icon: "icons/magic/life/ankh-gold-blue.webp",
    actorKeyPath: "system.abilities",
    configKey: "abilities",
    labelKeyPath: "label"
  },
  skills: {
    labels: {
      title: "NIH.Skills",
      localization: "NIH.TraitSkillsPlural"
    },
    icon: "icons/tools/instruments/harp-yellow-teal.webp",
    actorKeyPath: "system.skills",
    labelKeyPath: "label",
    expertise: true,
    dataType: MappingField
  },
  languages: {
    labels: {
      title: "NIH.Languages",
      localization: "NIH.TraitLanguagesPlural",
      all: "NIH.Language.All"
    },
    icon: "icons/skills/social/diplomacy-peace-alliance.webp"
  },
  armor: {
    labels: {
      title: "NIH.TraitArmorProf",
      localization: "NIH.TraitArmorPlural"
    },
    icon: "icons/equipment/chest/breastplate-helmet-metal.webp",
    actorKeyPath: "system.traits.armorProf",
    configKey: "armorProficiencies",
    subtypes: { keyPath: "armor.type", ids: ["armorIds", "shieldIds"] }
  },
  weapon: {
    labels: {
      title: "NIH.TraitWeaponProf",
      localization: "NIH.TraitWeaponPlural"
    },
    icon: "icons/skills/melee/weapons-crossed-swords-purple.webp",
    actorKeyPath: "system.traits.weaponProf",
    configKey: "weaponProficiencies",
    subtypes: { keyPath: "weaponType", ids: ["weaponIds"] },
    mastery: true
  },
  tool: {
    labels: {
      title: "NIH.TraitToolProf",
      localization: "NIH.TraitToolPlural"
    },
    icon: "icons/skills/trades/smithing-anvil-silver-red.webp",
    actorKeyPath: "system.tools",
    configKey: "toolProficiencies",
    subtypes: { keyPath: "toolType", ids: ["tools"] },
    children: { vehicle: "vehicleTypes" },
    sortCategories: true,
    expertise: true,
    dataType: MappingField
  },
  di: {
    labels: {
      title: "NIH.DamImm",
      localization: "NIH.TraitDIPlural"
    },
    icon: "systems/nih/icons/svg/trait-damage-immunities.svg",
    configKey: "damageTypes"
  },
  dr: {
    labels: {
      title: "NIH.DamRes",
      localization: "NIH.TraitDRPlural"
    },
    icon: "systems/nih/icons/svg/trait-damage-resistances.svg",
    configKey: "damageTypes"
  },
  dv: {
    labels: {
      title: "NIH.DamVuln",
      localization: "NIH.TraitDVPlural"
    },
    icon: "systems/nih/icons/svg/trait-damage-vulnerabilities.svg",
    configKey: "damageTypes"
  },
  dm: {
    labels: {
      title: "NIH.DamMod",
      localization: "NIH.TraitDMPlural"
    },
    configKey: "damageTypes",
    dataType: Number
  },
  ci: {
    labels: {
      title: "NIH.ConImm",
      localization: "NIH.TraitCIPlural"
    },
    icon: "systems/nih/icons/svg/trait-condition-immunities.svg",
    configKey: "conditionTypes",
    labelKeyPath: "name"
  }
};
preLocalize("traits", { keys: ["labels.title", "labels.all"] });

/* -------------------------------------------- */

/**
 * Modes used within a trait advancement.
 * @enum {{ label: string, hint: string }}
 */
NIH.traitModes = {
  default: {
    label: "NIH.ADVANCEMENT.Trait.Mode.Default.Label",
    hint: "NIH.ADVANCEMENT.Trait.Mode.Default.Hint"
  },
  expertise: {
    label: "NIH.ADVANCEMENT.Trait.Mode.Expertise.Label",
    hint: "NIH.ADVANCEMENT.Trait.Mode.Expertise.Hint"
  },
  forcedExpertise: {
    label: "NIH.ADVANCEMENT.Trait.Mode.Force.Label",
    hint: "NIH.ADVANCEMENT.Trait.Mode.Force.Hint"
  },
  upgrade: {
    label: "NIH.ADVANCEMENT.Trait.Mode.Upgrade.Label",
    hint: "NIH.ADVANCEMENT.Trait.Mode.Upgrade.Hint"
  },
  mastery: {
    label: "NIH.ADVANCEMENT.Trait.Mode.Mastery.Label",
    hint: "NIH.ADVANCEMENT.Trait.Mode.Mastery.Hint"
  }
};
preLocalize("traitModes", { keys: ["label", "hint"] });

/* -------------------------------------------- */

/**
 * Special character flags.
 * @enum {CharacterFlagConfiguration}
 */
NIH.characterFlags = {
  diamondSoul: {
    name: "NIH.FlagsDiamondSoul",
    hint: "NIH.FlagsDiamondSoulHint",
    section: "NIH.Feats",
    type: Boolean
  },
  enhancedDualWielding: {
    name: "NIH.FLAGS.EnhancedDualWielding.Name",
    hint: "NIH.FLAGS.EnhancedDualWielding.Hint",
    section: "NIH.Feats",
    type: Boolean
  },
  elvenAccuracy: {
    name: "NIH.FlagsElvenAccuracy",
    hint: "NIH.FlagsElvenAccuracyHint",
    section: "NIH.RacialTraits",
    abilities: ["dex", "int", "wis", "cha"],
    type: Boolean
  },
  halflingLucky: {
    name: "NIH.FlagsHalflingLucky",
    hint: "NIH.FlagsHalflingLuckyHint",
    section: "NIH.RacialTraits",
    type: Boolean
  },
  halflingNimbleness: {
    name: "NIH.FlagsHalflingNimbleness",
    hint: "NIH.FlagsHalflingNimblenessHint",
    section: "NIH.RacialTraits",
    type: Boolean
  },
  initiativeAlert: {
    name: "NIH.FlagsAlert",
    hint: "NIH.FlagsAlertHint",
    section: "NIH.Feats",
    type: Boolean
  },
  jackOfAllTrades: {
    name: "NIH.FlagsJOAT",
    hint: "NIH.FlagsJOATHint",
    section: "NIH.Feats",
    type: Boolean
  },
  observantFeat: {
    name: "NIH.FlagsObservant",
    hint: "NIH.FlagsObservantHint",
    skills: ["prc", "inv"],
    section: "NIH.Feats",
    type: Boolean
  },
  tavernBrawlerFeat: {
    name: "NIH.FlagsTavernBrawler",
    hint: "NIH.FlagsTavernBrawlerHint",
    section: "NIH.Feats",
    type: Boolean
  },
  powerfulBuild: {
    name: "NIH.FlagsPowerfulBuild",
    hint: "NIH.FlagsPowerfulBuildHint",
    section: "NIH.RacialTraits",
    type: Boolean
  },
  reliableTalent: {
    name: "NIH.FlagsReliableTalent",
    hint: "NIH.FlagsReliableTalentHint",
    section: "NIH.Feats",
    type: Boolean
  },
  remarkableAthlete: {
    name: "NIH.FlagsRemarkableAthlete",
    hint: "NIH.FlagsRemarkableAthleteHint",
    abilities: ["str", "dex", "con"],
    section: "NIH.Feats",
    type: Boolean
  },
  toolExpertise: {
    name: "NIH.FlagsToolExpertise",
    hint: "NIH.FlagsToolExpertiseHint",
    section: "NIH.Feats",
    type: Boolean
  },
  weaponCriticalThreshold: {
    name: "NIH.FlagsWeaponCritThreshold",
    hint: "NIH.FlagsWeaponCritThresholdHint",
    section: "NIH.Feats",
    type: Number,
    placeholder: 20
  },
  spellCriticalThreshold: {
    name: "NIH.FlagsSpellCritThreshold",
    hint: "NIH.FlagsSpellCritThresholdHint",
    section: "NIH.Feats",
    type: Number,
    placeholder: 20
  },
  meleeCriticalDamageDice: {
    name: "NIH.FlagsMeleeCriticalDice",
    hint: "NIH.FlagsMeleeCriticalDiceHint",
    section: "NIH.Feats",
    type: Number,
    placeholder: 0
  }
};
preLocalize("characterFlags", { keys: ["name", "hint", "section"] });

/* -------------------------------------------- */

/**
 * Different types of actor structures that groups can represent.
 * @enum {object}
 */
NIH.groupTypes = {
  party: "NIH.Group.TypeParty",
  encounter: "NIH.Group.TypeEncounter"
};
preLocalize("groupTypes");

/* -------------------------------------------- */

/**
 * Configuration information for activity types.
 * @enum {ActivityTypeConfiguration}
 */
NIH.activityTypes = {
  attack: {
    documentClass: activities.AttackActivity
  },
  cast: {
    documentClass: activities.CastActivity
  },
  check: {
    documentClass: activities.CheckActivity
  },
  damage: {
    documentClass: activities.DamageActivity
  },
  enchant: {
    documentClass: activities.EnchantActivity
  },
  forward: {
    documentClass: activities.ForwardActivity
  },
  heal: {
    documentClass: activities.HealActivity
  },
  order: {
    documentClass: activities.OrderActivity,
    configurable: false
  },
  save: {
    documentClass: activities.SaveActivity
  },
  summon: {
    documentClass: activities.SummonActivity
  },
  transform: {
    documentClass: activities.TransformActivity
  },
  utility: {
    documentClass: activities.UtilityActivity
  }
};

/* -------------------------------------------- */

const _ALL_ITEM_TYPES = ["background", "class", "feat", "race", "subclass"];

/**
 * Advancement types that can be added to items.
 * @enum {AdvancementTypeConfiguration}
 */
NIH.advancementTypes = {
  AbilityScoreImprovement: {
    documentClass: advancement.AbilityScoreImprovementAdvancement,
    validItemTypes: new Set(["background", "class", "race", "feat"])
  },
  HitPoints: {
    documentClass: advancement.HitPointsAdvancement,
    validItemTypes: new Set(["class"])
  },
  ItemChoice: {
    documentClass: advancement.ItemChoiceAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  },
  ItemGrant: {
    documentClass: advancement.ItemGrantAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  },
  ScaleValue: {
    documentClass: advancement.ScaleValueAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  },
  Size: {
    documentClass: advancement.SizeAdvancement,
    validItemTypes: new Set(["race"])
  },
  Subclass: {
    documentClass: advancement.SubclassAdvancement,
    validItemTypes: new Set(["class"])
  },
  Trait: {
    documentClass: advancement.TraitAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  }
};

/* -------------------------------------------- */

/**
 * Default artwork configuration for each Document type and sub-type.
 * @enum {Record<string, string>}
 */
NIH.defaultArtwork = {
  Actor: {
    character: "systems/nih/icons/svg/actors/character.svg",
    encounter: "systems/nih/icons/svg/actors/encounter.svg",
    group: "systems/nih/icons/svg/actors/group.svg",
    npc: "systems/nih/icons/svg/actors/npc.svg",
    vehicle: "systems/nih/icons/svg/actors/vehicle.svg"
  },
  Item: {
    background: "systems/nih/icons/svg/items/background.svg",
    class: "systems/nih/icons/svg/items/class.svg",
    consumable: "systems/nih/icons/svg/items/consumable.svg",
    container: "systems/nih/icons/svg/items/container.svg",
    equipment: "systems/nih/icons/svg/items/equipment.svg",
    facility: "systems/nih/icons/svg/items/facility.svg",
    feat: "systems/nih/icons/svg/items/feature.svg",
    loot: "systems/nih/icons/svg/items/loot.svg",
    race: "systems/nih/icons/svg/items/race.svg",
    spell: "systems/nih/icons/svg/items/spell.svg",
    subclass: "systems/nih/icons/svg/items/subclass.svg",
    tool: "systems/nih/icons/svg/items/tool.svg",
    weapon: "systems/nih/icons/svg/items/weapon.svg"
  }
};

/* -------------------------------------------- */
/*  Calendar                                    */
/* -------------------------------------------- */

/**
 * Configuration information for the calendar UI.
 * @type {CalendarHUDConfiguration}
 */
NIH.calendar = {
  application: CalenderHUD,
  calendars: [
    {
      value: "gregorian",
      label: "NIH.CALENDAR.Gregorian",
      config: foundry.data.SIMPLIFIED_GREGORIAN_CALENDAR_CONFIG
    },
    {
      value: "greyhawk",
      label: "NIH.CALENDAR.Greyhawk.Name",
      config: CALENDAR_OF_GREYHAWK,
      class: CalendarGreyhawk
    },
    {
      value: "harptos",
      label: "NIH.CALENDAR.Harptos.Name",
      config: CALENDAR_OF_HARPTOS,
      class: CalendarHarptos
    },
    {
      value: "khorvaire",
      label: "NIH.CALENDAR.Khorvaire.Name",
      config: CALENDAR_OF_KHORVAIRE,
      class: CalendarKhorvaire
    }
  ],
  formatters: [
    {
      value: "monthDay",
      label: "NIH.CALENDAR.Formatters.MonthDay.Label",
      formatter: "formatMonthDay",
      group: "NIH.CALENDAR.Formatters.Date"
    },
    {
      value: "monthDayYear",
      label: "NIH.CALENDAR.Formatters.MonthDayYear.Label",
      formatter: "formatMonthDayYear",
      group: "NIH.CALENDAR.Formatters.Date"
    },
    {
      value: "approximateDate",
      label: "NIH.CALENDAR.Formatters.ApproximateDate.Label",
      formatter: "formatApproximateDate",
      group: "NIH.CALENDAR.Formatters.Date"
    },
    {
      value: "hoursMinutes",
      label: "NIH.CALENDAR.Formatters.HoursMinutes.Label",
      formatter: "formatHoursMinutes",
      group: "NIH.CALENDAR.Formatters.Time"
    },
    {
      value: "hoursMinutesSeconds",
      label: "NIH.CALENDAR.Formatters.HoursMinutesSeconds.Label",
      formatter: "formatHoursMinutesSeconds",
      group: "NIH.CALENDAR.Formatters.Time"
    },
    {
      value: "approximateTime",
      label: "NIH.CALENDAR.Formatters.ApproximateTime.Label",
      formatter: "formatApproximateTime",
      group: "NIH.CALENDAR.Formatters.Time"
    }
  ]
};
preLocalize("calendar.calendars", { keys: ["label", "group"] });
preLocalize("calendar.formatters", { keys: ["label", "group"] });

/* -------------------------------------------- */
/*  Requests                                    */
/* -------------------------------------------- */

/**
 * Handler functions for named request/response operations
 * @type {Record<string, RequestCallback5e>}
 */
NIH.requests = {
  rest: Actor5e.handleRestRequest,
  skill: Actor5e.handleSkillCheckRequest
};

/* -------------------------------------------- */
/*  Rules                                       */
/* -------------------------------------------- */

/**
 * Types of rules that can be used in rule pages and the &Reference enricher.
 * @enum {RuleTypeConfiguration}
 */
NIH.ruleTypes = {
  rule: {
    label: "NIH.Rule.Type.Rule",
    references: "rules"
  },
  ability: {
    label: "NIH.Ability",
    references: "enrichmentLookup.abilities"
  },
  areaOfEffect: {
    label: "NIH.AreaOfEffect.Label",
    references: "areaTargetTypes"
  },
  condition: {
    label: "NIH.Rule.Type.Condition",
    references: "conditionTypes"
  },
  creatureType: {
    label: "NIH.CreatureType",
    references: "creatureTypes"
  },
  damage: {
    label: "NIH.DamageType",
    references: "damageTypes"
  },
  skill: {
    label: "NIH.Skill",
    references: "enrichmentLookup.skills"
  },
  spellComponent: {
    label: "NIH.SpellComponent",
    references: "itemProperties"
  },
  spellSchool: {
    label: "NIH.SpellSchool",
    references: "enrichmentLookup.spellSchools"
  },
  spellTag: {
    label: "NIH.SpellTag",
    references: "itemProperties"
  },
  weaponMastery: {
    label: "NIH.WEAPON.Mastery.Label",
    references: "weaponMasteries"
  }
};
preLocalize("ruleTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * List of rules that can be referenced from enrichers.
 * @enum {string}
 */
NIH.rules = {
  inspiration: "",
  carryingcapacity: "",
  push: "",
  lift: "",
  drag: "",
  encumbrance: "",
  hiding: "",
  passiveperception: "",
  time: "",
  speed: "",
  travelpace: "",
  forcedmarch: "",
  difficultterrainpace: "",
  climbing: "",
  swimming: "",
  longjump: "",
  highjump: "",
  falling: "",
  suffocating: "",
  vision: "",
  light: "",
  lightlyobscured: "",
  heavilyobscured: "",
  brightlight: "",
  dimlight: "",
  darkness: "",
  blindsight: "",
  darkvision: "",
  tremorsense: "",
  truesight: "",
  food: "",
  water: "",
  resting: "",
  shortrest: "",
  longrest: "",
  surprise: "",
  initiative: "",
  bonusaction: "",
  reaction: "",
  difficultterrain: "",
  beingprone: "",
  droppingprone: "",
  standingup: "",
  crawling: "",
  movingaroundothercreatures: "",
  flying: "",
  size: "",
  space: "",
  squeezing: "",
  attack: "",
  castaspell: "",
  dash: "",
  disengage: "",
  dodge: "",
  help: "",
  hide: "",
  ready: "",
  search: "",
  useanobject: "",
  attackrolls: "",
  unseenattackers: "",
  unseentargets: "",
  rangedattacks: "",
  range: "",
  rangedattacksinclosecombat: "",
  meleeattacks: "",
  reach: "",
  unarmedstrike: "",
  opportunityattacks: "",
  twoweaponfighting: "",
  grappling: "",
  escapingagrapple: "",
  movingagrappledcreature: "",
  shoving: "",
  cover: "",
  halfcover: "",
  threequarterscover: "",
  totalcover: "",
  hitpoints: "",
  damagerolls: "",
  criticalhits: "",
  damagetypes: "",
  damageresistance: "",
  damagevulnerability: "",
  healing: "",
  instantdeath: "",
  deathsavingthrows: "",
  deathsaves: "",
  stabilizing: "",
  knockingacreatureout: "",
  temporaryhitpoints: "",
  temphp: "",
  mounting: "",
  dismounting: "",
  controllingamount: "",
  underwatercombat: "",
  spelllevel: "",
  knownspells: "",
  preparedspells: "",
  spellslots: "",
  castingatahigherlevel: "",
  upcasting: "",
  castinginarmor: "",
  cantrips: "",
  rituals: "",
  castingtime: "",
  bonusactioncasting: "",
  reactioncasting: "",
  longercastingtimes: "",
  spellrange: "",
  components: "",
  verbal: "",
  spellduration: "",
  instantaneous: "",
  concentrating: "",
  spelltargets: "",
  areaofeffect: "",
  pointoforigin: "",
  spellsavingthrows: "",
  spellattackrolls: "",
  combiningmagicaleffects: "",
  schoolsofmagic: "",
  detectingtraps: "",
  disablingtraps: "",
  curingmadness: "",
  damagethreshold: "",
  poisontypes: "",
  contactpoison: "",
  ingestedpoison: "",
  inhaledpoison: "",
  injurypoison: "",
  attunement: "",
  wearingitems: "",
  wieldingitems: "",
  multipleitemsofthesamekind: "",
  paireditems: "",
  commandword: "",
  consumables: "",
  itemspells: "",
  charges: "",
  spellscroll: "",
  creaturetags: "",
  telepathy: "",
  legendaryactions: "",
  lairactions: "",
  regionaleffects: "",
  disease: "",
  d20test: "",
  advantage: "",
  disadvantage: "",
  difficultyclass: "",
  armorclass: "",
  abilitycheck: "",
  savingthrow: "",
  challengerating: "",
  expertise: "",
  influence: "",
  magic: "",
  study: "",
  utilize: "",
  friendly: "",
  indifferent: "",
  hostile: "",
  breakingobjects: "",
  hazards: "",
  bloodied: "",
  jumping: "",
  resistance: "",
  stable: ""
};

/* -------------------------------------------- */
/*  Sources                                     */
/* -------------------------------------------- */

/**
 * List of books available as sources.
 * @enum {string}
 */
NIH.sourceBooks = {};
preLocalize("sourceBooks", { sort: true });

/* -------------------------------------------- */
/*  Themes                                      */
/* -------------------------------------------- */

/**
 * Themes that can be set for the system or on sheets.
 * @enum {string}
 */
NIH.themes = {
  light: "SHEETS.NIH.THEME.Light",
  dark: "SHEETS.NIH.THEME.Dark"
};
preLocalize("themes");

/* -------------------------------------------- */
/*  Enrichment                                  */
/* -------------------------------------------- */

let _enrichmentLookup;
Object.defineProperty(NIH, "enrichmentLookup", {
  get() {
    const slugify = value => value?.slugify().replaceAll("-", "");
    if ( !_enrichmentLookup ) {
      _enrichmentLookup = {
        abilities: foundry.utils.deepClone(NIH.abilities),
        languages: _flattenConfig(NIH.languages, { labelKey: "label", skipEntry: (k, d) => d.selectable === false }),
        skills: foundry.utils.deepClone(NIH.skills),
        spellSchools: foundry.utils.deepClone(NIH.spellSchools),
        tools: foundry.utils.deepClone(NIH.tools)
      };
      const addFullKeys = key => Object.entries(NIH[key]).forEach(([k, v]) =>
        _enrichmentLookup[key][slugify(v.fullKey)] = { ...v, key: k }
      );
      addFullKeys("abilities");
      addFullKeys("skills");
      addFullKeys("spellSchools");
    }
    return _enrichmentLookup;
  },
  enumerable: true
});

/* -------------------------------------------- */

/**
 * Create a flattened version of a nested config (such as CONFIG.NIH.languages) so all leaf entries are at
 * a single level.
 * @param {object} config
 * @param {object} [options={}]
 * @param {string} [options.labelKey]        If provided, simplify all included objects to just the label.
 * @param {Function} [options.skipCategory]  Callback passed the key and data that should return a boolean to skip a
 *                                           category but not its children when creating flattened object.
 * @returns {object}
 */
function _flattenConfig(config, { labelKey, skipEntry }={}) {
  const obj = {};
  for ( const [key, data] of Object.entries(config) ) {
    if ( !skipEntry?.(key, data) ) {
      if ( labelKey && (foundry.utils.getType(data) === "Object") ) obj[key] = data[labelKey];
      else obj[key] = data;
    }
    if ( data.children ) Object.assign(obj, _flattenConfig(data.children, { labelKey, skipEntry }));
  }
  return obj;
}

/* -------------------------------------------- */

/**
 * Patch an existing config enum to allow conversion from string values to object values without
 * breaking existing modules that are expecting strings.
 * @param {string} key          Key within NIH that has been replaced with an enum of objects.
 * @param {string} fallbackKey  Key within the new config object from which to get the fallback value.
 * @param {object} [options]    Additional options passed through to logCompatibilityWarning.
 */
function patchConfig(key, fallbackKey, options) {
  /** @override */
  function toString() {
    const message = `The value of CONFIG.NIH.${key} has been changed to an object.`
      +` The former value can be acccessed from .${fallbackKey}.`;
    foundry.utils.logCompatibilityWarning(message, options);
    return this[fallbackKey];
  }

  Object.values(NIH[key]).forEach(o => {
    if ( foundry.utils.getType(o) !== "Object" ) return;
    Object.defineProperty(o, "toString", {value: toString});
  });
}

/* -------------------------------------------- */

export default NIH;
