import * as advancement from "./documents/advancement/_module.mjs";
import { preLocalize } from "./utils.mjs";

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

/**
 * Configuration data for abilities.
 *
 * @typedef {object} AbilityConfiguration
 * @property {string} label                               Localized label.
 * @property {string} abbreviation                        Localized abbreviation.
 * @property {string} [type]                              Whether this is a "physical" or "mental" ability.
 * @property {Object<string, number|string>}  [defaults]  Default values for this ability based on actor type.
 *                                                        If a string is used, the system will attempt to fetch.
 *                                                        the value of the specified ability.
 */

/**
 * The set of Ability Scores used within the system.
 * @enum {AbilityConfiguration}
 */
NIH.abilities = {
	str: {
		label: "NIH.AbilityStr",
		abbreviation: "NIH.AbilityStrAbbr",
		type: "physical"
	},
	dex: {
		label: "NIH.AbilityDex",
		abbreviation: "NIH.AbilityDexAbbr",
		type: "physical"
	},
	con: {
		label: "NIH.AbilityCon",
		abbreviation: "NIH.AbilityConAbbr",
		type: "physical"
	},
	int: {
		label: "NIH.AbilityInt",
		abbreviation: "NIH.AbilityIntAbbr",
		type: "mental",
		defaults: { vehicle: 0 }
	},
	wis: {
		label: "NIH.AbilityWis",
		abbreviation: "NIH.AbilityWisAbbr",
		type: "mental",
		defaults: { vehicle: 0 }
	},
	cha: {
		label: "NIH.AbilityCha",
		abbreviation: "NIH.AbilityChaAbbr",
		type: "mental",
		defaults: { vehicle: 0 }
	}
};
preLocalize("abilities", { keys: ["label", "abbreviation"] });
patchConfig("abilities", "label", { since: 2.2, until: 2.4 });

Object.defineProperty(NIH, "abilityAbbreviations", {
	get() {
		foundry.utils.logCompatibilityWarning(
			"The `abilityAbbreviations` configuration object has been merged with `abilities`.",
			{ since: "Nih 2.2", until: "Nih 2.4" }
		);
		return Object.fromEntries(Object.entries(NIH.abilities).map(([k, v]) => [k, v.abbreviation]));
	}
});

/**
 * Configure which ability score is used as the default modifier for initiative rolls.
 * @type {string}
 */
NIH.initiativeAbility = "dex";

/**
 * Configure which ability score is used when calculating hit points per level.
 * @type {string}
 */
NIH.hitPointsAbility = "con";

/* -------------------------------------------- */

/**
 * Configuration data for skills.
 *
 * @typedef {object} SkillConfiguration
 * @property {string} label    Localized label.
 * @property {string} ability  Key for the default ability used by this skill.
 */

/**
 * The set of skill which can be trained with their default ability scores.
 * @enum {SkillConfiguration}
 */
