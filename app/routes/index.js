require('dotenv').config();

const express      = require('express'),
      router       = express.Router(),
      nodemailer   = require('nodemailer');

const { check, sanitizeBody, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage', msg: '' });
});

router.get('/ons-verhaal', function(req, res, next) {
  res.render('history', { title: 'History' });
});

router.get('/info', function(req, res, next) {
  res.render('info', { title: 'Info' });
});

router.get('/waar-proeven', function(req, res, next) {
  res.render('location', { title: 'Locations' });
});

router.get('/beleid', function(req, res, next) {
  res.render('policy', { title: 'Policy' });
});

router.get('/voorwaarden', function(req, res, next) {
  res.render('conditions', { title: 'Terms and conditions' });
});

//contact form
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', [
    check('name').not().isEmpty().trim().escape(),
    check('email').isEmail().normalizeEmail(),
    check('message').not().isEmpty().trim().escape(),
    sanitizeBody('notifyOnReply').toBoolean()
],
function(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('contact', {
      data: req.body,
      errors: errors.mapped(),
    })
  }
  let transporter = nodemailer.createTransport({
    host: 'smtp.eu.mailgun.org',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD  // generated ethereal password
    },
    tls:{rejectUnauthorized:false}
  });
  const output = 
  `
  <p>Een nieuw bericht via de website.</p>
  <h3>Van:</h3>
  <ul>  
    <li>Naam: ${req.body.name}</li>
    <li>Naam: ${req.body.subject}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h3>Bericht</h3>
  <p>${req.body.message}</p>
  `;
  
  let mailOptions = {
    from: '"Goudster Website" <mg@jorisraymaekers.com>', // sender address
    to: 'info@goudster.be', // list of receivers
    subject: 'Vraag via de website', // Subject line
    text: `${req.body.message}`, // plain text body
    html: output // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    let msg = 'Uw bericht werd correct verzonden!';
    res.render('index', { msg: msg });
  });
});

//mailing list 
const mgDomain  = process.env.MAILGUN_DOMAIN;
const mgHost    = process.env.MAILGUN_HOST;
const mailgun   = require('mailgun-js')({ apiKey: process.env.MAILGUN_APIKEY, domain: mgDomain, host: mgHost });
const list      = mailgun.lists(`email-lijst@${mgDomain}`);

router.post('/subscribe', [
  check('email').isEmail().normalizeEmail()
], (req, res, next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  var user = {
    subscribed: true,
    address: `${req.body.email}`    
  }

  list.members().create(user, function (err, data) {
    if(err){res.render('error', {error: err})};
    console.log(data);
    res.render('index', {msg: 'Je bent nu geabonneerd op de Goudster nieuwsbrief!'});
  });
});

router.get('/webmail', (req, res) => {
  res.redirect('http://vserver114.axc.nl/roundcube')
});

module.exports = router;
