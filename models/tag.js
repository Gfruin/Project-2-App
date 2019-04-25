//require mongoose
const mongoose = require('mongoose')
//define tagSchema
const tagSchema = new mongoose.Schema({
	buy: Boolean,
	sell: Boolean,
	free: Boolean
})
//define the model 
const Tag = new mongoose.model('Tag', tagSchema)
//export module
module.exports = Tag;