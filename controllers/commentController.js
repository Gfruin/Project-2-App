const express = require('express');
const router = express.Router();
const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')

router.post('/:postId', async (req, res, next) => {
	console.log('\nhere is req.body in comment create route');
	console.log(req.body)

	const user = await User.findById(req.session.userDBId)
	console.log("\nhere's the user we found in comment create");
	console.log(user);


	Comment.create(
	{
		text: req.body.text,
		user: user
	}, 
	(err, createdComment) => {
		console.log("\ncreatedComment:");
		console.log(createdComment);

		Post.findById(req.params.postId, (err, foundPost) => {

			foundPost.comments.push(createdComment);
			console.log(foundPost);
			foundPost.save((err, data) => {
				if(err) {
					next(err);
				}
				else {
					console.log("\n here's the data in save");
					console.log(data)
					res.redirect('/posts/' + foundPost._id)
				}
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