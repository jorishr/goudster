import setFadeIn from "./modules/intersectionObserver.js";
import setupConsent from "./modules/consent.js";
import formSubmitHandlers from "./modules/formSubmit.js";
import removeFlashMsgFromDOM from "./modules/flash.js";
import layoutHelpers from "./modules/layout.js";
import handleCheckbox from "./modules/checkbox.js";
import setText from "./modules/setText.js";
import togglePopupMenu from "./modules/nav.js";

layoutHelpers();
setupConsent();
togglePopupMenu();

formSubmitHandlers();
handleCheckbox();

removeFlashMsgFromDOM();
setText();
setFadeIn();