NIH.skills = {
	acr: { label: "NIH.SkillAcr", ability: "dex" },
	ani: { label: "NIH.SkillAni", ability: "wis" },
	arc: { label: "NIH.SkillArc", ability: "int" },
	ath: { label: "NIH.SkillAth", ability: "str" },
	dec: { label: "NIH.SkillDec", ability: "cha" },
	his: { label: "NIH.SkillHis", ability: "int" },
	ins: { label: "NIH.SkillIns", ability: "wis" },
	itm: { label: "NIH.SkillItm", ability: "cha" },
	inv: { label: "NIH.SkillInv", ability: "int" },
	med: { label: "NIH.SkillMed", ability: "wis" },
	nat: { label: "NIH.SkillNat", ability: "int" },
	prc: { label: "NIH.SkillPrc", ability: "wis" },
	prf: { label: "NIH.SkillPrf", ability: "cha" },
	per: { label: "NIH.SkillPer", ability: "cha" },
	rel: { label: "NIH.SkillRel", ability: "int" },
	slt: { label: "NIH.SkillSlt", ability: "dex" },
	ste: { label: "NIH.SkillSte", ability: "dex" },
	sur: { label: "NIH.SkillSur", ability: "wis" }
};
preLocalize("skills", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Character alignment options.
 * @enum {string}
 */
NIH.alignments = {
	lg: "NIH.AlignmentLG",
	ng: "NIH.AlignmentNG",
	cg: "NIH.AlignmentCG",
	ln: "NIH.AlignmentLN",
	tn: "NIH.AlignmentTN",
	cn: "NIH.AlignmentCN",
	le: "NIH.AlignmentLE",
	ne: "NIH.AlignmentNE",
	ce: "NIH.AlignmentCE"
};
preLocalize("alignments");

/* -------------------------------------------- */

/**
 * An enumeration of item attunement types.
 * @enum {number}
 */
NIH.attunementTypes = {
	NONE: 0,
	REQUIRED: 1,
	ATTUNED: 2
};

/**
 * An enumeration of item attunement states.
 * @type {{"0": string, "1": string, "2": string}}
 */
NIH.attunements = {
	0: "NIH.AttunementNone",
	1: "NIH.AttunementRequired",
	2: "NIH.AttunementAttuned"
};
preLocalize("attunements");

/* -------------------------------------------- */

/**
 * General weapon categories.
 * @enum {string}
 */
NIH.weaponProficiencies = {
	sim: "NIH.WeaponSimpleProficiency",
	mar: "NIH.WeaponMartialProficiency",
	exo: "NIH.WeaponExoticProficiency"
};
preLocalize("weaponProficiencies");

/**
 * A mapping between `NIH.weaponTypes` and `NIH.weaponProficiencies` that
 * is used to determine if character has proficiency when adding an item.
 * @enum {(boolean|string)}
 */
NIH.weaponProficienciesMap = {
	simpleM: "sim",
	simpleR: "sim",
	martialM: "mar",
	martialR: "mar",
	exoticR: "exo"
};

/**
 * The basic weapon types in 5e. This enables specific weapon proficiencies or
 * starting equipment provided by classes and backgrounds.
 * @enum {string}
 */
NIH.weaponIds = {
	battleaxe: "I0WocDSuNpGJayPb",
	blowgun: "wNWK6yJMHG9ANqQV",
	club: "nfIRTECQIG81CvM4",
	dagger: "0E565kQUBmndJ1a2",
	dart: "3rCO8MTIdPGSW6IJ",
	flail: "UrH3sMdnUDckIHJ6",
	glaive: "rOG1OM2ihgPjOvFW",
	greataxe: "1Lxk6kmoRhG8qQ0u",
	greatclub: "QRCsxkCwWNwswL9o",
	greatsword: "xMkP8BmFzElcsMaR",
	halberd: "DMejWAc8r8YvDPP1",
	handaxe: "eO7Fbv5WBk5zvGOc",
	handcrossbow: "qaSro7kFhxD6INbZ",
	heavycrossbow: "RmP0mYRn2J7K26rX",
	javelin: "DWLMnODrnHn8IbAG",
	lance: "RnuxdHUAIgxccVwj",
	lightcrossbow: "ddWvQRLmnnIS0eLF",
	lighthammer: "XVK6TOL4sGItssAE",
	longbow: "3cymOVja8jXbzrdT",
	longsword: "10ZP2Bu3vnCuYMIB",
	mace: "Ajyq6nGwF7FtLhDQ",
	maul: "DizirD7eqjh8n95A",
	morningstar: "dX8AxCh9o0A9CkT3",
	net: "aEiM49V8vWpWw7rU",
	pike: "tC0kcqZT9HHAO0PD",
	quarterstaff: "g2dWN7PQiMRYWzyk",
	rapier: "Tobce1hexTnDk4sV",
	scimitar: "fbC0Mg1a73wdFbqO",
	shortsword: "osLzOwQdPtrK3rQH",
	sickle: "i4NeNZ30ycwPDHMx",
	spear: "OG4nBBydvmfWYXIk",
	shortbow: "GJv6WkD7D2J6rP6M",
	sling: "3gynWO9sN4OLGMWD",
	trident: "F65ANO66ckP8FDMa",
	warpick: "2YdfjN1PIIrSHZii",
	warhammer: "F0Df164Xv1gWcYt0",
	whip: "QKTyxoO0YDnAsbYe"
};

/* -------------------------------------------- */

/**
 * The basic ammunition types.
 * @enum {string}
 */
NIH.ammoIds = {
	arrow: "3c7JXOzsv55gqJS5",
	blowgunNeedle: "gBQ8xqTA5f8wP5iu",
	crossbowBolt: "SItCnYBqhzqBoaWG",
	slingBullet: "z9SbsMIBZzuhZOqT"
};

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
 * The basic tool types in 5e. This enables specific tool proficiencies or
 * starting equipment provided by classes and backgrounds.
 * @enum {string}
 */
NIH.toolIds = {
	alchemist: "SztwZhbhZeCqyAes",
	bagpipes: "yxHi57T5mmVt0oDr",
	brewer: "Y9S75go1hLMXUD48",
	calligrapher: "jhjo20QoiD5exf09",
	card: "YwlHI3BVJapz4a3E",
	carpenter: "8NS6MSOdXtUqD7Ib",
	cartographer: "fC0lFK8P4RuhpfaU",
	chess: "23y8FvWKf9YLcnBL",
	cobbler: "hM84pZnpCqKfi8XH",
	cook: "Gflnp29aEv5Lc1ZM",
	dice: "iBuTM09KD9IoM5L8",
	disg: "IBhDAr7WkhWPYLVn",
	drum: "69Dpr25pf4BjkHKb",
	dulcimer: "NtdDkjmpdIMiX7I2",
	flute: "eJOrPcAz9EcquyRQ",
	forg: "cG3m4YlHfbQlLEOx",
	glassblower: "rTbVrNcwApnuTz5E",
	herb: "i89okN7GFTWHsvPy",
	horn: "aa9KuBy4dst7WIW9",
	jeweler: "YfBwELTgPFHmQdHh",
	leatherworker: "PUMfwyVUbtyxgYbD",
	lute: "qBydtUUIkv520DT7",
	lyre: "EwG1EtmbgR3bM68U",
	mason: "skUih6tBvcBbORzA",
	navg: "YHCmjsiXxZ9UdUhU",
	painter: "ccm5xlWhx74d6lsK",
	panflute: "G5m5gYIx9VAUWC3J",
	pois: "il2GNi8C0DvGLL9P",
	potter: "hJS8yEVkqgJjwfWa",
	shawm: "G3cqbejJpfB91VhP",
	smith: "KndVe2insuctjIaj",
	thief: "woWZ1sO5IUVGzo58",
	tinker: "0d08g1i5WXnNrCNA",
	viol: "baoe3U5BfMMMxhCU",
	weaver: "ap9prThUB2y9lDyj",
	woodcarver: "xKErqkLo4ASYr5EP"
};

/* -------------------------------------------- */

/**
 * Time periods that accept a numeric value.
 * @enum {string}
 */
NIH.scalarTimePeriods = {
	turn: "NIH.TimeTurn",
	round: "NIH.TimeRound",
	minute: "NIH.TimeMinute",
	hour: "NIH.TimeHour",
	day: "NIH.TimeDay",
	month: "NIH.TimeMonth",
	year: "NIH.TimeYear"
};
preLocalize("scalarTimePeriods");

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
 * Various ways in which an item or ability can be activated.
 * @enum {string}
 */
NIH.abilityActivationTypes = {
	action: "NIH.Action",
	bonus: "NIH.BonusAction",
	reaction: "NIH.Reaction",
	minute: NIH.timePeriods.minute,
	hour: NIH.timePeriods.hour,
	day: NIH.timePeriods.day,
	special: NIH.timePeriods.spec,
	legendary: "NIH.LegendaryActionLabel",
	mythic: "NIH.MythicActionLabel",
	lair: "NIH.LairActionLabel",
	crew: "NIH.VehicleCrewAction"
};
preLocalize("abilityActivationTypes");

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
 * Creature sizes.
 * @enum {string}
 */
NIH.actorSizes = {
	tiny: "NIH.SizeTiny",
	sm: "NIH.SizeSmall",
	med: "NIH.SizeMedium",
	lg: "NIH.SizeLarge",
	huge: "NIH.SizeHuge",
	grg: "NIH.SizeGargantuan"
};
preLocalize("actorSizes");

/**
 * Default token image size for the values of `NIH.actorSizes`.
 * @enum {number}
 */
NIH.tokenSizes = {
	tiny: 0.5,
	sm: 1,
	med: 1,
	lg: 2,
	huge: 3,
	grg: 4
};

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
 * Default types of creatures.
 * *Note: Not pre-localized to allow for easy fetching of pluralized forms.*
 * @enum {string}
 */
NIH.creatureTypes = {
	aberration: "NIH.CreatureAberration",
	beast: "NIH.CreatureBeast",
	celestial: "NIH.CreatureCelestial",
	construct: "NIH.CreatureConstruct",
	dragon: "NIH.CreatureDragon",
	elemental: "NIH.CreatureElemental",
	fey: "NIH.CreatureFey",
	fiend: "NIH.CreatureFiend",
	giant: "NIH.CreatureGiant",
	humanoid: "NIH.CreatureHumanoid",
	monstrosity: "NIH.CreatureMonstrosity",
	ooze: "NIH.CreatureOoze",
	plant: "NIH.CreaturePlant",
	undead: "NIH.CreatureUndead"
};

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
	save: "NIH.ActionSave",
	heal: "NIH.ActionHeal",
	abil: "NIH.ActionAbil",
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
	common: "NIH.ItemRarityCommon",
	uncommon: "NIH.ItemRarityUncommon",
	rare: "NIH.ItemRarityRare",
	veryRare: "NIH.ItemRarityVeryRare",
	legendary: "NIH.ItemRarityLegendary",
	artifact: "NIH.ItemRarityArtifact"
};
preLocalize("itemRarity");

