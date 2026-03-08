import JournalSpellListPageSheet from "../../applications/journal/spells-page-sheet.mjs";
import { formatIdentifier } from "../../utils.mjs";
import IdentifierField from "../fields/identifier-field.mjs";
import SourceField from "../shared/source-field.mjs";

const { ArrayField, DocumentIdField, HTMLField, NumberField, SchemaField, SetField, StringField } = foundry.data.fields;

/**
 * @import { SpellsJournalPageSystemData } from "./_types.mjs";
 */

/**
 * Data model for spell list data.
 * @extends {foundry.abstract.TypeDataModel<SpellsJournalPageSystemData>}
 * @mixes SpellsJournalPageSystemData
 */
export default class SpellListJournalPageData extends foundry.abstract.TypeDataModel {
  /** @override */
  static defineSchema() {
    return {
      type: new StringField({
        initial: "class", label: "JOURNALENTRYPAGE.NIH.SpellList.Type.Label"
      }),
      identifier: new IdentifierField({ label: "NIH.Identifier" }),
      grouping: new StringField({
        initial: "level", choices: this.GROUPING_MODES,
        label: "JOURNALENTRYPAGE.NIH.SpellList.Grouping.Label",
        hint: "JOURNALENTRYPAGE.NIH.SpellList.Grouping.Hint"
      }),
      description: new SchemaField({
        value: new HTMLField({ textSearch: true, label: "NIH.Description" })
      }),
      spells: new SetField(new StringField(), { label: "NIH.ItemTypeSpellPl" }),
      unlinkedSpells: new ArrayField(new SchemaField({
        _id: new DocumentIdField({ initial: () => foundry.utils.randomID() }),
        identifier: new IdentifierField({ label: "NIH.Identifier" }),
        name: new StringField({ required: true, label: "Name" }),
        system: new SchemaField({
          level: new NumberField({ min: 0, integer: true, label: "NIH.Level" }),
          school: new StringField({ label: "NIH.School" })
        }),
        source: new SourceField({license: false, revision: false, rules: false, uuid: new StringField()})
      }), { label: "JOURNALENTRYPAGE.NIH.SpellList.UnlinkedSpells.Label" })
    };
  }

  /* -------------------------------------------- */

  /**
   * Different ways in which spells can be grouped on the sheet.
   * @enum {string}
   */
  static GROUPING_MODES = {
    none: "JOURNALENTRYPAGE.NIH.SpellList.Grouping.None",
    alphabetical: "JOURNALENTRYPAGE.NIH.SpellList.Grouping.Alphabetical",
    level: "JOURNALENTRYPAGE.NIH.SpellList.Grouping.Level",
    school: "JOURNALENTRYPAGE.NIH.SpellList.Grouping.School"
  };

  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareDerivedData() {
    this.unlinkedSpells.forEach(s => {
      s.identifier ||= formatIdentifier(s.name);
      SourceField.prepareData.call(s.source, s.source?.uuid);
    });
  }

  /* -------------------------------------------- */

  /** @override */
  async toEmbed(config, options={}) {
    for ( const value of config.values ) {
      if ( value === "table" ) config.table = true;
      else if ( value in this.constructor.GROUPING_MODES ) config.grouping = value;
    }
    if ( config.table ) config.grouping ??= "level";

    const sheet = new JournalSpellListPageSheet({
      displayAsTable: config.table,
      document: this.parent,
      embedRendering: true,
      grouping: config.grouping,
      mode: "view",
      window: { frame: false, positioned: false }
    });
    await sheet.render({ force: true });
    config.classes = config.classes ? `spells ${config.classes ?? ""}` : "spells";
    return sheet.element.children;
  }
}
