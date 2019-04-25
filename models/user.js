//require mongoose
const mongoose = require('mongoose')
//define userSchema
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	post: []
})
//define the model 
const User = mongoose.model('User', userSchema);
//export module
module.exports = User;