/* -------------------------------------------- */

/**
 * Enumerate the lengths of time over which an item can have limited use ability.
 * @enum {string}
 */
NIH.limitedUsePeriods = {
	sr: "NIH.ShortRest",
	lr: "NIH.LongRest",
	day: "NIH.Day",
	charges: "NIH.Charges"
};
preLocalize("limitedUsePeriods");

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
 * Equipment types that aren't armor.
 * @enum {string}
 */
NIH.miscEquipmentTypes = {
	clothing: "NIH.EquipmentClothing",
	trinket: "NIH.EquipmentTrinket",
	vehicle: "NIH.EquipmentVehicle"
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
	air: "NIH.VehicleTypeAir",
	land: "NIH.VehicleTypeLand",
	space: "NIH.VehicleTypeSpace",
	water: "NIH.VehicleTypeWater"
};
preLocalize("vehicleTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The set of Armor Proficiencies which a character may have.
 * @type {object}
 */
NIH.armorProficiencies = {
	lgt: NIH.equipmentTypes.light,
	med: NIH.equipmentTypes.medium,
	hvy: NIH.equipmentTypes.heavy,
	shl: "NIH.EquipmentShieldProficiency"
};
preLocalize("armorProficiencies");

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

/**
 * The basic armor types in 5e. This enables specific armor proficiencies,
 * automated AC calculation in NPCs, and starting equipment.
 * @enum {string}
 */
NIH.armorIds = {
	breastplate: "SK2HATQ4abKUlV8i",
	chainmail: "rLMflzmxpe8JGTOA",
	chainshirt: "p2zChy24ZJdVqMSH",
	halfplate: "vsgmACFYINloIdPm",
	hide: "n1V07puo0RQxPGuF",
	leather: "WwdpHLXGX5r8uZu5",
	padded: "GtKV1b5uqFQqpEni",
	plate: "OjkIqlW2UpgFcjZa",
	ringmail: "nsXZejlmgalj4he9",
	scalemail: "XmnlF5fgIO3tg6TG",
	splint: "cKpJmsJmU8YaiuqG",
	studded: "TIV3B1vbrVHIhQAm"
};

/**
 * The basic shield in 5e.
 * @enum {string}
 */
NIH.shieldIds = {
	shield: "sSs3hSzkKBMNBgTs"
};

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
		label: "NIH.ArmorClassUnarmoredMonk",
		formula: "10 + @abilities.dex.mod + @abilities.wis.mod"
	},
	unarmoredBarb: {
		label: "NIH.ArmorClassUnarmoredBarbarian",
		formula: "10 + @abilities.dex.mod + @abilities.con.mod"
	},
	custom: {
		label: "NIH.ArmorClassCustom"
	}
};
preLocalize("armorClasses", { key: "label" });

