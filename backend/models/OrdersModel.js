let mongoose = require('mongoose');

let orderSchema =  new mongoose.Schema({
    user_id: String,
    items : [{}],
    completion_status: String,
    deliveryCounty: String,
    pickupPoint: String,
    delivery_status: String,
    delivery_cost: String,
    order_date: String,
    delivery_date: String,
    total: Number
})

let Order = mongoose.model('orders', orderSchema);

module.exports = Order;