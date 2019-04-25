//requires
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
require('./db/db')
//controllers
const userController = require('./controllers/userController')
// const commentController = require('./controllers/commentController')
// const postController = require('./controllers/postController')
// const tagController = require('./controllers/tagController')
// const ratingController = require('./controllers/ratingController')
// const authController = require('./controllers/authController')

//middleware


//app listener 

app.listen(3000, () => {
	console.log('listening...on port: ', 3000);
})

