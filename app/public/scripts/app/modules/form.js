export default function setupForms() {
  const pageBody = document.querySelector("body"),
    checkbox = document.querySelector('input[type="checkbox"]'),
    inputFields = document.querySelectorAll("input[required], textarea"),
    contactSubmit = document.querySelector("form.contact button"),
    subscribeBtn = document.querySelector(".form__consent button");

  if (inputFields.length !== 0) {
    if (
      pageBody.classList.contains("landing") ||
      pageBody.classList.contains("hasCaptureEmail")
    ) {
      subscribeBtn.disabled = true;
    }
    if (pageBody.classList.contains("contact")) {
      contactSubmit.disabled = true;
    }
    for (let i = 0; i < inputFields.length; i++) {
      inputFields[i].addEventListener("input", function () {
        let values = [];
        let checked = checkbox.checked;
        inputFields.forEach((field) => values.push(field.value));
        if (
          pageBody.classList.contains("landing") ||
          pageBody.classList.contains("hasCaptureEmail")
        ) {
          //there is more than one checkbox on this page
          checked = document.querySelector(
            'input[type="checkbox"].subscribe'
          ).checked;
          subscribeBtn.disabled = values.includes("") || !checked;
        }
        if (pageBody.classList.contains("contact")) {
          contactSubmit.disabled = values.includes("") || !checked;
        }
      });
    }
  }
}
