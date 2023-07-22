const express = require('express')
const adminController = require('../controllers/adminController')

const adminRouter = express.Router()

adminRouter.route('/')
.get(adminController.get_admin_form)
.post(adminController.post_admin_form)

module.exports = adminRouter