let express = require('express');
let app = express.Router();

let bodyParser = require('body-parser');
let urlEncoded = bodyParser.urlencoded({extended: false});

let Address = require('../models/AddressModel');

app.get('/address', function(req,res){
    Address.find({userId: req.session.userId}, function(err, data){
        if(data.length !== 0){
            res.status(200).json(data[0])
        }else{
            res.status(200).json('failed');
        }
        
    });
});

app.get('/address/:id', function(req,res){
    Address.find({userId: req.params.id}, function(err, data){
        if(data.length !== 0){
            res.status(200).json(data[0])
        }else{
            res.status(200).json('failed');
        }
        
    });
});


app.post('/add_address', urlEncoded, function(req,res){
    let user = {
        userId : req.session.userId
    }
    let data ={ ...user, ...req.body}
    Address(data).save(function(err, data){
        res.status(200).json('success')
    })
});

app.put('/edit_address/:id', urlEncoded, function(req,res){
    Address.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err,data){
        res.status(200).json('success')
    })
});

module.exports = app;