/* -------------------------------------------- */

/**
 * Enumerate the valid consumable types which are recognized by the system.
 * @enum {string}
 */
NIH.consumableTypes = {
	ammo: "NIH.ConsumableAmmo",
	potion: "NIH.ConsumablePotion",
	poison: "NIH.ConsumablePoison",
	food: "NIH.ConsumableFood",
	scroll: "NIH.ConsumableScroll",
	wand: "NIH.ConsumableWand",
	rod: "NIH.ConsumableRod",
	trinket: "NIH.ConsumableTrinket"
};
preLocalize("consumableTypes", { sort: true });

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
 * Configuration data for spellcasting foci.
 *
 * @typedef {object} SpellcastingFocusConfiguration
 * @property {string} label                    Localized label for this category.
 * @property {Object<string, string>} itemIds  Item IDs or UUIDs.
 */

/**
 * Type of spellcasting foci.
 * @enum {SpellcastingFocusConfiguration}
 */
NIH.focusTypes = {
	arcane: {
		label: "NIH.Focus.Arcane",
		itemIds: {
			crystal: "uXOT4fYbgPY8DGdd",
			orb: "tH5Rn0JVRG1zdmPa",
			rod: "OojyyGfh91iViuMF",
			staff: "BeKIrNIvNHRPQ4t5",
			wand: "KA2P6I48iOWlnboO"
		}
	},
	druidic: {
		label: "NIH.Focus.Druidic",
		itemIds: {
			mistletoe: "xDK9GQd2iqOGH8Sd",
			totem: "PGL6aaM0wE5h0VN5",
			woodenstaff: "FF1ktpb2YSiyv896",
			yewwand: "t5yP0d7YaKwuKKiH"
		}
	},
	holy: {
		label: "NIH.Focus.Holy",
		itemIds: {
			amulet: "paqlMjggWkBIAeCe",
			emblem: "laVqttkGMW4B9654",
			reliquary: "gP1URGq3kVIIFHJ7"
		}
	}
};

/* -------------------------------------------- */

/**
 * Configuration data for an item with the "feature" type.
 *
 * @typedef {object} FeatureTypeConfiguration
 * @property {string} label                       Localized label for this type.
 * @property {Object<string, string>} [subtypes]  Enum containing localized labels for subtypes.
 */

/**
 * Types of "features" items.
 * @enum {FeatureTypeConfiguration}
 */
NIH.featureTypes = {
	background: {
		label: "NIH.Feature.Background"
	},
	class: {
		label: "NIH.Feature.Class",
		subtypes: {
			arcaneShot: "NIH.ClassFeature.ArcaneShot",
			artificerInfusion: "NIH.ClassFeature.ArtificerInfusion",
			channelDivinity: "NIH.ClassFeature.ChannelDivinity",
			defensiveTactic: "NIH.ClassFeature.DefensiveTactic",
			eldritchInvocation: "NIH.ClassFeature.EldritchInvocation",
			elementalDiscipline: "NIH.ClassFeature.ElementalDiscipline",
			fightingStyle: "NIH.ClassFeature.FightingStyle",
			huntersPrey: "NIH.ClassFeature.HuntersPrey",
			ki: "NIH.ClassFeature.Ki",
			maneuver: "NIH.ClassFeature.Maneuver",
			metamagic: "NIH.ClassFeature.Metamagic",
			multiattack: "NIH.ClassFeature.Multiattack",
			pact: "NIH.ClassFeature.PactBoon",
			psionicPower: "NIH.ClassFeature.PsionicPower",
			rune: "NIH.ClassFeature.Rune",
			superiorHuntersDefense: "NIH.ClassFeature.SuperiorHuntersDefense"
		}
	},
	monster: {
		label: "NIH.Feature.Monster"
	},
	race: {
		label: "NIH.Feature.Race"
	},
	feat: {
		label: "NIH.Feature.Feat"
	}
};
preLocalize("featureTypes", { key: "label" });
preLocalize("featureTypes.class.subtypes", { sort: true });

/* -------------------------------------------- */

/**
 * @typedef {object} CurrencyConfiguration
 * @property {string} label         Localized label for the currency.
 * @property {string} abbreviation  Localized abbreviation for the currency.
 * @property {number} conversion    Number by which this currency should be multiplied to arrive at a standard value.
 */

/**
 * The valid currency denominations with localized labels, abbreviations, and conversions.
 * The conversion number defines how many of that currency are equal to one GP.
 * @enum {CurrencyConfiguration}
 */
