import _ActorDataModel from "./abstract/actor-data-model.mjs";
import _ItemDataModel from "./abstract/item-data-model.mjs";
import _SparseDataModel from "./abstract/sparse-data-model.mjs";
import _SystemDataModel from "./abstract/system-data-model.mjs";

export default class SystemDataModel extends _SystemDataModel {
  constructor(...args) {
    foundry.utils.logCompatibilityWarning(
      "`nih.dataModels.SystemDataModel has been moved to `nih.dataModels.abstract.SystemDataModel",
      { since: "Nih 5.1", until: "Nih 6.0", once: true }
    );
    super(...args);
  }
}

export class ActorDataModel extends _ActorDataModel {
  constructor(...args) {
    foundry.utils.logCompatibilityWarning(
      "`nih.dataModels.ActorDataModel has been moved to `nih.dataModels.abstract.ActorDataModel",
      { since: "Nih 5.1", until: "Nih 6.0", once: true }
    );
    super(...args);
  }
}

export class ItemDataModel extends _ItemDataModel {
  constructor(...args) {
    foundry.utils.logCompatibilityWarning(
      "`nih.dataModels.ItemDataModel has been moved to `nih.dataModels.abstract.ItemDataModel",
      { since: "Nih 5.1", until: "Nih 6.0", once: true }
    );
    super(...args);
  }
}

export class SparseDataModel extends _SparseDataModel {
  constructor(...args) {
    foundry.utils.logCompatibilityWarning(
      "`nih.dataModels.SparseDataModel has been moved to `nih.dataModels.abstract.SparseDataModel",
      { since: "Nih 5.1", until: "Nih 6.0", once: true }
    );
    super(...args);
  }
}
