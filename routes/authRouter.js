const express = require('express')
const logInController = require('../controllers/logInController')
const LogInRouter = express.Router()
const passport = require("passport");

LogInRouter.route('/')
.get(logInController.get_log_in)
.post(logInController.post_log_in, passport.authenticate('local',{failureRedirect:'/login-failure', successRedirect:'/'}))
//
// 
module.exports = LogInRouter