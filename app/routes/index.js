require('dotenv').config();
var express = require('express');
var router  = express.Router(),
nodemailer  = require('nodemailer');

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

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next) {
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


module.exports = router;
