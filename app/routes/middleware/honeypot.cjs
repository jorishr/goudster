// Middleware to check form honeypot field
module.exports = (req, res, next) => {
  if (req.body.yourMessage) {
    return res.status(403).send("Forbidden");
  }
  next();
};
