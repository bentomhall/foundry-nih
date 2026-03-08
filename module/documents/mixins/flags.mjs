/**
 * Mixin used to add system flags enforcement to types.
 * @template {foundry.abstract.Document} T
 * @param {typeof T} Base  The base document class to wrap.
 * @returns {typeof SystemFlags}
 * @mixin
 */
export default function SystemFlagsMixin(Base) {
  class SystemFlags extends Base {
    /**
     * Get the data model that represents system flags.
     * @type {typeof DataModel|null}
     * @abstract
     */
    get _systemFlagsDataModel() {
      return null;
    }

    /* -------------------------------------------- */

    /** @inheritDoc */
    prepareData() {
      super.prepareData();
      if ( ("nih" in this.flags) && this._systemFlagsDataModel ) {
        this.flags.nih = new this._systemFlagsDataModel(this._source.flags.nih, { parent: this });
      }
    }

    /* -------------------------------------------- */

    /** @inheritDoc */
    async setFlag(scope, key, value) {
      if ( (scope === "nih") && this._systemFlagsDataModel ) {
        let diff;
        const changes = foundry.utils.expandObject({ [key]: value });
        if ( this.flags.nih ) diff = this.flags.nih.updateSource(changes, { dryRun: true });
        else diff = new this._systemFlagsDataModel(changes, { parent: this }).toObject();
        return this.update({ flags: { nih: diff } });
      }
      return super.setFlag(scope, key, value);
    }
  }
  return SystemFlags;
}
