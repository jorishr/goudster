export default function setupConsent() {
  const modal = document.querySelector(".modal");
  const cookieConsentBar = document.querySelector(".cookie-consent");
  const cookieConsentBtn = document.querySelector("#cookie-consent");

  const cookieStorage = localStorage.getItem("cookieConsent");
  if (cookieStorage) {
    cookieConsentBar.classList.remove("cookie-consent--show");
  }

  cookieConsentBtn.addEventListener("click", function (e) {
    cookieConsentBar.classList.remove("cookie-consent--show");
    localStorage.setItem("cookieConsent", true);
  });

  const ageConsentCookie = localStorage.getItem("ageConsent");
  const tmpAgeConsent = sessionStorage.getItem("tmpAgeConsent");
  if (ageConsentCookie || tmpAgeConsent) {
    modal.classList.remove("modal--show");
  }
}
