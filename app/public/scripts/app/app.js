import appearOnScroll from "./modules/intersectionObserver.js";
import setupForms from "./modules/form.js";
import setupConsent from "./modules/consent.js";

const toggle = document.querySelector("#toggle"),
  extendMenu = document.querySelector(".menu__collapse"),
  pageBody = document.querySelector("body"),
  faders = document.querySelectorAll(".fade-in"),
  scrollArrow = document.querySelector(".scroll-icon"),
  spanEmails = document.querySelectorAll(".span-email");

//intersection observer api fade-in
faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

//header navbar functionality
toggle.addEventListener("click", function (e) {
  extendMenu.classList.toggle("visible");
});

//adapt vh variable for mobile screen
//get the viewport height and multiply by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
//set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

//scroll arrow: hide on scroll
if (pageBody.classList.contains("landing")) {
  window.addEventListener("scroll", () => {
    scrollArrow.style.display = "none";
  });
}

//set email-address
spanEmails.forEach((span) => {
  span.innerHTML =
    '<a href="mailto:info@goudster.be" title="Mail naar de Verenigde Brouwers">info@goudster.be</a>';
});

setupForms();
setupConsent();
