var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
	latitude:  String,
	longitude: String,
	playListID: String	
});

mongoose.model('Location', LocationSchema);