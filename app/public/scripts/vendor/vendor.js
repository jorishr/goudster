import initMap from "./maps.js";
import { snowAnimationStart } from "snowfall-js-plugin";

initMap();

document.addEventListener("DOMContentLoaded", function () {
  snowAnimationStart({
    logLevel: "info",
    snowfall: {
      count: 33,
      maxSpeed: 6,
      canvasHeightLimit: 1,
    },
    switches: {
      txt: "Sneeuw",
      styles: {
        bgClrOff: "#202020",
        bgClrOn: "#7a2800",
        toggleClr: "#ffffc0",
        txtClr: "#ffffc0",
        txtPosition: "1",
      },
    },
  });
});
