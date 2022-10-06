let mongoose = require('mongoose');

let orderSchema =  new mongoose.Schema({
    user_id: String,
    items : [{ item_id: String, price: String, quantity: Number}],
    completion_status: String,
    delivery_status: String,
    delivery_cost: String,
    order_date: String,
    delivery_date: String
})

let Order = mongoose.model('orders', orderSchema);

module.exports = Order;