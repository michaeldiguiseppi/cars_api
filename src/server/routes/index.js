var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/cars');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  // we're connected!
  var carsSchema = new Schema({
    car: {
      make: String,
      model: String,
      scca_class: String,
      year: Number
    }
  });
  var Car = mongoose.model('Car', carsSchema);
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
