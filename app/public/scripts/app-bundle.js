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
  var modalClose = document.querySelector('.modal__form button[type="submit"]'),
    modal = document.querySelector(".modal"),
    cookieConsentBar = document.querySelector(".cookie-consent"),
    cookieConsentBtn = document.querySelector("#cookie-consent"),
    pageBody = document.querySelector("body"),
    header = document.querySelector("header"),
    checkbox = document.querySelector('input[type="checkbox"]');

  //landing page functionality
  if (pageBody.classList.contains("landing")) {
    header.classList.add("landing");
    var cookieStorage = localStorage.getItem("cookieConsent");
    if (cookieStorage) {
      cookieConsentBar.classList.add("cookie-consent--hide");
      cookieConsentBar.classList.remove("cookie-consent--show");
    }
    cookieConsentBtn.addEventListener("click", function (e) {
      cookieConsentBar.classList.remove("cookie-consent--show");
      cookieConsentBar.classList.add("cookie-consent--hide");
      localStorage.setItem("cookieConsent", true);
    });
    var ageStorage = localStorage.getItem("ageConsent");
    var tmpAgeConsent = sessionStorage.getItem("tmpAgeConsent");
    if (ageStorage || tmpAgeConsent) {
      modal.classList.remove("modal--show");
    }

    //modal functionality
    /*     modalClose.addEventListener("click", function (e) {
      modal.classList.remove("modal--show");
      sessionStorage.setItem("tmpAgeConsent", true);
      if (checkbox.checked) {
        localStorage.setItem("ageConsent", true);
      }
    }); */
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
      entry.target.classList.add("link-section__link--reveal");
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (appearOnScroll);

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
/* harmony import */ var _modules_animateClose_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/animateClose.js */ "./app/public/scripts/app/modules/animateClose.js");





var faders = document.querySelectorAll(".fade-in"),
  spanEmails = document.querySelectorAll(".span-email");

//intersection observer api fade-in
faders.forEach(function (fader) {
  _modules_intersectionObserver_js__WEBPACK_IMPORTED_MODULE_0__["default"].observe(fader);
});

//adapt vh variable for mobile screen
//get the viewport height and multiply by 1% to get a value for a vh unit
var vh = window.innerHeight * 0.01;
//set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));

//set email-address
spanEmails.forEach(function (span) {
  span.innerHTML = '<a href="mailto:info@goudster.be" title="Mail naar de Verenigde Brouwers">info@goudster.be</a>';
});
function togglePopupMenu() {
  var toggle = document.querySelector("#toggle-menu-pop-up");
  var menuPopup = document.querySelector(".menu-pop-up");
  if (toggle && menuPopup) toggle.addEventListener("click", function () {
    if (menuPopup.classList.contains("menu-pop-up--active")) {
      (0,_modules_animateClose_js__WEBPACK_IMPORTED_MODULE_4__["default"])(menuPopup, "menu-pop-up");
    } else menuPopup.classList.add("menu-pop-up--active");
  });
}
function hideScrollIconOnScroll() {
  var icon = document.querySelector(".scroll-down-icon");
  window.addEventListener("scroll", function () {
    icon.classList.remove("scroll-down-icon--active");
  }, {
    once: true
  });
}
(0,_modules_consent_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_modules_formSubmit_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
(0,_modules_flash_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
togglePopupMenu();
hideScrollIconOnScroll();
})();

/******/ })()
;
//# sourceMappingURL=app-bundle.js.map