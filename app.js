const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bluebird = require('bluebird');
const helmet = require('helmet');

/*Load Environment variables*/
const dotenv = require('dotenv');
dotenv.config();

/**
 * Database connection
 */
const mongoose = require('mongoose');
const mongo_url = process.env.DB_URL;
mongoose.Promise = bluebird;
mongoose.connect(mongo_url).then(
  () => { //Connection success
    console.log('Connected to MongoDB Successfully!');
  }
).catch(err => {
  console.error.bind(console, 'MongoDB connection error:')
});


// ============= Import ROUTES ========================
const indexRouter   = require('./routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// un-comment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());


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
  res.send('error');
});

module.exports = app;
