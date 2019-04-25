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
router.get('/:id', (req, res) => {
	//Should this be our list of all posts by an user? 
	//What will it show? 
	res.render('post/show.ejs') //may need to alter route "post" to "posts"
})
//new route
router.get('/new', (req, res) => {
	//This route will display the creation page for a new post
	res.render('post/new.ejs') //may need to alter route "post" to "posts"
})
//create route
router.post('/', (req,res) => {
	//this route will have a create function
	//this route will need to be connected to the users
	//some kind of find function? 
	//using req.body to find the user
	//then should we 'push' the user into the created article?
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
// router.delete('/:id', (req, res) => {
// 	//this route will find the article by an id and remove
// 	//once the post is connected to an user, when we delete we will also 
// 	//need to 'clear' or delete the user connection
// 	//and then we will need to update the user again 
// 	res.redirect('/post') //may need to alter route "post" to "posts"
// })
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




