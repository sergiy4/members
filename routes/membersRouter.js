const express = require('express')
const membersRouter = express.Router()
const membersController = require('../controllers/membersController')

membersRouter.route('/')
.get(membersController.get_members_form)
.post(membersController.post_members_form)

module.exports = membersRouter