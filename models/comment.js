//require mongoose
const mongoose = require('mongoose')
//define commentSchema
const commentSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},

	text: {
		type: String,
		required: true
	},
	users: {type: mongoose.Schema.Types.ObjectId, ref: "Users"} //type will refer
	//to mongoose to find the user id to print on the page.... 
	//ref is to model of 'user'
})
//define the model 
const Comment = new mongoose.model('Comment', commentSchema)
//export module
module.exports = Comment;