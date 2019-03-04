const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const authRout = require('./routes/auth')
const postRout = require('./routes/post')
const keys = require('./config/keys')

//connect database
mongoose.connect(keys.mongoURL, { useNewUrlParser: true })
  .then(() => console.log('Connect db'))
  .catch(error => console.log(error))

//use plugin
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//use route
app.use('/api/auth', authRout)
app.use('/api/post', postRout)

module.exports = app