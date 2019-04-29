const express = require('express');
const router = express.Router();
const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')

router.post('/', async (req,res,next) => {
	console.log("where is the comments?");
	const foundPost = await Post.findById(req.params.id) 
	console.log("");
	console.log(foundPost," <-----here is the foundPost");
	const createdComment = await Comment.create({
		text: req.body.text
	}, foundPost.comments.push(createdComment)
	await foundPost.save()
	res.redirect('/posts/' + req.params.id)
})
	console.log("");
	console.log(createdComment, "<--------Here is the createdComment");



module.exports = router; 