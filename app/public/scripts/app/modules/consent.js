export default function setupConsent() {
  const modalClose = document.querySelector('.modal button[type="submit"]'),
    modal = document.querySelector(".modal"),
    cookieConsentBar = document.querySelector(".cookie-consent"),
    cookieConsentBtn = document.querySelector("#cookie-consent"),
    pageBody = document.querySelector("body"),
    header = document.querySelector("header"),
    checkbox = document.querySelector('input[type="checkbox"]');

  //landing page functionality
  if (pageBody.classList.contains("landing")) {
    header.classList.add("landing");

    let cookieStorage = localStorage.getItem("cookieConsent");
    if (cookieStorage) {
      cookieConsentBar.classList.add("cookie-consent--hide");
      cookieConsentBar.classList.remove("cookie-consent--show");
    }

    cookieConsentBtn.addEventListener("click", function (e) {
      cookieConsentBar.classList.remove("cookie-consent--show");
      cookieConsentBar.classList.add("cookie-consent--hide");
      localStorage.setItem("cookieConsent", true);
    });

    let ageStorage = localStorage.getItem("ageConsent");
    let tmpAgeConsent = sessionStorage.getItem("tmpAgeConsent");
    if (ageStorage || tmpAgeConsent) {
      modal.classList.add("hide");
    }

    //modal functionality
    modalClose.addEventListener("click", function (e) {
      modal.classList.remove("in-view");
      sessionStorage.setItem("tmpAgeConsent", true);
      if (checkbox.checked) {
        localStorage.setItem("ageConsent", true);
      }
    });
  }
}
