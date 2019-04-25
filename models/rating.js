//require mongoose
const mongoose = require('mongoose')
//define ratingSchema
const ratingSchema = new mongoose.Schema({
	rating: {
		value: Number
	},
})
//define the model 

//export module