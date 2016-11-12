var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Location = mongoose.model('Location');


/* GET home page. */
router.get('/', function(req, res) {
	res.render('index');
});

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

router.param('location', function(req, res, next, id) {
	var query = Location.findById(id);

	query.exec(function(err, location) {
		if (err) {return next(err); }
		if (!location) { return next(new Error('can\'t find location')); }
		req.location = location;
		return next();
	});
});

router.get('/locations/:location', function(req, res) {
	res.json(req.location);
});

module.exports = router;
