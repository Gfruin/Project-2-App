//require mongoose
const mongoose = require('mongoose')

//define postSchema
const postSchema = new mongoose.Schema({
	title: String,
	description: String,
	tags: [{type: mongoose.Schema.Types.ObjectId, ref: "Tag"}],
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}

})

//define the model 
const Post = new mongoose.model('Post', postSchema)
//export module

module.exports = Post;