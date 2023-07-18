const express = require('express')
const registerController = require('../controllers/registerController')

const registerRouter = express.Router()

registerRouter.route('/')
.get(registerController.get_register_form)
.post(registerController.post_register_form)

module.exports = registerRouter