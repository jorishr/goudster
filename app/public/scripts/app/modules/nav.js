import animateClose from "./animateClose.js";

export default function togglePopupMenu() {
  const toggle = document.querySelector("#toggle-menu-pop-up");
  const menuPopup = document.querySelector(".menu-pop-up");
  if (toggle && menuPopup)
    toggle.addEventListener("click", () => {
      if (menuPopup.classList.contains("menu-pop-up--active")) {
        animateClose(menuPopup, "menu-pop-up");
      } else menuPopup.classList.add("menu-pop-up--active");
    });
}
