let express = require('express');
let app = express.Router();

let bodyParser =  require('body-parser');
let urlEncoded = bodyParser.urlencoded({extended: false});

let Order = require('../models/OrdersModel');
let Cart = require('../models/CartModel');

app.post('/add_order', urlEncoded, function(req, res){
    Order({ user_id: req.session.userId , items: req.body, completion_status: 'pending',delivery_status: 'pending', delivery_cost: 200}).save(function(err,data){
        
        Cart.findOneAndRemove({user_id: req.session.userId},function(err1, data1){
            res.json(data._id);
        })
    })
})

app.get('/get_order/:id', function(req,res){
    Order.findById(req.params.id, function(err, data){
        res.json(data);
    })
})

app.get('/my_order', function(req,res){
    Order.find({user_id: req.session.userId}, function(err, data){
        res.json(data);
    })
})

app.get('/all_orders', function(req,res){
    Order.find({}, function(err, data){
        res.json(data);
    })
})

app.get('/pending_orders', function(req, res){
    Order.find({$and: [{delivery_status: 'pending'}, {completion_status: 'completed'}]}, function(err, data){
        res.json(data);
    })
})

app.get('/delivered_orders', function(req, res){
    Order.find({delivery_status: 'delivered'}, function(err, data){
        res.json(data);
    })
})

function getTOdayDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

app.get('/set_delivery/:id', function(req, res){

    let today = getTOdayDate();

    Order.findByIdAndUpdate({_id: req.params.id},{delivery_status: 'delivered', delivery_date: today}, function(err,data){
        res.json(data);
    })
})

app.get('/order_count/:type', function(req, res){
    Order.count({delivery_status: req.params.type}, function(err, count){
        res.json(count);
    })
})

module.exports = app;