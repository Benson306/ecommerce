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


app.get('/set_delivery/:id', function(req, res){
    console.log('reached')
    let today = getTOdayDate();

    Order.findByIdAndUpdate({_id: req.params.id},{delivery_status: 'delivered', delivery_date: today}, function(err,data){
        res.json(data);
    })
})

module.exports = app;