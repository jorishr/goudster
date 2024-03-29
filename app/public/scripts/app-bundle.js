/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/public/scripts/app/modules/animateClose.js":
/*!********************************************************!*\
  !*** ./app/public/scripts/app/modules/animateClose.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ animateClose)
/* harmony export */ });
// close with animation
function animateClose(target, baseClass) {
  target.classList.add("".concat(baseClass, "--closing"));
  target.addEventListener("animationend", function () {
    target.classList.remove("".concat(baseClass, "--active"));
    target.classList.remove("".concat(baseClass, "--closing"));
  }, {
    once: true
  });
}

/***/ }),

/***/ "./app/public/scripts/app/modules/checkbox.js":
/*!****************************************************!*\
  !*** ./app/public/scripts/app/modules/checkbox.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handleCheckbox)
/* harmony export */ });
function handleCheckbox() {
  var contactFormCheckbox = document.querySelector('.contact__form input[type="checkbox"]');
  var contactFormSubmitBtn = document.querySelector(".contact__form button");
  if (contactFormSubmitBtn) {
    contactFormSubmitBtn.disabled = true;
  }
  if (contactFormCheckbox) {
    contactFormCheckbox.addEventListener("click", function () {
      contactFormSubmitBtn.disabled = !contactFormCheckbox.checked;
    });
  }
}

/***/ }),

/***/ "./app/public/scripts/app/modules/consent.js":
/*!***************************************************!*\
  !*** ./app/public/scripts/app/modules/consent.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setupConsent)
/* harmony export */ });
function setupConsent() {
  var modal = document.querySelector(".modal");
  var cookieConsentBar = document.querySelector(".cookie-consent");
  var cookieConsentBtn = document.querySelector("#cookie-consent");
  var cookieStorage = localStorage.getItem("cookieConsent");
  if (cookieStorage) {
    cookieConsentBar.classList.remove("cookie-consent--show");
  }
  cookieConsentBtn.addEventListener("click", function (e) {
    cookieConsentBar.classList.remove("cookie-consent--show");
    localStorage.setItem("cookieConsent", true);
  });
  var ageConsentCookie = localStorage.getItem("ageConsent");
  var tmpAgeConsent = sessionStorage.getItem("tmpAgeConsent");
  if (ageConsentCookie || tmpAgeConsent) {
    modal.classList.remove("modal--show");
  }
}

/***/ }),

/***/ "./app/public/scripts/app/modules/flash.js":
/*!*************************************************!*\
  !*** ./app/public/scripts/app/modules/flash.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ removeFlashMsgFromDOM)
/* harmony export */ });
/* 
The flash message content is set by Express server code and only shown once per render. The styling makes the container fade-out but the element remained in the DOM, overlapping with the menu.   
*/

function removeFlashMsgFromDOM() {
  document.addEventListener("DOMContentLoaded", function () {
    var flashMsgContainer = document.querySelector(".flash");
    var flashMsgText = document.querySelector(".flash__msg");
    var hasText = flashMsgText.textContent;
    if (flashMsgContainer && hasText) {
      setTimeout(function () {
        flashMsgContainer.classList.add("flash--hide");
      }, 5000);
    }
  });
}

/***/ }),

/***/ "./app/public/scripts/app/modules/formSubmit.js":
/*!******************************************************!*\
  !*** ./app/public/scripts/app/modules/formSubmit.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formSubmitHandlers)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function formSubmitHandlers() {
  var btns = _toConsumableArray(document.querySelectorAll('button[type="submit"]'));
  if (btns.length > 0) {
    btns.forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        var form = event.target.closest("form");
        event.preventDefault(); //this also disables form attribute checks
        if (form.checkValidity()) {
          submitFormWithDebounce(form);
        } else {
          //alert the user with flash alert card
          var alert = document.querySelector(".flash--alert");
          var alertMsg = document.querySelector(".flash__msg--alert");
          alertMsg.textContent = "Onvolledige of ongeldige input. Probeer het opnieuw.";
          alert.classList.add("flash--alert--show");
          setTimeout(function () {
            alert.classList.remove("flash--alert--show");
          }, 5000);
        }
      });
    });
  }
}
function submitFormWithDebounce(form) {
  var debounceFn = debounce(function () {
    form.submit();
  }, 500);
  debounceFn();
}
function debounce(func, delay) {
  var timeoutId;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}

/***/ }),

/***/ "./app/public/scripts/app/modules/intersectionObserver.js":
/*!****************************************************************!*\
  !*** ./app/public/scripts/app/modules/intersectionObserver.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//fade-in with intersection observer API
var appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -50px 0px"
};

//the appearOnScroll function
var appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("timeline__item--reveal");
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);
function setFadeIn() {
  var faders = document.querySelectorAll(".fade-in");
  faders.forEach(function (fader) {
    appearOnScroll.observe(fader);
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setFadeIn);

/***/ }),

