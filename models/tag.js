//require mongoose
const mongoose = require('mongoose')
//define tagSchema
const tagSchema = new mongoose.Schema({
	name: {
		type: String
	}
})
//define the model 
const Tag = new mongoose.model('Tag', tagSchema)
//export module
module.exports = Tag;