var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/cars');

var classSchema = new Schema({
  make: String,
  model: String,
  year: String,
  scca_class: String,
  });
var Class = mongoose.model('Class', classSchema);

router.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  return next();
});

router.all("/*", function(req, res, next) {
  if (req.method.toLowerCase() !== "options") {
    return next();
  }
  return res.send(204);
});

router.get('/', function(req, res, next) {
  Class.find(function(err, cars) {
    res.json(cars);
  });
});

router.get('/years/:year/:make', function(req, res, next) {
  var make = req.params.make;
  var year = req.params.year;
  Class.find({"make": make, "year": year}, function(err, classes) {
    res.json(classes);
  });
});

router.get('/car/:make/:model/:year', function(req, res, next) {
  var make = req.params.make;
  var model = req.params.model;
  var year = req.params.year;
  Class.find({"make": make, "model": model, "year": year}, function(err, classes) {
    res.json(classes);
  });
});

router.post('/cars', function(req, res, next) {
  console.log(req.body);
  var make = req.body.make;
  var model = req.body.model;
  var year = req.body.year;
  var scca_class = req.body.scca_class;

  new Class({
    make: make,
    model: model,
    year: year,
    scca_class: scca_class
  }).save(function(err, data) {
    if (err) { console.error(err); }
    else {
      console.log('Saved: ', data);
      res.end();
    }
  });

});

module.exports = router;
