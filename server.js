//requires
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const explainError = require('explain-error')

require('dotenv').config() /// this reads env vars in your .env into the object process.env

const PORT = process.env.PORT


require('./db/db')
//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(session({
	secret: process.env.SESSION_SECRET,
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

app.get('/home', (req,res,next) => {
	res.render('home.ejs')
})


//app listener 

app.listen(PORT, () => {
	console.log('listening...on port: ', 3000);
})

