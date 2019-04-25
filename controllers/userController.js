// require express, router, and models
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
// const Post = require('../models/post.js');
// const Tag = require('../models/tag.js')
// const Comment = require('../models/comment.js')

//index route
router.get('/', (req, res) => {
	User.find({}, (err, foundUser) => {
		if(err) {
			console.log(err);
			res.send(err)
		} else {
			console.log('where is the index page?');
			res.render('user/index.ejs', {user: foundUser});
		}
	})
})
//show route
// router.get('/:id', (req, res) => {
	// if (err){
	// 	console.log(err);
	// else {
	// 	res.render('user/show.ejs', '<-----You hit the page!')
	// 	console.log('Here are your posts');
	// }
	// }
	// User
	// 	.findById(req.params.id)
	// 	.populate('comments')
	// 	.populate('ratings')
	// 	.populate('tags')
	// 	.exec((err, foundUser) => {
	// 		if(err) 
	// 			console.log(err);
	// 		else {
	// 			console.log(foundUser);
	// 			res.render('user/show.ejs', {user: foundUser})
	// 		}
	// 	}
// })

//new route
router.get('/new', (req, res) => {
	res.render('user/new.ejs')
})

//create route
router.post('/', (req, res) => {
	console.log(req.body);
	User.create(req.body, (err, createdUser) => {
		if(err){
			res.send(err);
		} else {
			console.log('WHERE IS IT???');
			res.redirect('/');
		}
	})
});

//delete route
// router.delete('/:id', (req, res) => {
// 	User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
// 		// if(err){
// 		// 	res.send(err);
// 		// } else {
// 		// 	console.log(deletedUser, "<--was deleted");
// 		// 	Post.deleteMany({
// 		// 		_id: {
// 		// 			$in: deletedUser.posts
// 		// 		}
// 		// 	}, (err, data) => {
// 		// 		console.log(data)
// 		// 		res.redirect('/user');
// 		// 	})
// 		// }
// 		if(err){
// 			res.send(err);
// 		else{
// 			console.log(deletedUser, "<--was deleted");
// 			res.redirect('/user');
// 		}
// 		}
// 	})
// })

//edit route
// router.get('/:id/edit', (req, res) => {
// 	User.findById(req.params.id, (err, foundUser) => {
// 		res.render('user/edit.ejs', {user: foundUser}
// 	})
// })
	
//update route
// router.put('/:id', (req, res) => {
// 	User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
// 		if(err){
// 			res.send(err);
// 		} else {
// 			res.redirect('/user');
// 		}
// 	});
// });


//export module
module.exports = router

















