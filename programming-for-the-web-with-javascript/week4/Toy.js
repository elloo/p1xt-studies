var mongoose = require('mongoose');

// note: your host/port number may be different!
mongoose.connect('mongodb://localhost:3000/myDatabase');

var Schema = mongoose.Schema;

var toySchema = new Schema( {
	id: {type: String, required: true, unique: true},
	name: {type: String, required: true},
	price: Number
    } );


module.exports = mongoose.model('Toy', toySchema);
