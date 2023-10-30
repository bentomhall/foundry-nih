/**
 * The nih game system for Foundry Virtual Tabletop
 * A system for playing the fifth edition of the world's most popular role-playing game.
 * Author: Atropos
 * Software License: MIT
 * Content License: https://www.dndbeyond.com/attachments/39j2li89/SRD5.1-CCBY4.0License.pdf
 * Repository: https://github.com/bentomhall/foundry-nih
 * Issue Tracker: https://github.com/bentomhall/foundry-nih/issues
 */

// Import Configuration
import NIH from "./module/config.mjs";
import registerSystemSettings from "./module/settings.mjs";

// Import Submodules
import * as applications from "./module/applications/_module.mjs";
import * as canvas from "./module/canvas/_module.mjs";
import * as dataModels from "./module/data/_module.mjs";
import * as dice from "./module/dice/_module.mjs";
import * as documents from "./module/documents/_module.mjs";
import * as migrations from "./module/migration.mjs";
import * as utils from "./module/utils.mjs";
import {ModuleArt} from "./module/module-art.mjs";

/* -------------------------------------------- */
/*  Define Module Structure                     */
/* -------------------------------------------- */

globalThis.nih = {
	applications,
	canvas,
	config: NIH,
	dataModels,
	dice,
	documents,
	migrations,
	utils
};

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", function() {
	globalThis.nih = game.nih = Object.assign(game.system, globalThis.nih);
	console.log(`Nih | Initializing the Nih Game System - Version ${nih.version}\n${NIH.ASCII}`);

	// Record Configuration Values
	CONFIG.NIH = NIH;
	CONFIG.ActiveEffect.documentClass = documents.ActiveEffect5e;
	CONFIG.Actor.documentClass = documents.ActorNIH;
	CONFIG.Item.documentClass = documents.Item5e;
	CONFIG.Token.documentClass = documents.TokenDocument5e;
	CONFIG.Token.objectClass = canvas.Token5e;
	CONFIG.time.roundTime = 6;
	CONFIG.Dice.DamageRoll = dice.DamageRoll;
	CONFIG.Dice.D20Roll = dice.D20Roll;
	CONFIG.MeasuredTemplate.defaults.angle = 53.13; // 5e cone RAW should be 53.13 degrees
	CONFIG.ui.combat = applications.combat.CombatTracker5e;
	CONFIG.compatibility.excludePatterns.push(/\bActiveEffect5e#label\b/); // Backwards compatibility with v10
	game.nih.isV10 = false;

	// Register System Settings
	registerSystemSettings();

	// Validation strictness.
	if ( game.nih.isV10 ) _determineValidationStrictness();

	// Configure module art.
	game.nih.moduleArt = new ModuleArt();

	// Configure trackable & consumable attributes.
	_configureTrackableAttributes();
	_configureConsumableAttributes();

	// Patch Core Functions
	Combatant.prototype.getInitiativeRoll = documents.combat.getInitiativeRoll;

	// Register Roll Extensions
	CONFIG.Dice.rolls.push(dice.D20Roll);
	CONFIG.Dice.rolls.push(dice.DamageRoll);

	// Hook up system data types
	const modelType = game.nih.isV10 ? "systemDataModels" : "dataModels";
	CONFIG.Actor[modelType] = dataModels.actor.config;
	CONFIG.Item[modelType] = dataModels.item.config;
	CONFIG.JournalEntryPage[modelType] = dataModels.journal.config;

	// Register sheet application classes
	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("nih", applications.actor.ActorSheet5eCharacter, {
		types: ["character"],
		makeDefault: true,
		label: "NIH.SheetClassCharacter"
	});
	Actors.registerSheet("nih", applications.actor.ActorSheet5eNPC, {
		types: ["npc"],
		makeDefault: true,
		label: "NIH.SheetClassNPC"
	});
	Actors.registerSheet("nih", applications.actor.ActorSheet5eVehicle, {
		types: ["vehicle"],
		makeDefault: true,
		label: "NIH.SheetClassVehicle"
	});
	Actors.registerSheet("nih", applications.actor.GroupActorSheet, {
		types: ["group"],
		makeDefault: true,
		label: "NIH.SheetClassGroup"
	});

	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet("nih", applications.item.ItemSheet5e, {
		makeDefault: true,
		label: "NIH.SheetClassItem"
	});
	DocumentSheetConfig.registerSheet(JournalEntryPage, "nih", applications.journal.JournalClassPageSheet, {
		label: "NIH.SheetClassClassSummary",
		types: ["class"]
	});

	// Preload Handlebars helpers & partials
	utils.registerHandlebarsHelpers();
	utils.preloadHandlebarsTemplates();
});

/**
 * Determine if this is a 'legacy' world with permissive validation, or one where strict validation is enabled.
 * @internal
 */
function _determineValidationStrictness() {
	dataModels.SystemDataModel._enableV10Validation = game.settings.get("nih", "strictValidation");
}

/**
 * Update the world's validation strictness setting based on whether validation errors were encountered.
 * @internal
 */
async function _configureValidationStrictness() {
	if ( !game.user.isGM ) return;
	const invalidDocuments = game.actors.invalidDocumentIds.size + game.items.invalidDocumentIds.size
		+ game.scenes.invalidDocumentIds.size;
	const strictValidation = game.settings.get("nih", "strictValidation");
	if ( invalidDocuments && strictValidation ) {
		await game.settings.set("nih", "strictValidation", false);
		game.socket.emit("reload");
		foundry.utils.debouncedReload();
	}
}

/**
 * Configure explicit lists of attributes that are trackable on the token HUD and in the combat tracker.
 * @internal
 */
