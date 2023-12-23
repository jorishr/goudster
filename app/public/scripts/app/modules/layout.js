/* 
    This logo visually conflicts with the hero section logo 
    that has the same logo in it
*/
function hideHeaderLogoOnLanding() {
  if (document.body.classList.contains("landing")) {
    document.querySelector(".header__logo").classList.add("header__logo--hide");
  }
}

function hideScrollIconOnScroll() {
  const icon = document.querySelector(".scroll-down-icon");
  if (icon) {
    window.addEventListener(
      "scroll",
      () => {
        icon.classList.remove("scroll-down-icon--active");
      },
      { once: true }
    );
  }
}

/* 
    Calculate the actual available screen height, minus the browser status and menu bars 
*/

function adjustHeroStyles() {
  if (document.body.classList.contains("landing")) {
    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;
    const ctaHeading = document.querySelector(".hero__cta__heading");
    const navBar = document.querySelector(".header__navbar");

    if (innerHeight < 640 && innerWidth < 768) {
      ctaHeading.classList.add("hero__cta__heading--hide");
      navBar.classList.add("header__navbar--js-small");
    } else {
      ctaHeading.classList.remove("hero__cta__heading--hide");
      navBar.classList.remove("header__navbar--js-small");
    }
  }
}

function setHeroSectionHeightVar() {
  const innerHeight = window.innerHeight;
  const menuHeight = document.querySelector("header").offsetHeight;
  document.documentElement.style.setProperty(
    "--innerHeight",
    `${innerHeight}px`
  );
  document.documentElement.style.setProperty("--menuHeight", `${menuHeight}px`);
}

export default function layoutHelpers() {
  setHeroSectionHeightVar();
  adjustHeroStyles();
  hideScrollIconOnScroll();
  hideHeaderLogoOnLanding();

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      setHeroSectionHeightVar();
      adjustHeroStyles();
    }, 300);
  });
}
