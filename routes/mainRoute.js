const express = require('express');
const mainController = require('../controllers/mainController.js')

const mainRouter = express.Router();
/* GET home page. */

mainRouter.route('/').get(mainController.get_main_page)

module.exports = mainRouter;
