import SaveSheet from "../../applications/activity/save-sheet.mjs";
import BaseSaveActivityData from "../../data/activity/save-data.mjs";
import { getSceneTargets } from "../../utils.mjs";
import ActivityMixin from "./mixin.mjs";

/**
 * Activity for making saving throws and rolling damage.
 */
export default class SaveActivity extends ActivityMixin(BaseSaveActivityData) {
  /* -------------------------------------------- */
  /*  Model Configuration                         */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static LOCALIZATION_PREFIXES = [...super.LOCALIZATION_PREFIXES, "NIH.SAVE"];

  /* -------------------------------------------- */

  /** @inheritDoc */
  static metadata = Object.freeze(
    foundry.utils.mergeObject(super.metadata, {
      type: "save",
      img: "systems/nih/icons/svg/activity/save.svg",
      title: "NIH.SAVE.Title.one",
      hint: "NIH.SAVE.Hint",
      sheetClass: SaveSheet,
      usage: {
        actions: {
          rollDamage: SaveActivity.#rollDamage,
          rollSave: SaveActivity.#rollSave
        }
      }
    }, { inplace: false })
  );

  /* -------------------------------------------- */
  /*  Activation                                  */
  /* -------------------------------------------- */

  /** @override */
  _usageChatButtons(message) {
    const buttons = [];
    const dc = this.save.dc.value;

    for ( const abilityId of this.save.ability ) {
      const ability = CONFIG.NIH.abilities[abilityId]?.label ?? "";
      buttons.push({
        label: `
          <span class="visible-dc">${game.i18n.format("NIH.SavingThrowDC", { dc, ability })}</span>
          <span class="hidden-dc">${game.i18n.format("NIH.SavePromptTitle", { ability })}</span>
        `,
        icon: '<i class="fa-solid fa-shield-heart" inert></i>',
        dataset: {
          dc,
          ability: abilityId,
          action: "rollSave",
          visibility: "all"
        }
      });
    }

    if ( this.damage.parts.length ) buttons.push({
      label: game.i18n.localize("NIH.Damage"),
      icon: '<i class="fas fa-burst" inert></i>',
      dataset: {
        action: "rollDamage"
      }
    });
    return buttons.concat(super._usageChatButtons(message));
  }

  /* -------------------------------------------- */
  /*  Rolling                                     */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async rollDamage(config={}, dialog={}, message={}) {
    message = foundry.utils.mergeObject({
      "data.flags.nih.roll": {
        damageOnSave: this.damage.onSave
      }
    }, message);
    return super.rollDamage(config, dialog, message);
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle performing a damage roll.
   * @this {SaveActivity}
   * @param {PointerEvent} event     Triggering click event.
   * @param {HTMLElement} target     The capturing HTML element which defined a [data-action].
   * @param {ChatMessage5e} message  Message associated with the activation.
   */
  static #rollDamage(event, target, message) {
    this.rollDamage({ event });
  }

  /* -------------------------------------------- */

  /**
   * Handle performing a saving throw.
   * @this {SaveActivity}
   * @param {PointerEvent} event     Triggering click event.
   * @param {HTMLElement} target     The capturing HTML element which defined a [data-action].
   * @param {ChatMessage5e} message  Message associated with the activation.
   */
  static async #rollSave(event, target, message) {
    const targets = getSceneTargets();
    if ( !targets.length && game.user.character ) targets.push(game.user.character);
    if ( !targets.length ) ui.notifications.warn("NIH.ActionWarningNoToken", { localize: true });
    const dc = parseInt(target.dataset.dc);
    for ( const token of targets ) {
      const actor = token instanceof Actor ? token : token.actor;
      const speaker = ChatMessage.getSpeaker({ actor, scene: canvas.scene, token: token.document });
      await actor.rollSavingThrow({
        event,
        ability: target.dataset.ability ?? this.save.ability.first(),
        target: Number.isFinite(dc) ? dc : this.save.dc.value
      }, {}, { data: { speaker } });
    }
  }

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /** @inheritDoc */
  async getFavoriteData() {
    return foundry.utils.mergeObject(await super.getFavoriteData(), { save: this.save });
  }
}
