// require express, router, and models
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Post = require('../models/post.js');
// const Tag = require('../models/tag.js')
// const Comment = require('../models/comment.js')
const explainError = require('explain-error')

//index route
router.get('/', (req, res) => {
	User.find({}, (err, foundUsers) => {
		if(err) {
			console.log(err);
			res.send(err)
		} else {
			console.log('where is the index page?');
			res.render('users/index.ejs', {users: foundUsers});
		}
	})
})
//new route
router.get('/new', (req, res) => {
	res.render('users/new.ejs')
})

//create route
router.post('/', (req, res) => {
	console.log(req.body);
	User.create(req.body, (err, createdUser) => {
		if(err){
			res.send(err);
		} else {
			console.log('WHERE IS IT???');
			res.redirect('/users');
		}
	})
});
//show route
router.get('/:id', (req, res) => {
	User
		.findById(req.params.id)
		.populate('comments')
		.populate('ratings')
		.populate('tags')
		.exec((err, foundUser) => {
			if(err) {
				console.log(err);
			} else {
				console.log(foundUser);
				res.render('users/show.ejs', {user: foundUser})
			}
		})
})


//delete route
router.delete('/:id', (req, res) => {
	if(req.session.userDBId == null) {
        res.redirect('/auth/login')
    } else {
	User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
		if(err){
			res.send(err);
		} else {
			console.log(deletedUser, "<--was deleted");
			Post.deleteMany({
				_id: {
					$in: deletedUser.posts
				}
			}, (err, data) => {
				console.log(data)
				res.redirect('/users');
			}) //look here first for error
		}
	})
	}
})

// edit route
router.get('/:id/edit', (req, res) => {
	if(req.session.userDBId == null) {
        res.redirect('/auth/login')
    } else {
	User.findById(req.params.id, (err, foundUser) => {
		res.render('users/edit.ejs', {user: foundUser})
	})
}
})
	
// update route
router.put('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
		if(err){
			res.send(err);
		} else {
			res.redirect('/users');
		}
	});
});


//export module
module.exports = router

















