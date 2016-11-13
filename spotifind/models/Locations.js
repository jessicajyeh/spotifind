var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
	latitude:  String,
	longitude: String,
	playlistID: String
});

mongoose.model('Location', LocationSchema);