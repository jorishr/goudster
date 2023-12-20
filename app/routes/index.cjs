require("dotenv").config();

const express = require("express"),
  router = express.Router(),
  nodemailer = require("nodemailer");

const { check, validationResult } = require("express-validator");
const verifyAge = require("../helpers/verifyAge.cjs");

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
  res.render("history", { title: "History" });
});

router.get("/info", function (req, res, next) {
  res.render("info", { title: "Info" });
});

router.get("/waar-proeven", function (req, res, next) {
  res.render("location", { title: "Locations" });
});

router.get("/beleid", function (req, res, next) {
  res.render("policy", { title: "Policy" });
});

router.get("/voorwaarden", function (req, res, next) {
  res.render("conditions", { title: "Terms and conditions" });
});

/* contact form routes*/
router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Contact" });
});

router.post(
  "/send",
  [
    check("name").not().isEmpty().trim().escape(),
    check("email").isEmail().normalizeEmail(),
    check("message").not().isEmpty().trim().escape(),
    check("notifyOnReply").toBoolean(),
  ],
  function (req, res) {
    //spam protection
    if (req.body.url !== "") {
      return res.render("index", { msg: "Hello Spambot!" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("contact", {
        data: req.body,
        errors: errors.mapped(),
      });
    }
    let transporter = nodemailer.createTransport({
      host: "smtp.eu.mailgun.org",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
      tls: { rejectUnauthorized: false },
    });
    const output = `
  <p>Een nieuw bericht via de website.</p>
  <h3>Van:</h3>
  <ul>  
    <li>Naam: ${req.body.name}</li>
    <li>Onderwerp: ${req.body.subject}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h3>Bericht</h3>
  <p>${req.body.message}</p>
  <br>
  <hr>
  <p><em>Deze e-mail is automatisch gegenereerd door de Goudster website. Om de afzender te antwoorden: schrijf een nieuwe e-mail en gebruik het opgegeven e-mailadres.</em></p>
  `;

    let mailOptions = {
      from: '"Goudster Website" <mg@jorisraymaekers.com>', // sender address
      to: "info@goudster.be", // list of receivers
      subject: `Vraag via de website: ${req.body.subject}`, // Subject line
      text: `${req.body.message}`, // plain text body
      html: output, // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      let msg = "Uw bericht werd correct verzonden!";
      res.render("index", { msg: msg });
    });
  }
);

/* mailing list signup*/
const mgDomain = process.env.MAILGUN_DOMAIN;
const mgHost = process.env.MAILGUN_HOST;
const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_APIKEY,
  domain: mgDomain,
  host: mgHost,
});
const list = mailgun.lists(`mailing@${mgDomain}`);

router.post(
  "/subscribe",
  [check("email").isEmail().normalizeEmail()],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    var user = {
      subscribed: true,
      address: `${req.body.email}`,
    };

    list.members().create(user, function (err, data) {
      if (err) {
        res.render("error", { error: err });
      }
      console.log(data);
      res.render("index", {
        msg: "Je bent nu geabonneerd op de Goudster nieuwsbrief!",
      });
    });
  }
);

router.get("/webmail", (req, res) => {
  const webmailLoginUrl = process.env.WEBMAIL_LOGIN_URL;
  res.redirect(`${webmailLoginUrl}`);
});

module.exports = router;
