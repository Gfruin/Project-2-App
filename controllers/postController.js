// require express, router, and models
const express = require('express');
const router = express.Router();
const Post = require('../models/post'); //may need to change the variable name and multiples
const User = require('../models/user');
//index route
router.get('/', (req,res) => {
	console.log('<-------------Hit the index route');
	res.render('/index.ejs', 'Look at terminal')
})
//show route

//new route

//create route

//delete route

//edit route

//update route

//export module