//require mongoose 
const mongoose = require('mongoose');

//make connection string
const connectionString = 'mongodb://localhost/tix11'
console.log(process.env);
//connect mongoose
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false 
})
//connection.on connect
mongoose.connection.on('connected', () => {
	console.log('mongoose connected to ', connectionString);
})
//connection.on disconnect
mongoose.connection.on('disconnected', () => {
	console.log('mongoose disconnected to ', connectionString);
})
//connection.on error
mongoose.connection.on('error', (error) => {
	console.log('mongoose hit an error', error);
})