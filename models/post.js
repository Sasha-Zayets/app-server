const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postModel = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  author: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('posts', postModel)