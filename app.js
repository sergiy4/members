const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('dotenv').config()

// routes
const mainRouter = require('./routes/mainRoute')
const registerRouter = require('./routes/registerRouter')
const LogInRouter = require('./routes/authRouter')
const logOutRouter = require('./routes/logoutRouter')
const postRouter = require('./routes/postRouter')
const membersRouter = require('./routes/membersRouter')
const adminRouter = require ('./routes/adminRouter')
// auth middleware require

const {isAuth , isMember , isAdmin} = require('./middleware/authMiddleware')

const app = express();
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

//------------------SESSION SETUP----------

const sessionStore = new MongoStore({
  mongoUrl: process.env.mongoDB,
  collectionName:'session'
})

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUnitialized: true,
    store: sessionStore,
    cookie:{
      maxAge: 1000 * 60 * 60 * 24  //1 day
    }
  })
)
// -----------------PASSPORT---------------

require('./config/passport')

app.use(passport.initialize())
app.use(passport.session())

//------------------MIDDLEWARE-------------



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// -----------------ROUTES-----------------




app.use('/', mainRouter);
app.use('/register', registerRouter)
app.use('/log-in', LogInRouter)
app.use('/log-out',logOutRouter)
app.use('/post', isAuth, postRouter)
app.use('/member', isAuth, membersRouter)
app.use('/admin', isMember, adminRouter)

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
