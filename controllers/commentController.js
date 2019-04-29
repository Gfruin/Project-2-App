const express = require('express');
const router = express.Router();
const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')

router.post('/:postId', (req, res) => {
	console.log(req.body.postID)
	Post.findById(req.params.postId, (err, foundPost) => {
		Comment.create({
			text: req.body.text

		}, (err, createdComment) => {

			foundPost.comments.push(createdComment);
			foundPost.save((err) => {
				if(err)
					console.log(err);
				res.redirect('/posts/' + foundPost._id)
			});
		})
	})
})
// router.post('/', async (req,res,next) => {
// 	console.log("where is the comments?");
// 	const foundPost = await Post.findById(req.params.id) 
// 	console.log("");
// 	console.log(foundPost," <-----here is the foundPost");
// 	const createdComment = await Comment.create({
// 		text: req.body.text
// 	}, foundPost.comments.push(createdComment)
// 	await foundPost.save()
// 	res.redirect('/posts/' + req.params.id)
// })
// 	console.log("");
// 	console.log(createdComment, "<--------Here is the createdComment");



module.exports = router; 