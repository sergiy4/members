const express = require('express')
const logOutController = require('../controllers/logOutController')
const logOutRouter = express.Router()

logOutRouter.route('/')
.get(logOutController.log_out)

// 
module.exports = logOutRouter