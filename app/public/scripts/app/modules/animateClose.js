// close with animation
export default function animateClose(target, baseClass) {
  target.classList.add(`${baseClass}--closing`);
  target.addEventListener(
    "animationend",
    () => {
      target.classList.remove(`${baseClass}--active`);
      target.classList.remove(`${baseClass}--closing`);
    },
    { once: true }
  );
}
