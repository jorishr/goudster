//fade-in with intersection observer API
const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -50px 0px",
};

//the appearOnScroll function
const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("timeline__item--reveal");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

function setFadeIn() {
  const faders = document.querySelectorAll(".fade-in");
  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
}

export default setFadeIn;
