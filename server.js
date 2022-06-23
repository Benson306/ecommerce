let express = require('express');

let app = express();

let bodyParser = require('body-parser');

let fs = require('fs');

let urlEncoded = bodyParser.urlencoded({extended: false});

app.use(express.json())

let mongoose= require('mongoose');

mongoose.connect('mongodb+srv://benson306:benson306@bencluster.axe8t.mongodb.net/ecommerce?retryWrites=true&w=majority');

const cors = require("cors");
app.use(cors());
app.use(express.static('src'));

let multer = require('multer');
let path = require('path');
const { url } = require('inspector');
const { access } = require('fs');

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
    inBox: String,
    preview1: String,
    preview2: String,
    preview3: String,
    preview4: String
})

let Product = mongoose.model('products', productsSchema)


app.get('/products', function(req, res){
    Product.find({}, function(err, data){
        res.json(data)
    })
})

app.get('/products/:id', urlEncoded, function(req, res){
    Product.findById(req.params.id, function(err, data){
        res.json(data)
    })
});


app.post('/add_product', urlEncoded, upload.fields([{name: 'file1',maxCount: 1}, { name: 'file2', maxCount: 1 }, { name: 'file3', maxCount: 1 }, { name: 'file4', maxCount: 1 }]),function(req, res){

    let preview1 = req.files.file1[0].filename;
    let preview2 = req.files.file2[0].filename;
    let preview3 = req.files.file3[0].filename;
    let preview4 = req.files.file4[0].filename;

    let data = JSON.parse(req.body.datas)

    let previews = { "preview1": preview1,"preview2": preview2, "preview3": preview3,"preview4": preview4}

    let oldData = { ...data, ...previews};

    Product(oldData).save(function(err, data){
        res.json(data);
    })

})


app.put('/edit_product/:id', urlEncoded, function(req, res){
    Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, data){
        res.json(data)
    })
})

app.delete('/del_products/:id', urlEncoded, function(req, res){
    Product.findById(req.params.id, function(err, item){
        fs.unlink(`src/uploads/${item.preview1}`, function(err){
            if(err){
                console.log('not deleted')
            }
        })
        fs.unlink(`src/uploads/${item.preview2}`, function(err){
            if(err){
                console.log('not deleted')
            }
        })
        fs.unlink(`src/uploads/${item.preview3}`, function(err){
            if(err){
                console.log('not deleted')
            }
        })
        fs.unlink(`src/uploads/${item.preview4}`, function(err){
            if(err){
                console.log('not deleted')
            }
        })

    })
    Product.findByIdAndRemove(req.params.id, function(err, data){
        res.json(data)
    })
})



app.listen(8001)