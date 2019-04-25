// require express, router, and models
const express = require('express');
const router = express.Router();
const Post = require('../models/post'); //may need to change the variable name and multiples
const User = require('../models/user');
//index route
router.get('/', (req,res) => {
	console.log('<-------------Hit the index route');
	//need to display the posts that have been created
	Post.find({}, (err, foundPost) => {
		if(err) {
			console.log(err);
		} else {
			res.render('post/index.ejs', {post: foundPost})

		}
	})
})
//show route
// router.get('/:id', (req, res) => {
// 	//Should this be our list of all posts by an user? 
// 	//What will it show? 
// 	res.render('post/show.ejs') //may need to alter route "post" to "posts"
// })
//new route
router.get('/new', (req, res) => {
	//This route will display the creation page for a new post
	res.render('post/new.ejs') //may need to alter route "post" to "posts"
})
//create route
router.post('/', (req,res) => {
	console.log('this is the create route');  
	Post.create(req.body, (err, createdPost) => {
		if(err) {
			console.log(err);
		} else {
 //may need to alter route "post" to "posts"
			res.redirect('/post')
		}
	})
})
//delete route
router.delete('/:id', (req, res) => {
	Post.findbyIdAndRemove(req.params.id, (err, deletedPost) => {
		User.findOne({'post': req.params.id}, (err, foundUser) => {
			if(err){
				res.send(err)
			} else {
				console.log(foundUser, "<-------this is our User before deletion");
				foundUser.post.remove(req.params.id);
				foundUser.save((err, updatedUser) => {
					console.log(updatedUser);
					res.redirect('/post');
				})
			}
		})
	})
	res.redirect('/post') //may need to alter route "post" to "posts"
})
// //edit route
// router.get('/:id/edit', (req, res) => {
// 	//this route will allow the user to select all users when they are editing the user
// 	//need to use User.find
// 	//then the route will find the post and corresponding user
// 	//User.findOne?
// 	//use .populate to find all articles
// 	//use match to populate only articles that match the certain user id
// 	res.render('post/edit.ejs') //may need to alter route "post" to "posts"
// })
// //update route
// //if the user is changed
// //1. then the post goes into a different user's array
// //2.  and is removed from the original user's array of articles
// // need to find a post and update that post
// //then need to find the user and see who changed the post
// //need to remove the post from the user 
// router.put('/:id', (req,res) => {
// 	//need to redirect
// })
//export module

module.exports = router;




