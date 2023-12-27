export default function handleCheckbox() {
  const contactFormCheckbox = document.querySelector(
    '.contact__form input[type="checkbox"]'
  );
  const contactFormSubmitBtn = document.querySelector(".contact__form button");

  if (contactFormSubmitBtn) {
    contactFormSubmitBtn.disabled = true;
  }

  if (contactFormCheckbox) {
    contactFormCheckbox.addEventListener("click", () => {
      contactFormSubmitBtn.disabled = !contactFormCheckbox.checked;
    });
  }
}
