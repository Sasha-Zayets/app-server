const express = require('express')
const router = express.Router()
const postController = require('../controller/post')

router.post('/add', postController.addPost)
router.post('/all', postController.allMyPost)
router.post('/delete', postController.deletePost)

module.exports = router