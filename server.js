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
// const commentController = require('./controllers/commentController')
const postController = require('./controllers/postController')
// const tagController = require('./controllers/tagController')
// const ratingController = require('./controllers/ratingController')
// const authController = require('./controllers/authController')

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use('/user', userController)
app.use('/post', postController)
// app.use('/rating', ratingController)
// app.use('/comment', commentController)
// app.use('/tag', tagController)



//app listener 

app.listen(3000, () => {
	console.log('listening...on port: ', 3000);
})

