require('dotenv').config();

const createError   = require('http-errors'),
      express       = require('express'),
      app           = express();
      path          = require('path'),
      logger        = require('morgan'),
      indexRouter   = require('./routes/index'),
      port          = process.env.SERVER_PORT;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//logs
app.use(logger('dev'));

//json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//statics
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, console.log(`App listening on port ${port}`));