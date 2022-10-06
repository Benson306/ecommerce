let mongoose = require('mongoose');

let cartSchema = new mongoose.Schema({
    user_id:String,
    items_id: [String]
})

let Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;