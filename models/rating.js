//require mongoose
const mongoose = require('mongoose')
//define ratingSchema
const ratingSchema = new mongoose.Schema({
	rating: {
		value: Number
	},
})
//define the model 
const Rating = new mongoose.model('Rating', ratingSchema)
//export module
module.exports = Rating