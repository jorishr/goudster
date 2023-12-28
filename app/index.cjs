// import packages
require("dotenv").config();
const createError = require("http-errors"),
  express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  path = require("path"),
  logger = require("morgan"),
  helmet = require("helmet"),
  cookieParser = require("cookie-parser");

//import route modules
const index = require("./routes/index.cjs");
const subscribe = require("./routes/subscribe.cjs");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//logs
app.use(logger("dev"));

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cookie-parser
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//statics
app.use(express.static(path.join(__dirname, "public")));

//security
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' 'unsafe-inline' https://kit.fontawesome.com https://maps.googleapis.com"
  );
  next();
});

// use routes
app.use(index);
app.use(subscribe);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { msg: "" });
});

module.exports = app;
