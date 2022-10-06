let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
let urlEncoded = bodyParser.urlencoded({extended: false});

let Categories = require('../models/CategoriesModel');

router.get('/categories', function(req, res){
    Categories.find({}, function(err, data){
        if(err){
            res.json(err)
        }else{
            res.json(data)
        }
        
    })
})

router.get('/categories/:id', urlEncoded, function(req, res){
    Categories.findById(req.params.id, function(err, data){
        if(err){
            res.json(err)
        }else{
            res.json(data)
        }
        
    })
})

router.post('/add_categories', urlEncoded, function(req, res){
    Categories(req.body).save(function(err, data){
        if (err) throw (err);
        res.json({data: "success"})
    })
})

router.put('/edit_categories/:id', urlEncoded ,function(req,res){
    Categories.findByIdAndUpdate(req.params.id, req.body ,{new: true},  function(err, data){
        if (err) throw (err)
        res.json(data)
    })
})

router.delete('/del_categories/:id', function(req, res){
    Categories.findByIdAndDelete(req.params.id,function(err, data){
        res.json(data)
    })
})

module.exports = router;
