//requires
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const explainError = require('explain-error')
require('./db/db')
//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(session({
	secret: 'You got a secret random string',
	resave: false,
	saveUninitialized: false
}))

//controllers
const userController = require('./controllers/userController')
app.use('/users', userController)
const postController = require('./controllers/postController')
app.use('/posts', postController)
const commentController = require('./controllers/commentController')
app.use('/comments', commentController)
const authController = require('./controllers/authController')
app.use('/auth', authController)
app.use(express.static('public'))


app.get('/', (req, res) => {
	const msg = req.session.message
	req.session.message = ""

	res.render('home.ejs', {
		message: msg
	})
})


//app listener 

app.listen(3000, () => {
	console.log('listening...on port: ', 3000);
})

