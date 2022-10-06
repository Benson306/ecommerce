let mongoose = require('mongoose');

let stkSchema = new mongoose.Schema({}, { strict: false });

let Stk = mongoose.model('stk', stkSchema);

module.exports = Stk;