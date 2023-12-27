/* 
The flash message content is set by Express server code and only shown once per render. The styling makes the container fade-out but the element remained in the DOM, overlapping with the menu.   
*/

export default function removeFlashMsgFromDOM() {
  document.addEventListener("DOMContentLoaded", () => {
    const flashMsgContainer = document.querySelector(".flash");
    const flashMsgText = document.querySelector(".flash__msg");
    const hasText = flashMsgText.textContent;
    if (flashMsgContainer && hasText) {
      setTimeout(() => {
        flashMsgContainer.classList.add("flash--hide");
      }, 5000);
    }
  });
}
