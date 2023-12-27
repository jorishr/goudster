nodemailer = require("nodemailer");

function sendEmailToAdmin(body) {
  const emailOutput = `
    <p>Een nieuw bericht via de website.</p>
    <h3>Van:</h3>
    <ul>  
      <li>Naam: ${body.name}</li>
      <li>Onderwerp: ${body.subject}</li>
      <li>Email: ${body.email}</li>
    </ul>
    <h3>Bericht</h3>
    <p>${body.message}</p>
    <br>
    <hr>
    <p><em>Deze e-mail is automatisch gegenereerd door de Goudster website. Om de afzender te antwoorden: schrijf een nieuwe e-mail en gebruik het opgegeven e-mailadres.</em></p>
    `;

  const transporter = nodemailer.createTransport({
    host: "smtp.eu.mailgun.org",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
    tls: { rejectUnauthorized: false },
  });

  let mailOptions = {
    from: '"Goudster Website" <postmaster@mg.goudster.be>', // sender address
    to: "info@goudster.be", // list of receivers
    subject: `Vraag via de website: ${body.subject}`, // Subject line
    text: `${body.message}`, // plain text body
    html: emailOutput, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
}

module.exports = sendEmailToAdmin;
