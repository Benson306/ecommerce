let mongoose = require('mongoose');

let adminSchema = new mongoose.Schema({
    email: String,
    password: String,
})

let Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;