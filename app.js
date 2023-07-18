const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
require('dotenv').config()
// 
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/registerRouter')

//-----------------MONGOOSE CONNECT----------

const mongoose = require('mongoose')
mongoose.set("strictQuery", false);

const dbOptions = {
  useUnifiedTopology: true, 
  useNewUrlParser: true
}
// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));



async function main() {
  await mongoose.connect(process.env.mongoDB ,dbOptions);
  console.log('connect to mongo DB')
}


//------------------MIDDLEWARE-------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// -----------------ROUTES-----------------




app.use('/', indexRouter);
app.use('/register', registerRouter)





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

module.exports = app;
