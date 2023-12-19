/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app/public/scripts/app/modules/intersectionObserver.js":
/*!****************************************************************!*\
  !*** ./app/public/scripts/app/modules/intersectionObserver.js ***!
  \****************************************************************/
/***/ ((module) => {

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
      entry.target.classList.add("reveal");
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);
module.exports = appearOnScroll;

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************************!*\
  !*** ./app/public/scripts/app/app.js ***!
  \***************************************/
var toggle = document.querySelector("#toggle"),
  extendMenu = document.querySelector(".menu__collapse"),
  modalClose = document.querySelector('.modal button[type="submit"]'),
  modal = document.querySelector(".modal"),
  cookieBar = document.querySelector(".privacy-bar"),
  cookieClosers = document.querySelectorAll(".privacy-bar a, .privacy-bar i"),
  pageBody = document.querySelector("body"),
  header = document.querySelector("header"),
  acceptBtn = document.querySelector("#cookie-consent"),
  checkbox = document.querySelector('input[type="checkbox"]'),
  inputFields = document.querySelectorAll("input[required], textarea"),
  contactSubmit = document.querySelector("form.contact button"),
  subscribeBtn = document.querySelector(".form__consent button"),
  faders = document.querySelectorAll(".fade-in"),
  appearOnScroll = __webpack_require__(/*! ./modules/intersectionObserver */ "./app/public/scripts/app/modules/intersectionObserver.js"),
  scrollArrow = document.querySelector(".scroll-icon"),
  spanEmails = document.querySelectorAll(".span-email");

//intersection observer api fade-in
faders.forEach(function (fader) {
  appearOnScroll.observe(fader);
});

//header navbar functionality
toggle.addEventListener("click", function (e) {
  extendMenu.classList.toggle("visible");
});

//adapt vh variable for mobile screen
//get the viewport height and multiply by 1% to get a value for a vh unit
var vh = window.innerHeight * 0.01;
//set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));

//landing page functionality
if (pageBody.classList.contains("landing")) {
  header.classList.add("landing");
  var cookieStorage = localStorage.getItem("cookieConsent");
  if (cookieStorage) {
    cookieBar.classList.add("hide");
  }
  var ageStorage = localStorage.getItem("ageConsent");
  var tmpAgeConsent = sessionStorage.getItem("tmpAgeConsent");
  if (ageStorage || tmpAgeConsent) {
    modal.classList.add("hide");
  }

  //close cookiebar functionality
  var closeBtns = Array.from(cookieClosers);
  closeBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      cookieBar.classList.remove("in-view");
    });
  });
  acceptBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", true);
  });

  //modal functionality
  modalClose.addEventListener("click", function (e) {
    modal.classList.remove("in-view");
    sessionStorage.setItem("tmpAgeConsent", true);
    if (checkbox.checked) {
      localStorage.setItem("ageConsent", true);
    }
  });
}

//form functionality
if (inputFields.length !== 0) {
  if (pageBody.classList.contains("landing") || pageBody.classList.contains("hasCaptureEmail")) {
    subscribeBtn.disabled = true;
  }
  if (pageBody.classList.contains("contact")) {
    contactSubmit.disabled = true;
  }
  for (var i = 0; i < inputFields.length; i++) {
    inputFields[i].addEventListener("input", function () {
      var values = [];
      var checked = checkbox.checked;
      inputFields.forEach(function (field) {
        return values.push(field.value);
      });
      if (pageBody.classList.contains("landing") || pageBody.classList.contains("hasCaptureEmail")) {
        //there is more than one checkbox on this page
        checked = document.querySelector('input[type="checkbox"].subscribe').checked;
        subscribeBtn.disabled = values.includes("") || !checked;
      }
      if (pageBody.classList.contains("contact")) {
        contactSubmit.disabled = values.includes("") || !checked;
      }
    });
  }
}

//scroll arrow: hide on scroll
if (pageBody.classList.contains("landing")) {
  window.addEventListener("scroll", function () {
    scrollArrow.style.display = "none";
  });
}

//email-address
spanEmails.forEach(function (span) {
  span.innerHTML = '<a href="mailto:info@goudster.be" title="Mail naar de Verenigde Brouwers">info@goudster.be</a>';
});
})();

/******/ })()
;
//# sourceMappingURL=app-bundle.js.map