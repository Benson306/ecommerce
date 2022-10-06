let mongoose = require('mongoose');

let addressSchema = new mongoose.Schema({
    type: String,
    county: String,
    pickup: String,
    specificAddr: String,
    userId: String
})

let Address = mongoose.model('addresses', addressSchema);

module.exports = Address;