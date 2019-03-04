const express = require('express')
const router = express.Router()
const controller = require('../controller/auth')

router.post('/login', controller.login)
router.post('/registration', controller.registration)

module.exports = router