/* mailing list signup route */
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const mgDomain = process.env.MAILGUN_DOMAIN;
const mgHost = process.env.MAILGUN_HOST;
const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: mgDomain,
  host: mgHost,
});
const list = mailgun.lists(process.env.MAILGUN_MAILINGLIST);

router.post(
  "/subscribe",
  [check("email").isEmail().normalizeEmail()],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const user = {
      subscribed: true,
      address: `${req.body.email}`,
    };

    list.members().create(user, function (err, data) {
      if (err) {
        res.render("error", { message: err, error: err });
      }
      console.log(data);
      res.render("index", {
        title: "Homepage",
        msg: "Je bent nu geabonneerd op de Goudster nieuwsbrief!",
        removeModal: true,
      });
    });
  }
);

module.exports = router;
