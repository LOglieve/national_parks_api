var mongoose = require('mongoose');
 
const ParkSchema = new mongoose.Schema({
    location: {
        country: String,
        iso_a2: String,
        lat: Number,
        lng: Number,
    },
    annotations: {
        name: String,
        native_name: String,
        counties: [String],
        area_sqkm: Number,
        area_sqmi: Number,
        formed: Date,
        sources: [String]

    }
});
 
module.exports = mongoose.model(
    'Park', ParkSchema, 'Parks');