//require mongoose
const mongoose = require('mongoose')

//define postSchema
const postSchema = new mongoose.Schema({
	title: String,
	description: String,
	tags: [{type: mongoose.Schema.Types.ObjectId, ref: "Tags"}],
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comments"}]

})
//define the model 
const Post = new mongoose.model('Post', postSchema)
//export module

module.exports = Post;