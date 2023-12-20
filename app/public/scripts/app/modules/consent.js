export default function setupConsent() {
  const modalClose = document.querySelector('.modal button[type="submit"]'),
    modal = document.querySelector(".modal"),
    cookieBar = document.querySelector(".privacy-bar"),
    cookieClosers = document.querySelectorAll(".privacy-bar a, .privacy-bar i"),
    pageBody = document.querySelector("body"),
    header = document.querySelector("header"),
    acceptBtn = document.querySelector("#cookie-consent"),
    checkbox = document.querySelector('input[type="checkbox"]');

  //landing page functionality
  if (pageBody.classList.contains("landing")) {
    header.classList.add("landing");

    let cookieStorage = localStorage.getItem("cookieConsent");
    if (cookieStorage) {
      cookieBar.classList.add("hide");
    }

    let ageStorage = localStorage.getItem("ageConsent");
    let tmpAgeConsent = sessionStorage.getItem("tmpAgeConsent");
    if (ageStorage || tmpAgeConsent) {
      modal.classList.add("hide");
    }

    //close cookie consent bar functionality
    let closeBtns = Array.from(cookieClosers);
    closeBtns.forEach((btn) => {
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
}
