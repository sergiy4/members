const express = require('express')
const postController = require('../controllers/postController')

const postRouter = express.Router()



postRouter.route('/')
.get(postController.get_post_form)
.post(postController.post_post_form)

postRouter.route('/:id/delete')
.post(postController.delete_post)

postRouter.route('/:id')
.get(postController.getCurrentPost)



module.exports = postRouter