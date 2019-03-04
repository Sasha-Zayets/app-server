const Post = require('../models/post')
const User = require('../models/users')

module.exports.addPost = async function (req, res) {

  const newPost = new Post({
    title: req.body.title,
    text: req.body.text,
    date: req.body.date,
    active: req.body.active,
    author: req.body.author
  })
  try {
    await newPost.save()
    res.status(201).json(newPost)
  } catch (e) {
    console.log(e.message)
  }
}

module.exports.allMyPost = async function (req, res) {
  try {
    const criteries = await Post.find({author: req.body.author})
    res.json(criteries) 
  }
  catch (e) {
    res.json({
      message: 'Error'
    })
  }

}

module.exports.deletePost = async function (req, res) {
  try {
    await Post.remove({_id: req.body.id})
    res.status(201).json({
      message: 'remove post'
    })
  } catch (e) {
    res.json({
      message: 'Erorr delete post'
    })
  }
}