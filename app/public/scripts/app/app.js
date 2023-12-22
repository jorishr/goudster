import appearOnScroll from "./modules/intersectionObserver.js";
import setupConsent from "./modules/consent.js";
import formSubmitHandlers from "./modules/formSubmit.js";
import removeFlashMsgFromDOM from "./modules/flash.js";
import animateClose from "./modules/animateClose.js";

const faders = document.querySelectorAll(".fade-in"),
  spanEmails = document.querySelectorAll(".span-email");

//intersection observer api fade-in
faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

//adapt vh variable for mobile screen
//get the viewport height and multiply by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
//set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

//set email-address
spanEmails.forEach((span) => {
  span.innerHTML =
    '<a href="mailto:info@goudster.be" title="Mail naar de Verenigde Brouwers">info@goudster.be</a>';
});

function togglePopupMenu() {
  const toggle = document.querySelector("#toggle-menu-pop-up");
  const menuPopup = document.querySelector(".menu-pop-up");
  if (toggle && menuPopup)
    toggle.addEventListener("click", () => {
      if (menuPopup.classList.contains("menu-pop-up--active")) {
        animateClose(menuPopup, "menu-pop-up");
      } else menuPopup.classList.add("menu-pop-up--active");
    });
}

function hideScrollIconOnScroll() {
  const icon = document.querySelector(".scroll-down-icon");
  window.addEventListener(
    "scroll",
    () => {
      icon.classList.remove("scroll-down-icon--active");
    },
    { once: true }
  );
}

function hideHeaderLogoOnLanding() {
  if (document.body.classList.contains("landing")) {
    document.querySelector(".header__logo").classList.add("header__logo--hide");
  }
}

function checkInnerHeight() {
  if (document.body.classList.contains("landing")) {
    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;
    console.log(innerHeight < 640, innerWidth < 768);
    if (innerHeight < 640 && innerWidth < 768) {
      document.querySelector(".hero__cta__heading").remove();
      document
        .querySelector(".header__navbar")
        .classList.add("header__navbar--js-small");
    }
  }
}

function setHeroSectionHeight() {
  const innerHeight = window.innerHeight;
  const menuHeight = document.querySelector(".header").offsetHeight;
  document.documentElement.style.setProperty(
    "--innerHeight",
    `${innerHeight}px`
  );
  document.documentElement.style.setProperty("--menuHeight", `${menuHeight}px`);
}

setupConsent();
formSubmitHandlers();
removeFlashMsgFromDOM();
togglePopupMenu();
hideScrollIconOnScroll();
hideHeaderLogoOnLanding();
checkInnerHeight();
setHeroSectionHeight();
