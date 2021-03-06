/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/public/scripts/app/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/public/scripts/app/app.js":
/*!***************************************!*\
  !*** ./app/public/scripts/app/app.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toggle = document.querySelector('#toggle'),\n    extendMenu = document.querySelector('.menu__collapse'),\n    modalClose = document.querySelector('.modal button[type=\"submit\"]'),\n    modal = document.querySelector('.modal'),\n    cookieBar = document.querySelector('.privacy-bar'),\n    cookieClosers = document.querySelectorAll('.privacy-bar a, .privacy-bar i'),\n    pageBody = document.querySelector('body'),\n    header = document.querySelector('header'),\n    acceptBtn = document.querySelector('#cookie-consent'),\n    checkbox = document.querySelector('input[type=\"checkbox\"]'),\n    inputFields = document.querySelectorAll('input[required], textarea'),\n    contactSubmit = document.querySelector('form.contact button'),\n    subscribeBtn = document.querySelector('.form__consent button'),\n    faders = document.querySelectorAll('.fade-in'),\n    appearOnScroll = __webpack_require__(/*! ./modules/intersectionObserver */ \"./app/public/scripts/app/modules/intersectionObserver.js\"),\n    scrollArrow = document.querySelector('.scroll-icon'),\n    spanEmails = document.querySelectorAll('.span-email'); //intersection observer api fade-in\n\n\nfaders.forEach(function (fader) {\n  appearOnScroll.observe(fader);\n}); //header navbar functionality        \n\ntoggle.addEventListener('click', function (e) {\n  extendMenu.classList.toggle('visible');\n}); //adapt vh variable for mobile screen\n//get the viewport height and multiply by 1% to get a value for a vh unit\n\nvar vh = window.innerHeight * 0.01; //set the value in the --vh custom property to the root of the document\n\ndocument.documentElement.style.setProperty('--vh', \"\".concat(vh, \"px\")); //landing page functionality\n\nif (pageBody.classList.contains('landing')) {\n  header.classList.add('landing');\n  var cookieStorage = localStorage.getItem('cookieConsent');\n\n  if (cookieStorage) {\n    cookieBar.classList.add('hide');\n  }\n\n  ;\n  var ageStorage = localStorage.getItem('ageConsent');\n  var tmpAgeConsent = sessionStorage.getItem('tmpAgeConsent');\n\n  if (ageStorage || tmpAgeConsent) {\n    modal.classList.add('hide');\n  }\n\n  ; //close cookiebar functionality\n\n  var closeBtns = Array.from(cookieClosers);\n  closeBtns.forEach(function (btn) {\n    btn.addEventListener('click', function (e) {\n      cookieBar.classList.remove('in-view');\n    });\n  });\n  acceptBtn.addEventListener('click', function () {\n    localStorage.setItem('cookieConsent', true);\n  }); //modal functionality\n\n  modalClose.addEventListener('click', function (e) {\n    modal.classList.remove('in-view');\n    sessionStorage.setItem('tmpAgeConsent', true);\n\n    if (checkbox.checked) {\n      localStorage.setItem('ageConsent', true);\n    }\n  });\n} //form functionality\n\n\nif (inputFields.length !== 0) {\n  if (pageBody.classList.contains('landing') || pageBody.classList.contains('hasCaptureEmail')) {\n    subscribeBtn.disabled = true;\n  }\n\n  if (pageBody.classList.contains('contact')) {\n    contactSubmit.disabled = true;\n  }\n\n  for (var i = 0; i < inputFields.length; i++) {\n    inputFields[i].addEventListener('input', function () {\n      var values = [];\n      var checked = checkbox.checked;\n      inputFields.forEach(function (field) {\n        return values.push(field.value);\n      });\n\n      if (pageBody.classList.contains('landing') || pageBody.classList.contains('hasCaptureEmail')) {\n        //there is more than one checkbox on this page\n        checked = document.querySelector('input[type=\"checkbox\"].subscribe').checked;\n        subscribeBtn.disabled = values.includes('') || !checked;\n      }\n\n      if (pageBody.classList.contains('contact')) {\n        contactSubmit.disabled = values.includes('') || !checked;\n      }\n    });\n  }\n\n  ;\n}\n\n; //scroll arrow: hide on scroll\n\nif (pageBody.classList.contains('landing')) {\n  window.addEventListener('scroll', function () {\n    scrollArrow.style.display = 'none';\n  });\n}\n\n; //email-address\n\nspanEmails.forEach(function (span) {\n  span.innerHTML = '<a href=\"mailto:info@goudster.be\" title=\"Mail naar de Verenigde Brouwers\">info@goudster.be</a>';\n});\n\n//# sourceURL=webpack:///./app/public/scripts/app/app.js?");

/***/ }),

/***/ "./app/public/scripts/app/modules/intersectionObserver.js":
/*!****************************************************************!*\
  !*** ./app/public/scripts/app/modules/intersectionObserver.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//fade-in with intersection observer API\nvar appearOptions = {\n  threshold: 0,\n  rootMargin: '0px 0px -50px 0px'\n}; //the appearOnScroll function \n\nvar appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {\n  entries.forEach(function (entry) {\n    if (!entry.isIntersecting) {\n      return;\n    } else {\n      entry.target.classList.add('reveal');\n      appearOnScroll.unobserve(entry.target);\n    }\n  });\n}, appearOptions);\nmodule.exports = appearOnScroll;\n\n//# sourceURL=webpack:///./app/public/scripts/app/modules/intersectionObserver.js?");

/***/ })

/******/ });