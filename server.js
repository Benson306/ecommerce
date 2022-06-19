let express = require('express');

let app = express();

let bodyParser = require('body-parser');

let urlEncoded = bodyParser.urlencoded({extended: false});

app.use(express.json())

let mongoose= require('mongoose');

const cors = require("cors");
app.use(cors());


mongoose.connect('mongodb+srv://benson306:benson306@bencluster.axe8t.mongodb.net/ecommerce?retryWrites=true&w=majority');



let categoriesSchema = new mongoose.Schema({
    categ: String
});

let Categories = mongoose.model('categories', categoriesSchema);

app.get('/categories', function(req, res){
    Categories.find({}, function(err, data){
        if(err){
            res.json(err)
        }else{
            res.json(data)
        }
        
    })
})
app.get('/categories/:id', urlEncoded, function(req, res){
    Categories.findById(req.params.id, function(err, data){
        if(err){
            res.json(err)
        }else{
            res.json(data)
        }
        
    })
})

app.post('/add_categories', urlEncoded, function(req, res){
    Categories(req.body).save(function(err, data){
        if (err) throw (err);
        res.json({data: "success"})
    })
})

app.put('/edit_categories/:id', urlEncoded ,function(req,res){
    Categories.findByIdAndUpdate(req.params.id, req.body ,{new: true},  function(err, data){
        if (err) throw (err)
        res.json(data)
    })
})

app.delete('/del_categories/:id', function(req, res){
    Categories.findByIdAndDelete(req.params.id,function(err, data){
        res.json(data)
    })
})

let productsSchema = new mongoose.Schema({
    categ: String,
    prodName: String,
    prodDetails: String,
    features: String,
    weight: String,
    price: String,
    specifications: String,
    inBox: String
})

let Product = mongoose.model('products', productsSchema)

let multer = require('multer');
let path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'src/uploads')
    },
    filename: (req, file, cb)=>{
        //console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({
    storage: storage
});


app.post('/add_product', urlEncoded, function(req, res){
    console.log(req.body)
    // Product(req.body).save(function(err, data){
    //     if(err) throw err;
    //     res.send(JSON.stringify({"status": 200, "error": null, "response": "data"}));
    //     // res.json({data: "sent"})
    // // })
    res.json({"response":"sent"})
})

app.listen(8001)