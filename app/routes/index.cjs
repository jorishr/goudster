require("dotenv").config();

const express = require("express");
router = express.Router();
const { check, validationResult } = require("express-validator");

const formHoneyPot = require("./middleware/honeypot.cjs");
const verifyAge = require("../helpers/verifyAge.cjs");
const sendEmailToAdmin = require("../helpers/sendEmailToAdmin.cjs");

/* home page. */
router.get("/", function (req, res, next) {
  const removeModal = req.cookies.ageConsent || false;
  res.render("index", { title: "Homepage", msg: "", removeModal: removeModal });
});

router.post("/consent", function (req, res, next) {
  const { day, month, year } = req.body;
  const isValid = verifyAge(day, month, year);
  if (isValid) {
    res.cookie("ageConsent", true);
    res.redirect("/");
  } else {
    const msg = "Oeps! Geen geldige geboortedatum";
    res.render("index", { title: "Homepage", msg: msg, removeModal: false });
  }
});

/* other routes */
router.get("/ons-verhaal", function (req, res, next) {
  res.render("history", { title: "History", msg: "" });
});

router.get("/info", function (req, res, next) {
  res.render("info", { title: "Info", msg: "" });
});

router.get("/waar-proeven", function (req, res, next) {
  res.render("location", { title: "Locations", msg: "" });
});

router.get("/beleid", function (req, res, next) {
  res.render("policy", { title: "Policy", msg: "" });
});

router.get("/voorwaarden", function (req, res, next) {
  res.render("conditions", { title: "Terms and conditions", msg: "" });
});

/* contact form routes*/
router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Contact", msg: "" });
});

router.post(
  "/send",
  formHoneyPot,
  [
    check("name")
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage("Geef een naam op."),
    check("email").isEmail().normalizeEmail().withMessage("Ongeldige email."),
    check("message")
      .trim()
      .escape()
      .not()
      .isEmpty()
      .withMessage("Geen geldig bericht."),
  ],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      return res.render("contact", {
        msg: `De ingevoerde data is ongeldig en kan niet worden aanvaard door de server. Probeer het opnieuw.`,
        removeModal: true,
      });
    }
    await sendEmailToAdmin(req.body);
    const msg = "Uw bericht werd correct verzonden!";
    res.render("index", { msg: msg, removeModal: true });
  }
);

router.get("/webmail", (req, res) => {
  const webmailLoginUrl = process.env.WEBMAIL_LOGIN_URL;
  res.redirect(`${webmailLoginUrl}`);
});

module.exports = router;