/***/ "./app/public/scripts/app/modules/layout.js":
/*!**************************************************!*\
  !*** ./app/public/scripts/app/modules/layout.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ layoutHelpers)
/* harmony export */ });
/* 
    This logo visually conflicts with the hero section logo 
    that has the same logo in it
*/
function hideHeaderLogoOnLanding() {
  if (document.body.classList.contains("landing")) {
    document.querySelector(".header__logo").classList.add("header__logo--hide");
  }
}
function hideScrollIconOnScroll() {
  var icon = document.querySelector(".scroll-down-icon");
  if (icon) {
    window.addEventListener("scroll", function () {
      icon.classList.remove("scroll-down-icon--active");
    }, {
      once: true
    });
  }
}

/* 
    Calculate the actual available screen height, minus the browser status and menu bars 
*/

function adjustHeroStyles() {
  if (document.body.classList.contains("landing")) {
    var innerHeight = window.innerHeight;
    var innerWidth = window.innerWidth;
    var ctaHeading = document.querySelector(".hero__cta__heading");
    var navBar = document.querySelector(".header__navbar");
    if (innerHeight < 640 && innerWidth < 768) {
      ctaHeading.classList.add("hero__cta__heading--hide");
      navBar.classList.add("header__navbar--js-small");
    } else {
      ctaHeading.classList.remove("hero__cta__heading--hide");
      navBar.classList.remove("header__navbar--js-small");
    }
  }
}
function setHeroSectionHeightVar() {
  var innerHeight = window.innerHeight;
  var menuHeight = document.querySelector("header").offsetHeight;
  document.documentElement.style.setProperty("--innerHeight", "".concat(innerHeight, "px"));
  document.documentElement.style.setProperty("--menuHeight", "".concat(menuHeight, "px"));
}
function layoutHelpers() {
  setHeroSectionHeightVar();
  adjustHeroStyles();
  hideScrollIconOnScroll();
  hideHeaderLogoOnLanding();
  var resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      setHeroSectionHeightVar();
      adjustHeroStyles();
    }, 300);
  });
}

/***/ }),

/***/ "./app/public/scripts/app/modules/nav.js":
/*!***********************************************!*\
  !*** ./app/public/scripts/app/modules/nav.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ togglePopupMenu)
/* harmony export */ });
/* harmony import */ var _animateClose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animateClose.js */ "./app/public/scripts/app/modules/animateClose.js");

function togglePopupMenu() {
  var toggle = document.querySelector("#toggle-menu-pop-up");
  var menuPopup = document.querySelector(".menu-pop-up");
  if (toggle && menuPopup) toggle.addEventListener("click", function () {
    if (menuPopup.classList.contains("menu-pop-up--active")) {
      (0,_animateClose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(menuPopup, "menu-pop-up");
    } else menuPopup.classList.add("menu-pop-up--active");
  });
}

/***/ }),

/***/ "./app/public/scripts/app/modules/setText.js":
/*!***************************************************!*\
  !*** ./app/public/scripts/app/modules/setText.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setText)
/* harmony export */ });
function setFooterCopyrightText() {
  var fullText = "Verenigde Brouwers &copy; 2014 &mdash; ".concat(new Date().getFullYear(), " Alle Rechten Voorbehouden");
  document.querySelector(".footer__copyright__text").innerHTML = fullText;
}
function setEmailLinks() {
  var emailLinks = document.querySelectorAll(".span-email");
  var linkHtmlText = '<a href="mailto:info@goudster.be" title="Mail naar de Verenigde Brouwers">info@goudster.be</a>';
  if (emailLinks.length > 0) {
    emailLinks.forEach(function (span) {
      span.innerHTML = linkHtmlText;
    });
  }
}
function setText() {
  setEmailLinks();
  setFooterCopyrightText();
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************************!*\
  !*** ./app/public/scripts/app/app.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_intersectionObserver_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/intersectionObserver.js */ "./app/public/scripts/app/modules/intersectionObserver.js");
/* harmony import */ var _modules_consent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/consent.js */ "./app/public/scripts/app/modules/consent.js");
/* harmony import */ var _modules_formSubmit_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/formSubmit.js */ "./app/public/scripts/app/modules/formSubmit.js");
/* harmony import */ var _modules_flash_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/flash.js */ "./app/public/scripts/app/modules/flash.js");
/* harmony import */ var _modules_layout_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/layout.js */ "./app/public/scripts/app/modules/layout.js");
/* harmony import */ var _modules_checkbox_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/checkbox.js */ "./app/public/scripts/app/modules/checkbox.js");
/* harmony import */ var _modules_setText_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/setText.js */ "./app/public/scripts/app/modules/setText.js");
/* harmony import */ var _modules_nav_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/nav.js */ "./app/public/scripts/app/modules/nav.js");








(0,_modules_layout_js__WEBPACK_IMPORTED_MODULE_4__["default"])();
(0,_modules_consent_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_modules_nav_js__WEBPACK_IMPORTED_MODULE_7__["default"])();
(0,_modules_formSubmit_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
(0,_modules_checkbox_js__WEBPACK_IMPORTED_MODULE_5__["default"])();
(0,_modules_flash_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
(0,_modules_setText_js__WEBPACK_IMPORTED_MODULE_6__["default"])();
(0,_modules_intersectionObserver_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=app-bundle.js.map