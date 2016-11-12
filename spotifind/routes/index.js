var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Location = mongoose.model('Location');


/* GET home page. */
router.get('/locations', function(req, res, next) {
  Location.find(function(err, locations){
  	if(err) { return next(err); }

  	res.json(locations);
  });
});

/* POST */
router.post('/locations', function(req, res, next) {
	var location = new Location(req.body);

	location.save(function(err, location){
		if(err){ return next(err); }

		res.json(location);

	});
	

});

module.exports = router;
