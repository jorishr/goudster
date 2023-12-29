function setFooterCopyrightText() {
  const fullText = `Verenigde Brouwers &copy; 2014 &mdash; ${new Date().getFullYear()} Alle Rechten Voorbehouden`;

  document.querySelector(".footer__copyright__text").innerHTML = fullText;
}

function setEmailLinks() {
  const emailLinks = document.querySelectorAll(".span-email");
  const linkHtmlText =
    '<a href="mailto:info@goudster.be" title="Mail naar de Verenigde Brouwers">info@goudster.be</a>';
  if (emailLinks.length > 0) {
    emailLinks.forEach((span) => {
      span.innerHTML = linkHtmlText;
    });
  }
}

export default function setText() {
  setEmailLinks();
  setFooterCopyrightText();
}
