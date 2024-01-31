import initMap from "./maps.js";
import { snowAnimationStart } from "snowfall-js-plugin";
import { snowfallAnimationParams } from "./snowfall-js-plugin.js";

initMap();

document.addEventListener("DOMContentLoaded", function () {
  snowAnimationStart(snowfallAnimationParams);
});
