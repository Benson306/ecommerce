let mongoose = require('mongoose');

let deliverySchema = new mongoose.Schema({
    location: String,
    county: String
})

let Delivery = mongoose.model('locations', deliverySchema)

module.exports = Delivery;
