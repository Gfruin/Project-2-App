const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
	res.render('login.ejs', {
		message: req.session.message
	})
});

router.post('/register', async (req, res) => {
	const password = req.body.password;
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
		console.log('You have registered');
})



const hashedString = bcrypt.hashSync('Your Password', bcrypt.genSaltSync(10));
router.post('/register', async (req, res) => {
	const password = req.body.password;
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	const userDBEntry = {};
	userDBEntry.username = req.body.username;
	userDBEntry.password = passwordHash;

	try {
		const createdUser = await User.create(userDBEntry);
		req.session.logged = true;
		req.session.userDBEntry = createdUser._id;

		res.redirect('/user');
	} catch(err){
		res.send(err)
	}
});

router.post('/login', async (req, res) => {
	try {
		const foundUser = await User.findOne({'username': req.body.username});
		if(foundUser){
			if(bcrypt.compareSync(req.body.password, foundUser.password) === true){
				res.session.message = '';
				req.session.logged = true;
				req.session.usersDBId = foundUser._id;

				console.log(req.session, ' successful in login');
				res.redirect('/users');
			} else {
				req.session.message = "Username or password is incorrect";
				res.redirect('/auth/login');
			}
		} else {
			req.session.message = "Username or password is incorrect";
			res.redirect('/auth/login');
		}
	} catch(err){
	res.send(err);
}
});

router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if(err){
			res.send(err);
		} else {
			res.redirect('/auth/login');
		}
	})
})


module.exports = router;

























