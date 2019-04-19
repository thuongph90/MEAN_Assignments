var mongoose = require('mongoose');
require('../models/pet.js');

var Pet = mongoose.model('Pet'); //Any name is okay

module.exports={
    index: function(req, res){
        res.render('index');
    },
}