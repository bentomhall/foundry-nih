import {default as DifficultTerrainRegionBehaviorType} from "./difficult-terrain.mjs";
import {default as RotateAreaRegionBehaviorType} from "./rotate-area.mjs";

export {
  DifficultTerrainRegionBehaviorType,
  RotateAreaRegionBehaviorType
};

export const config = {
  "nih.difficultTerrain": DifficultTerrainRegionBehaviorType,
  "nih.rotateArea": RotateAreaRegionBehaviorType
};

export const icons = {
  "nih.difficultTerrain": "fa-solid fa-hill-rockslide",
  "nih.rotateArea": "fa-solid fa-arrows-spin"
};
