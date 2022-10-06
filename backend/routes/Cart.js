let express= require('express');
let app = express.Router();

let bodyParser = require('body-parser');
let urlEncoded = bodyParser.urlencoded({extended: false});

let Cart = require('../models/CartModel');
let Product = require('../models/ProductsModel');

app.get('/cart', function(req, res){
    Cart.find({user_id: req.session.userId}, function(err, data){
        if(data.length === 0){
            res.json(data);
        }else{
            Product.find({_id : data[0].items_id}, function(err, dt){
                res.json(dt);
            })
        }

        });
});

app.delete('/remove_cart/:id', urlEncoded, function(req, res){
    Cart.findOneAndUpdate({user_id: req.session.userId}, {$pull: {items_id: req.params.id} }, function(data,err){
        res.json('deleted');
    });
})


app.post('/add_cart', urlEncoded, function(req, res){
    Cart.find({$and: [ {user_id: {$eq: req.session.userId}}, {items_id: {$in : [req.body.item_id]} } ]  }, function(err, data){
    if(data.length === 0){
        Cart.findOneAndUpdate({user_id: req.session.userId}, {$push: {items_id: req.body.item_id} }, {new:true, upsert:true}, function(data,err){
            res.json('sent');
        });
    }else{
        res.json('exists');
    }
})
})

module.exports = app;