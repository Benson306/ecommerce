let express = require('express');

let app = express();

let bodyParser = require('body-parser');

let fs = require('fs');

let urlEncoded = bodyParser.urlencoded({extended: false});

app.use(express.json())

let mongoose= require('mongoose');
let mongoURI = 'mongodb+srv://benson306:benson306@bencluster.axe8t.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.connect(mongoURI);

const cors = require("cors");
app.use(cors());
app.use(express.static('src'));

require('dotenv').config();


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


let session = require('express-session');

let sessionStore = require('connect-mongodb-session')(session);
let store = new sessionStore({
    uri: mongoURI,
    collection:'userSessions'
});

app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    store: store
}))

let isAuth = function(req, res, next){
    if(req.session.isAuth){
        next();
    }else{
        res.redirect('/login');
       // res.json('Not Authorised')
    }
}

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
});

app.put('/edit_pic1/:id', upload.single('file1'), function(req, res){

    let preview1 = req.file.filename;

    Product.findById(req.params.id, function(err, item){
        fs.unlink(`src/uploads/${item.preview1}`, function(err){
            if(err){
                console.log('not deleted')
            }
        })

        Product.findByIdAndUpdate(req.params.id,{"preview1":preview1} ,{new:true},function(err,data){
            res.json(data)
        })
    })
    
})
app.put('/edit_pic2/:id', upload.single('file2'), function(req, res){

    let preview2 = req.file.filename;

    Product.findById(req.params.id, function(err, item){
        fs.unlink(`src/uploads/${item.preview2}`, function(err){
            if(err){
                console.log('not deleted')
            }
        })

        Product.findByIdAndUpdate(req.params.id,{"preview2":preview2} ,{new:true},function(err,data){
            res.json(data)
        })
    })
    
})
app.put('/edit_pic3/:id', upload.single('file3'), function(req, res){

    let preview3 = req.file.filename;

    Product.findById(req.params.id, function(err, item){
        fs.unlink(`src/uploads/${item.preview3}`, function(err){
            if(err){
                console.log('not deleted')
            }
        })

        Product.findByIdAndUpdate(req.params.id,{"preview3":preview3} ,{new:true},function(err,data){
            res.json(data)
        })
    })
    
})
app.put('/edit_pic4/:id', upload.single('file4'), function(req, res){

    let preview4 = req.file.filename;

    Product.findById(req.params.id, function(err, item){
        fs.unlink(`src/uploads/${item.preview4}`, function(err){
            if(err){
                console.log('not deleted')
            }
        })

        Product.findByIdAndUpdate(req.params.id,{"preview4":preview4} ,{new:true},function(err,data){
            res.json(data)
        })
    })
    
})

let deliverySchema = new mongoose.Schema({
    location: String,
    county: String
})

let Delivery = mongoose.model('locations', deliverySchema)

app.post('/delivery', urlEncoded, function(req, res){
    Delivery(req.body).save(function(err,data){
        res.json(data);
    })
})

app.get('/delivery', urlEncoded, function(req, res){
    Delivery.find({},function(err,data){
        res.status(200).json(data);
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

let registerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String
});

let Register = mongoose.model('users', registerSchema)

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

app.get('/auth', function(req,res){
    if(req.session.isAuth){
        res.status(200).json('success');
    }else{
        res.status(401).json('failed')
    }
});

app.get('/logout', urlEncoded, function(req,res){
    req.session.destroy(function(err){
        res.status(200).json('success');
    })
});

app.get('/profile', function(req,res){
    Register.findById(req.session.userId, function(err, data){
        res.status(200).json(data)
    })
});

app.put('/edit_profile', urlEncoded, function(req,res){
    Register.findByIdAndUpdate(req.session.userId, req.body, {new: true}, function(err,data){
        res.status(200).json('success');
    })
})

let addressSchema = new mongoose.Schema({
    type: String,
    county: String,
    pickup: String,
    specificAddr: String,
    userId: String
})

let Address = mongoose.model('addresses', addressSchema);

app.get('/address', function(req,res){
    Address.find({userId: req.session.userId}, function(err, data){
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

let cartSchema = new mongoose.Schema({
    user_id:String,
    items_id: [String]
})
let Cart = mongoose.model('cart', cartSchema);

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

app.get('/cart', function(req, res){
    Cart.find({user_id: req.session.userId}, function(err, data){
        if(data.length === 0){
            res.json('no items in cart');
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

let orderSchema =  new mongoose.Schema({
    user_id: String,
    items : [{ item_id: String, price: String, quantity: Number}],
    completion_status: String,
    delivery_status: String,
    delivery_cost: String,
    order_date: String,
    delivery_date: String
})

let Order = mongoose.model('orders', orderSchema);

app.post('/add_order', urlEncoded, function(req, res){
    Order({ user_id: req.session.userId , items: req.body, completion_status: 'pending'}).save(function(err,data){
        res.json(data._id);
    })
})

app.get('/get_order/:id', function(req,res){
    
})


app.listen(8001);