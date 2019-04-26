//requires
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const explainError = require('explain-error')
require('./db/db')
//controllers
const userController = require('./controllers/userController')
const postController = require('./controllers/postController')

const authController = require('./controllers/authController')

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(session({
	secret: 'You got a secret random string',
	resave: false,
	saveUninitialized: false
}))

app.use('/users', userController)
app.use('/posts', postController)
app.use('/auth', authController)




//app listener 

app.listen(3000, () => {
	console.log('listening...on port: ', 3000);
})

