const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

passport.use(
    new LocalStrategy(async(username, password, done)=>{

        try{

            const user = await User.findOne({username :username})

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            };

            bcrypt.compare(password, user.hash, (err, res) => {


              if (res) {
               
                  // passwords match! log user in
                return done(null, user)
              } else {
             
                // passwords do not match!
                return done(null, false, { message: "Incorrect password" })
              }

            })
           
            // return done(null, user);

        } catch(err) {
            
          return done(err);
        };
    })
)

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {

    try {
      const user = await User.findById(id);
      done(null, user);
    } catch(err) {
      done(err);
    };
  });