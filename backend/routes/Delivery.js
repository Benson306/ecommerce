let express = require('express');
let app = express.Router();

let bodyParser = require('body-parser');
let urlEncoded = bodyParser.urlencoded({extended: false});

let Delivery = require('../models/DeliveryModel');


app.get('/delivery', urlEncoded, function(req, res){
    Delivery.find({},function(err,data){
        res.status(200).json(data);
    })
})

app.post('/delivery', urlEncoded, function(req, res){
    Delivery(req.body).save(function(err,data){
        res.json(data);
    })
})

app.get('/delivery/:id', urlEncoded, function(req, res){
    Delivery.findById(req.params.id,function(err,data){
        res.json(data);
    })
})

app.delete('/del_delivery/:id', function(req, res){
    Delivery.findByIdAndDelete(req.params.id, function(err,data){
        res.json(data)
    })
})

app.put('/edit_delivery/:id', urlEncoded, function(req, res){
    Delivery.findByIdAndUpdate(req.params.id, req.body ,{new: true}, function(err,data){
        res.json(data);
    })
})

app.get('/county', urlEncoded, function(req, res){
    Delivery.find({},{_id:0, location:0, __v:0},function(err,data){
        res.status(200).json(data);
    })
});

app.get('/county/:name', urlEncoded, function(req, res){
    Delivery.find({county: req.params.name },{_id:0, county:0, __v:0},function(err,data){
        res.status(200).json(data);
    })
})

module.exports = app;