let express =  require('express');
let app = express.Router();

let bodyParser = require('body-parser');
let urlEncoded = bodyParser.urlencoded({extended: false});

let Register = require('../models/UsersModel');


app.post('/register', urlEncoded, function(req, res){
    Register.find({$or: [{email:{$eq :req.body.email}},{name: {$eq: req.body.name}},{phone: {$eq: req.body.phone}}]},function(err,data){
            if(data.length !== 0){
                res.status(409).json('exists');
            }else{
                Register(req.body).save(function(err, data){
                    res.status(200).json('registered')
                });
            } 
    })
    
});


app.post('/login', urlEncoded, function(req, res){
    Register.find({$and: [{email:{$eq: req.body.email}},{password:{$eq: req.body.password}}]}, function(err, data){
        if(data.length === 0){
            res.status(400).json('failed');
        }else{
            req.session.isAuth = true;
            req.session.userId = data[0]._id;
            res.status(200).json('success');
        }
    })
})

app.get('/profile', function(req,res){
    Register.findById(req.session.userId, function(err, data){
        res.status(200).json(data)
    })
});

app.get('/user_data/:id', function(req, res){
    Register.findById(req.params.id, function(err, data){
        res.status(200).json(data)
    })
})

app.put('/edit_profile', urlEncoded, function(req,res){
    Register.findByIdAndUpdate(req.session.userId, req.body, {new: true}, function(err,data){
        res.status(200).json('success');
    })
})

app.get('/count_users', function(req, res){
    Register.count({}, function(err, data){
        res.json(data);
    })
})

module.exports = app;