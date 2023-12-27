export default function setupConsent() {
  const modal = document.querySelector(".modal");
  const cookieConsentBar = document.querySelector(".cookie-consent");
  const cookieConsentBtn = document.querySelector("#cookie-consent");

  const cookieStorage = localStorage.getItem("cookieConsent");
  console.log(cookieStorage, localStorage);
  if (cookieStorage) {
    cookieConsentBar.classList.remove("cookie-consent--show");
  }

  cookieConsentBtn.addEventListener("click", function (e) {
    cookieConsentBar.classList.remove("cookie-consent--show");
    //cookieConsentBar.classList.add("cookie-consent--hide");
    console.log("Setting consent cookie...");
    localStorage.setItem("cookieConsent", true);
    console.log("Set?", localStorage);
  });

  const ageConsentCookie = localStorage.getItem("ageConsent");
  const tmpAgeConsent = sessionStorage.getItem("tmpAgeConsent");
  if (ageConsentCookie || tmpAgeConsent) {
    modal.classList.remove("modal--show");
  }
}
