let express = require('express');

let app = express.Router();

let bodyParser = require('body-parser');

let urlEncoded = bodyParser.urlencoded({extended: false});

let Admin = require('../models/AdminUsersModel');

app.get('/admins', function(req, res){
    Admin.find({}, function(err, data){
        res.json(data);
    })
})

app.get('/admin/:id', function(req, res){
    Admin.findById(req.params.id, function(err, data){
        res.json(data);
    })
})

app.post('/admins', urlEncoded, function(req, res){
    Admin.findOne({email: req.body.email}, function(err, data){
        if(data === null){
            Admin(req.body).save(function(err, data){
                res.json('saved');
            })
        }else{
            res.json('not saved');
        }
    })
    
})


app.put('/edit_admin/:id', urlEncoded, function(req,res){
    Admin.findByIdAndUpdate(req.params.id, req.body, function(err, data){
        if(data.length !== 0){
            res.json('edited');
        }
    })
})

app.delete('/del_admin/:id', urlEncoded, function(req, res){
    Admin.findByIdAndDelete(req.params.id, function(err, data){
        res.json('deleted');
    })
})

module.exports = app;