function _configureTrackableAttributes() {
	const common = {
		bar: [],
		value: [
			...Object.keys(NIH.abilities).map(ability => `abilities.${ability}.value`),
			...Object.keys(NIH.movementTypes).map(movement => `attributes.movement.${movement}`),
			"attributes.ac.value", "attributes.init.total"
		]
	};

	const creature = {
		bar: [...common.bar, "attributes.hp", "spells.pact"],
		value: [
			...common.value,
			...Object.keys(NIH.skills).map(skill => `skills.${skill}.passive`),
			...Object.keys(NIH.senses).map(sense => `attributes.senses.${sense}`),
			"attributes.spelldc"
		]
	};

	CONFIG.Actor.trackableAttributes = {
		character: {
			bar: [...creature.bar, "resources.stamina", "resources.aether", "resources.tertiary", "details.xp"],
			value: [...creature.value]
		},
		npc: {
			bar: [...creature.bar, "resources.legact", "resources.legres"],
			value: [...creature.value, "details.cr", "details.spellLevel", "details.xp.value"]
		},
		vehicle: {
			bar: [...common.bar, "attributes.hp"],
			value: [...common.value]
		},
		group: {
			bar: [],
			value: []
		}
	};
}

/**
 * Configure which attributes are available for item consumption.
 * @internal
 */
function _configureConsumableAttributes() {
	CONFIG.NIH.consumableResources = [
		...Object.keys(NIH.abilities).map(ability => `abilities.${ability}.value`),
		"attributes.ac.flat",
		"attributes.hp.value",
		...Object.keys(NIH.senses).map(sense => `attributes.senses.${sense}`),
		...Object.keys(NIH.movementTypes).map(type => `attributes.movement.${type}`),
		...Object.keys(NIH.currencies).map(denom => `currency.${denom}`),
		"details.xp.value",
		"resources.stamina.value", "resources.aether.value", "resources.tertiary.value",
		"resources.legact.value", "resources.legres.value",
	];
}

/* -------------------------------------------- */
/*  Foundry VTT Setup                           */
/* -------------------------------------------- */

/**
 * Prepare attribute lists.
 */
Hooks.once("setup", function() {
	CONFIG.NIH.trackableAttributes = expandAttributeList(CONFIG.NIH.trackableAttributes);
	game.nih.moduleArt.registerModuleArt();

	// Apply custom compendium styles to the SRD rules compendium.
	if ( !game.nih.isV10 ) {
		const rules = game.packs.get("nih.rules");
		rules.applicationClass = applications.journal.SRDCompendium;
	}
});

/* --------------------------------------------- */

/**
 * Expand a list of attribute paths into an object that can be traversed.
 * @param {string[]} attributes  The initial attributes configuration.
 * @returns {object}  The expanded object structure.
 */
function expandAttributeList(attributes) {
	return attributes.reduce((obj, attr) => {
		foundry.utils.setProperty(obj, attr, true);
		return obj;
	}, {});
}

/* --------------------------------------------- */

/**
 * Perform one-time pre-localization and sorting of some configuration objects
 */
Hooks.once("i18nInit", () => utils.performPreLocalization(CONFIG.NIH));

/* -------------------------------------------- */
/*  Foundry VTT Ready                           */
/* -------------------------------------------- */

/**
 * Once the entire VTT framework is initialized, check to see if we should perform a data migration
 */
Hooks.once("ready", function() {
	if ( game.nih.isV10 ) {
		// Configure validation strictness.
		_configureValidationStrictness();

		// Apply custom compendium styles to the SRD rules compendium.
		const rules = game.packs.get("nih.rules");
		rules.apps = [new applications.journal.SRDCompendium(rules)];
	}

	// Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
	Hooks.on("hotbarDrop", (bar, data, slot) => {
		if ( ["Item", "ActiveEffect"].includes(data.type) ) {
			documents.macro.create5eMacro(data, slot);
			return false;
		}
	});

	// Determine whether a system migration is required and feasible
	if ( !game.user.isGM ) return;
	const cv = game.settings.get("nih", "systemMigrationVersion") || game.world.flags.nih?.version;
	const totalDocuments = game.actors.size + game.scenes.size + game.items.size;
	if ( !cv && totalDocuments === 0 ) return game.settings.set("nih", "systemMigrationVersion", game.system.version);
	if ( cv && !isNewerVersion(game.system.flags.needsMigrationVersion, cv) ) return;

	// Perform the migration
	if ( cv && isNewerVersion(game.system.flags.compatibleMigrationVersion, cv) ) {
		ui.notifications.error(game.i18n.localize("MIGRATION.5eVersionTooOldWarning"), {permanent: true});
	}
	migrations.migrateWorld();
});

/* -------------------------------------------- */
/*  Canvas Initialization                       */
/* -------------------------------------------- */

Hooks.on("canvasInit", gameCanvas => {
	gameCanvas.grid.diagonalRule = game.settings.get("nih", "diagonalMovement");
	SquareGrid.prototype.measureDistances = canvas.measureDistances;
});

/* -------------------------------------------- */
/*  Other Hooks                                 */
/* -------------------------------------------- */

Hooks.on("renderChatMessage", documents.chat.onRenderChatMessage);
Hooks.on("getChatLogEntryContext", documents.chat.addChatMessageContextOptions);

Hooks.on("renderChatLog", (app, html, data) => documents.Item5e.chatListeners(html));
Hooks.on("renderChatPopout", (app, html, data) => documents.Item5e.chatListeners(html));
Hooks.on("getActorDirectoryEntryContext", documents.ActorNIH.addDirectoryContextOptions);

/* -------------------------------------------- */
/*  Bundled Module Exports                      */
/* -------------------------------------------- */

export {
	applications,
	canvas,
	dataModels,
	dice,
	documents,
	migrations,
	utils,
	NIH
};
