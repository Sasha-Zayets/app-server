const bcript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/users')

module.exports.login = async function(req, res) {
  const candidate = await User.findOne({ email: req.body.email })
  
  if (candidate) {
    const passwordResult = bcript.compareSync(req.body.password, candidate.password)

    if (passwordResult) {
      const token = jwt.sign({
        email: candidate.email,
        password: candidate.password,
        id: candidate._id
      }, keys.jwt, {expiresIn: 60 * 60})

      res.status(200).json({
        id: candidate._id,
        token: token
      })
    } else {
      res.json({
        message: 'Not a valid password'
      })
    }
  } else {
    res.status(401).json({
      message: 'The user with such email does not exist'
    })
  }
}

module.exports.registration = async function(req, res) {
  const candidate = await User.findOne({ email: req.email})

  if (candidate) {
    res.json({
      message: 'A user with such email exists. Check the correctness of the data'
    })
  } else {
    //Створення нового користувача
    const salt = bcript.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcript.hashSync(password, salt)
    })

    try {
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      res.json({
        message: 'Registration failed'
      })
    }
  }
}