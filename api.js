var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var ParkModel = require('./parkSchema');

const db = 'mongodb+srv://READER:xdac1ZawLEjxXWEs@national-api.1dftw.mongodb.net/national-parks?retryWrites=true&w=majority';

mongoose.Promise = global.Promise;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true}, function(error){
    if(error){
        console.log("Error! " + error);
    }
});

router.get('/national-parks',  (req, res) => {
    ParkModel.find((err, data) => {
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });
});

module.exports = router;