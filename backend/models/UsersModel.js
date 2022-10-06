let mongoose = require('mongoose');

let registerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String
});

let Register = mongoose.model('users', registerSchema);

module.exports = Register;