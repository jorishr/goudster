export default function formSubmitHandlers() {
  const btns = [...document.querySelectorAll('button[type="submit"]')];
  if (btns.length > 0) {
    btns.forEach((btn) => {
      btn.addEventListener("click", function (event) {
        const form = event.target.closest("form");
        event.preventDefault(); //this also disables form attribute checks
        if (form.checkValidity()) {
          submitFormWithDebounce(form);
        } else {
          //alert the user with flash alert card
          const alert = document.querySelector(".flash--alert");
          const alertMsg = document.querySelector(".flash__msg--alert");
          alertMsg.textContent =
            "Onvolledige of ongeldige input. Probeer het opnieuw.";
          alert.classList.add("flash--alert--show");
          setTimeout(() => {
            alert.classList.remove("flash--alert--show");
          }, 5000);
        }
      });
    });
  }
}

function submitFormWithDebounce(form) {
  const debounceFn = debounce(() => {
    form.submit();
  }, 500);
  debounceFn();
}

function debounce(func, delay) {
  let timeoutId;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}