NIH.currencies = {
	pp: {
		label: "NIH.CurrencyPP",
		abbreviation: "NIH.CurrencyAbbrPP",
		conversion: 0.1
	},
	gp: {
		label: "NIH.CurrencyGP",
		abbreviation: "NIH.CurrencyAbbrGP",
		conversion: 1
	},
	sp: {
		label: "NIH.CurrencySP",
		abbreviation: "NIH.CurrencyAbbrSP",
		conversion: 10
	},
	cp: {
		label: "NIH.CurrencyCP",
		abbreviation: "NIH.CurrencyAbbrCP",
		conversion: 100
	}
};
preLocalize("currencies", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */
/*  Damage Types                                */
/* -------------------------------------------- */

/**
 * Types of damage that are considered physical.
 * @enum {string}
 */
NIH.physicalDamageTypes = {
	bludgeoning: "NIH.DamageBludgeoning",
	piercing: "NIH.DamagePiercing",
	slashing: "NIH.DamageSlashing"
};
preLocalize("physicalDamageTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Types of damage the can be caused by abilities.
 * @enum {string}
 */
NIH.damageTypes = {
	...NIH.physicalDamageTypes,
	acid: "NIH.DamageAcid",
	cold: "NIH.DamageCold",
	fire: "NIH.DamageFire",
	lightning: "NIH.DamageLightning",
	necrotic: "NIH.DamageNecrotic",
	poison: "NIH.DamagePoison",
	psychic: "NIH.DamagePsychic",
	radiant: "NIH.DamageRadiant",
	thunder: "NIH.DamageThunder"
};
preLocalize("damageTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Types of damage to which an actor can possess resistance, immunity, or vulnerability.
 * @enum {string}
 * @deprecated
 */
NIH.damageResistanceTypes = {
	...NIH.damageTypes,
	physical: "NIH.DamagePhysical"
};
preLocalize("damageResistanceTypes", { sort: true });

/* -------------------------------------------- */
/*  Movement                                    */
/* -------------------------------------------- */

/**
 * Different types of healing that can be applied using abilities.
 * @enum {string}
 */
NIH.healingTypes = {
	healing: "NIH.Healing",
	temphp: "NIH.HealingTemp"
};
preLocalize("healingTypes");

/* -------------------------------------------- */

/**
 * The valid units of measure for movement distances in the game system.
 * By default this uses the imperial units of feet and miles.
 * @enum {string}
 */
NIH.movementTypes = {
	burrow: "NIH.MovementBurrow",
	climb: "NIH.MovementClimb",
	fly: "NIH.MovementFly",
	swim: "NIH.MovementSwim",
	walk: "NIH.MovementWalk"
};
preLocalize("movementTypes", { sort: true });

/* -------------------------------------------- */
/*  Measurement                                 */
/* -------------------------------------------- */

/**
 * The valid units of measure for movement distances in the game system.
 * By default this uses the imperial units of feet and miles.
 * @enum {string}
 */
NIH.movementUnits = {
	ft: "NIH.DistFt",
	mi: "NIH.DistMi",
	m: "NIH.DistM",
	km: "NIH.DistKm"
};
preLocalize("movementUnits");

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
	...NIH.movementUnits,
	...NIH.rangeTypes
};
preLocalize("distanceUnits");

/* -------------------------------------------- */

/**
 * Configure aspects of encumbrance calculation so that it could be configured by modules.
 * @enum {{ imperial: number, metric: number }}
 */
NIH.encumbrance = {
	currencyPerWeight: {
		imperial: 50,
		metric: 110
	},
	strMultiplier: {
		imperial: 15,
		metric: 6.8
	},
	vehicleWeightMultiplier: {
		imperial: 2000, // 2000 lbs in an imperial ton
		metric: 1000 // 1000 kg in a metric ton
	}
};

/* -------------------------------------------- */
/*  Targeting                                   */
/* -------------------------------------------- */

/**
 * Targeting types that apply to one or more distinct targets.
 * @enum {string}
 */
NIH.individualTargetTypes = {
	self: "NIH.TargetSelf",
	ally: "NIH.TargetAlly",
	enemy: "NIH.TargetEnemy",
	creature: "NIH.TargetCreature",
	object: "NIH.TargetObject",
	space: "NIH.TargetSpace",
	creatureOrObject: "NIH.TargetCreatureOrObject",
	any: "NIH.TargetAny",
	willing: "NIH.TargetWilling"
};
preLocalize("individualTargetTypes");

/* -------------------------------------------- */

/**
 * Information needed to represent different area of effect target types.
 *
 * @typedef {object} AreaTargetDefinition
 * @property {string} label     Localized label for this type.
 * @property {string} template  Type of `MeasuredTemplate` create for this target type.
 */

/**
 * Targeting types that cover an area.
 * @enum {AreaTargetDefinition}
 */
NIH.areaTargetTypes = {
	radius: {
		label: "NIH.TargetRadius",
		template: "circle"
	},
	sphere: {
		label: "NIH.TargetSphere",
		template: "circle"
	},
	cylinder: {
		label: "NIH.TargetCylinder",
		template: "circle"
	},
	cone: {
		label: "NIH.TargetCone",
		template: "cone"
	},
	square: {
		label: "NIH.TargetSquare",
		template: "rect"
	},
	cube: {
		label: "NIH.TargetCube",
		template: "rect"
	},
	line: {
		label: "NIH.TargetLine",
		template: "ray"
	},
	wall: {
		label: "NIH.TargetWall",
		template: "ray"
	}
};
preLocalize("areaTargetTypes", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * The types of single or area targets which can be applied to abilities.
 * @enum {string}
 */
NIH.targetTypes = {
	...NIH.individualTargetTypes,
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
/*  Spellcasting                                */
/* -------------------------------------------- */

/**
 * Define the standard slot progression by character level.
 * The entries of this array represent the spell slot progression for a full spell-caster.
 * @type {number[][]}
 */
NIH.SPELL_SLOT_TABLE = [
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
 * Configuration data for pact casting progression.
 *
 * @typedef {object} PactProgressionConfig
 * @property {number} slots  Number of spell slots granted.
 * @property {number} level  Level of spells that can be cast.
 */

/**
 * Define the pact slot & level progression by pact caster level.
 * @enum {PactProgressionConfig}
 */
NIH.pactCastingProgression = {
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
 * Various different ways a spell can be prepared.
 */
NIH.spellPreparationModes = {
	prepared: "NIH.SpellPrepPrepared",
	pact: "NIH.PactMagic",
	always: "NIH.SpellPrepAlways",
	atwill: "NIH.SpellPrepAtWill",
	innate: "NIH.SpellPrepInnate"
};
preLocalize("spellPreparationModes");

/* -------------------------------------------- */

/**
 * Subset of `NIH.spellPreparationModes` that consume spell slots.
 * @type {boolean[]}
 */
NIH.spellUpcastModes = ["always", "pact", "prepared"];

/* -------------------------------------------- */

/**
 * Configuration data for different types of spellcasting supported.
 *
 * @typedef {object} SpellcastingTypeConfiguration
 * @property {string} label                                                        Localized label.
 * @property {Object<string, SpellcastingProgressionConfiguration>} [progression]  Any progression modes for this type.
 */

/**
 * Configuration data for a spellcasting progression mode.
 *
 * @typedef {object} SpellcastingProgressionConfiguration
 * @property {string} label             Localized label.
 * @property {number} [divisor=1]       Value by which the class levels are divided to determine spellcasting level.
 * @property {boolean} [roundUp=false]  Should fractional values should be rounded up by default?
 */

/**
 * Different spellcasting types and their progression.
 * @type {SpellcastingTypeConfiguration}
 */
NIH.spellcastingTypes = {
	leveled: {
		label: "NIH.SpellProgLeveled",
		progression: {
			full: {
				label: "NIH.SpellProgFull",
				divisor: 1
			},
			half: {
				label: "NIH.SpellProgHalf",
				divisor: 2
			},
			third: {
				label: "NIH.SpellProgThird",
				divisor: 3
			},
			artificer: {
				label: "NIH.SpellProgArt",
				divisor: 2,
				roundUp: true
			}
		}
	},
	pact: {
		label: "NIH.SpellProgPact"
	}
};
preLocalize("spellcastingTypes", { key: "label", sort: true });
preLocalize("spellcastingTypes.leveled.progression", { key: "label" });

/* -------------------------------------------- */

/**
 * Ways in which a class can contribute to spellcasting levels.
 * @enum {string}
 */
NIH.spellProgression = {
	none: "NIH.SpellNone",
	full: "NIH.SpellProgFull",
	half: "NIH.SpellProgHalf",
	third: "NIH.SpellProgThird",
	pact: "NIH.SpellProgPact",
	artificer: "NIH.SpellProgArt"
};
preLocalize("spellProgression", { key: "label" });

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
 * Types of components that can be required when casting a spell.
 * @enum {object}
 */
NIH.spellComponents = {
	vocal: {
		label: "NIH.ComponentVerbal",
		abbr: "NIH.ComponentVerbalAbbr"
	},
	somatic: {
		label: "NIH.ComponentSomatic",
		abbr: "NIH.ComponentSomaticAbbr"
	},
	material: {
		label: "NIH.ComponentMaterial",
		abbr: "NIH.ComponentMaterialAbbr"
	}
};
preLocalize("spellComponents", {keys: ["label", "abbr"]});

/* -------------------------------------------- */

/**
 * Supplementary rules keywords that inform a spell's use.
 * @enum {object}
 */
NIH.spellTags = {
	concentration: {
		label: "NIH.Concentration",
		abbr: "NIH.ConcentrationAbbr"
	}
};
preLocalize("spellTags", {keys: ["label", "abbr"]});

/* -------------------------------------------- */

/**
 * Spell scroll item ID within the `NIH.sourcePacks` compendium for each level.
 * @enum {string}
 */
NIH.spellScrollIds = {
	0: "rQ6sO7HDWzqMhSI3",
	1: "9GSfMg0VOA2b4uFN",
	2: "XdDp6CKh9qEvPTuS",
	3: "hqVKZie7x9w3Kqds",
	4: "DM7hzgL836ZyUFB1",
	5: "wa1VF8TXHmkrrR35",
	6: "tI3rWx4bxefNCexS",
	7: "mtyw4NS1s7j2EJaD",
	8: "aOrinPg7yuDZEuWr",
	9: "O4YbkJkLlnsgUszZ"
};

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
	siege: "NIH.WeaponSiege",
	exoticR: "NIH.WeaponExoticR"
};
preLocalize("weaponTypes");

/* -------------------------------------------- */

/**
 * A subset of weapon properties that determine the physical characteristics of the weapon.
 * These properties are used for determining physical resistance bypasses.
 * @enum {string}
 */
NIH.physicalWeaponProperties = {
	ada: "NIH.WeaponPropertiesAda",
	mgc: "NIH.WeaponPropertiesMgc",
	sil: "NIH.WeaponPropertiesSil"
};
preLocalize("physicalWeaponProperties", { sort: true });

/* -------------------------------------------- */

/**
 * The set of weapon property flags which can exist on a weapon.
 * @enum {string}
 */
NIH.weaponProperties = {
	...NIH.physicalWeaponProperties,
	amm: "NIH.WeaponPropertiesAmm",
	bat: "NIH.WeaponPropertiesBat",
	con: "NIH.WeaponPropertiesCon",
	cle: "NIH.WeaponPropertiesCle",
	fin: "NIH.WeaponPropertiesFin",
	fir: "NIH.WeaponPropertiesFir",
	foc: "NIH.WeaponPropertiesFoc",
	hvy: "NIH.WeaponPropertiesHvy",
	lgt: "NIH.WeaponPropertiesLgt",
	lod: "NIH.WeaponPropertiesLod",
	par: "NIH.WeaponPropertiesPar",
	pre: "NIH.WeaponPropertiesPre",
	rch: "NIH.WeaponPropertiesRch",
	rel: "NIH.WeaponPropertiesRel",
	ret: "NIH.WeaponPropertiesRet",
	spc: "NIH.WeaponPropertiesSpc",
	thr: "NIH.WeaponPropertiesThr",
	two: "NIH.WeaponPropertiesTwo",
	ver: "NIH.WeaponPropertiesVer"
};
preLocalize("weaponProperties", { sort: true });

/* -------------------------------------------- */

/**
 * Compendium packs used for localized items.
 * @enum {string}
 */
NIH.sourcePacks = {
	ITEMS: "nih.items"
};

/* -------------------------------------------- */

/**
 * Settings to configure how actors are merged when polymorphing is applied.
 * @enum {string}
 */
NIH.polymorphSettings = {
	keepPhysical: "NIH.PolymorphKeepPhysical",
	keepMental: "NIH.PolymorphKeepMental",
	keepSaves: "NIH.PolymorphKeepSaves",
	keepSkills: "NIH.PolymorphKeepSkills",
	mergeSaves: "NIH.PolymorphMergeSaves",
	mergeSkills: "NIH.PolymorphMergeSkills",
	keepClass: "NIH.PolymorphKeepClass",
	keepFeats: "NIH.PolymorphKeepFeats",
	keepSpells: "NIH.PolymorphKeepSpells",
	keepItems: "NIH.PolymorphKeepItems",
	keepBio: "NIH.PolymorphKeepBio",
	keepVision: "NIH.PolymorphKeepVision",
	keepSelf: "NIH.PolymorphKeepSelf"
};
preLocalize("polymorphSettings", { sort: true });

/**
 * Settings to configure how actors are effects are merged when polymorphing is applied.
 * @enum {string}
 */
NIH.polymorphEffectSettings = {
	keepAE: "NIH.PolymorphKeepAE",
	keepOtherOriginAE: "NIH.PolymorphKeepOtherOriginAE",
	keepOriginAE: "NIH.PolymorphKeepOriginAE",
	keepEquipmentAE: "NIH.PolymorphKeepEquipmentAE",
	keepFeatAE: "NIH.PolymorphKeepFeatureAE",
	keepSpellAE: "NIH.PolymorphKeepSpellAE",
	keepClassAE: "NIH.PolymorphKeepClassAE",
	keepBackgroundAE: "NIH.PolymorphKeepBackgroundAE"
};
preLocalize("polymorphEffectSettings", { sort: true });

/**
 * Settings to configure how actors are merged when preset polymorphing is applied.
 * @enum {object}
 */
NIH.transformationPresets = {
	wildshape: {
		icon: '<i class="fas fa-paw"></i>',
		label: "NIH.PolymorphWildShape",
		options: {
			keepBio: true,
			keepClass: true,
			keepMental: true,
			mergeSaves: true,
			mergeSkills: true,
			keepEquipmentAE: false
		}
	},
	polymorph: {
		icon: '<i class="fas fa-pastafarianism"></i>',
		label: "NIH.Polymorph",
		options: {
			keepEquipmentAE: false,
			keepClassAE: false,
			keepFeatAE: false,
			keepBackgroundAE: false
		}
	},
	polymorphSelf: {
		icon: '<i class="fas fa-eye"></i>',
		label: "NIH.PolymorphSelf",
		options: {
			keepSelf: true
		}
	}
};
preLocalize("transformationPresets", { sort: true, keys: ["label"] });

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
	"attributes.ac.value", "attributes.init.bonus", "attributes.movement", "attributes.senses", "attributes.spelldc",
	"attributes.spellLevel", "details.cr", "details.spellLevel", "details.xp.value", "skills.*.passive",
	"abilities.*.value"
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
 * @enum {string}
 */
NIH.conditionTypes = {
	blinded: "NIH.ConBlinded",
	bloodied: "NIH.ConBloodied",
	broken: "NIH.ConBroken",
	charmed: "NIH.ConCharmed",
	deafened: "NIH.ConDeafened",
	diseased: "NIH.ConDiseased",
	exhaustion: "NIH.ConExhaustion",
	frightened: "NIH.ConFrightened",
	grappled: "NIH.ConGrappled",
	hidden: "NIH.ConHidden",
	incapacitated: "NIH.ConIncapacitated",
	invisible: "NIH.ConInvisible",
	paralyzed: "NIH.ConParalyzed",
	petrified: "NIH.ConPetrified",
	poisoned: "NIH.ConPoisoned",
	prone: "NIH.ConProne",
	restrained: "NIH.ConRestrained",
	shaken: "NIH.ConShaken",
	staggered: "NIH.ConStaggered",
	stunned: "NIH.ConStunned",
	surprised: "NIH.ConSurprised",
	unconscious: "NIH.ConUnconscious"
};
preLocalize("conditionTypes", { sort: true });

/**
 * Languages a character can learn.
 * @enum {string}
 */
NIH.languages = {
	common: "NIH.LanguagesCommon",
	abyssal: "NIH.LanguagesAbyssal",
	aquan: "NIH.LanguagesAquan",
	auran: "NIH.LanguagesAuran",
	celestial: "NIH.LanguagesCelestial",
	draconic: "NIH.LanguagesDraconic",
	dwarvish: "NIH.LanguagesDwarvish",
	elvish: "NIH.LanguagesYonwach",
	giant: "NIH.LanguagesGiant",
	goblin: "NIH.LanguagesGoblin",
	ignan: "NIH.LanguagesIgnan",
	infernal: "NIH.LanguagesInfernal",
	orc: "NIH.LanguagesOrc",
	primordial: "NIH.LanguagesPrimordial",
	sylvan: "NIH.LanguagesSylvan",
	terran: "NIH.LanguagesTerran",
	cant: "NIH.LanguagesThievesCant",
	woodElf: "NIH.LanguagesMetsae",
	tiborean: "NIH.LanguagesTiborean",
	jinzi: "NIH.LanguagesJinzi",
	iathNeidr: "NIH.LanguagesIathNeidr"
};
preLocalize("languages", { sort: true });

/**
 * Maximum allowed character level.
 * @type {number}
 */
NIH.maxLevel = 20;

/**
 * Maximum ability score value allowed by default.
 * @type {number}
 */
NIH.maxAbilityScore = 5;

/**
 * XP required to achieve each character level.
 * @type {number[]}
 */
NIH.CHARACTER_EXP_LEVELS = [
	0, 1, 3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 55, 59, 63, 67, 71
];

/**
 * @typedef {object} CharacterFlagConfig
 * @property {string} name
 * @property {string} hint
 * @property {string} section
 * @property {typeof boolean|string|number} type
 * @property {string} placeholder
 * @property {string[]} [abilities]
 * @property {Object<string, string>} [choices]
 * @property {string[]} [skills]
 */

/* -------------------------------------------- */

/**
 * Trait configuration information.
 *
 * @typedef {object} TraitConfiguration
 * @property {string} label               Localization key for the trait name.
 * @property {string} [actorKeyPath]      If the trait doesn't directly map to an entry as `traits.[key]`, where is
 *                                        this trait's data stored on the actor?
 * @property {string} [configKey]         If the list of trait options doesn't match the name of the trait, where can
 *                                        the options be found within `CONFIG.NIH`?
 * @property {string} [labelKey]          If config is an enum of objects, where can the label be found?
 * @property {object} [subtypes]          Configuration for traits that take some sort of base item.
 * @property {string} [subtypes.keyPath]  Path to subtype value on base items, should match a category key.
 * @property {string[]} [subtypes.ids]    Key for base item ID objects within `CONFIG.NIH`.
 * @property {object} [children]          Mapping of category key to an object defining its children.
 * @property {boolean} [sortCategories]   Whether top-level categories should be sorted.
 */

/**
 * Configurable traits on actors.
 * @enum {TraitConfiguration}
 */
NIH.traits = {
	saves: {
		label: "NIH.ClassSaves",
		configKey: "abilities",
		labelKey: "label"
	},
	skills: {
		label: "NIH.TraitSkillProf",
		labelKey: "label"
	},
	languages: {
		label: "NIH.Languages"
	},
	di: {
		label: "NIH.DamImm",
		configKey: "damageTypes"
	},
	dr: {
		label: "NIH.DamRes",
		configKey: "damageTypes"
	},
	dv: {
		label: "NIH.DamVuln",
		configKey: "damageTypes"
	},
	ci: {
		label: "NIH.ConImm",
		configKey: "conditionTypes"
	},
	weapon: {
		label: "NIH.TraitWeaponProf",
		actorKeyPath: "traits.weaponProf",
		configKey: "weaponProficiencies",
		subtypes: { keyPath: "weaponType", ids: ["weaponIds"] }
	},
	armor: {
		label: "NIH.TraitArmorProf",
		actorKeyPath: "traits.armorProf",
		configKey: "armorProficiencies",
		subtypes: { keyPath: "armor.type", ids: ["armorIds", "shieldIds"] }
	},
	tool: {
		label: "NIH.TraitToolProf",
		actorKeyPath: "tools",
		configKey: "toolProficiencies",
		subtypes: { keyPath: "toolType", ids: ["toolIds"] },
		children: { vehicle: "vehicleTypes" },
		sortCategories: true
	}
};
preLocalize("traits", { key: "label" });

/* -------------------------------------------- */

/**
 * Special character flags.
 * @enum {CharacterFlagConfig}
 */
NIH.characterFlags = {
	diamondSoul: {
		name: "NIH.FlagsDiamondSoul",
		hint: "NIH.FlagsDiamondSoulHint",
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
	initiativeAdv: {
		name: "NIH.FlagsInitiativeAdv",
		hint: "NIH.FlagsInitiativeAdvHint",
		section: "NIH.Feats",
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

/**
 * Flags allowed on actors. Any flags not in the list may be deleted during a migration.
 * @type {string[]}
 */
NIH.allowedActorFlags = ["isPolymorphed", "originalActor"].concat(Object.keys(NIH.characterFlags));

/* -------------------------------------------- */

/**
 * Advancement types that can be added to items.
 * @enum {*}
 */
NIH.advancementTypes = {
	AbilityScoreImprovement: advancement.AbilityScoreImprovementAdvancement,
	HitPoints: advancement.HitPointsAdvancement,
	ItemChoice: advancement.ItemChoiceAdvancement,
	ItemGrant: advancement.ItemGrantAdvancement,
	ScaleValue: advancement.ScaleValueAdvancement
};

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

	Object.values(NIH[key]).forEach(o => o.toString = toString);
}

/* -------------------------------------------- */

export default NIH;
