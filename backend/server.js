let express = require('express');

let app = express();

let bodyParser = require('body-parser');

let fs = require('fs');

let urlEncoded = bodyParser.urlencoded({extended: false});

app.use(express.json())

require('dotenv').config();

let mongoose= require('mongoose');
let mongoURI = process.env.Mongo_URI;

mongoose.connect(mongoURI);

const cors = require("cors");
app.use(cors());
app.use(express.static('src'));


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

let CategoriesController = require('./routes/Categories');

app.use('/', CategoriesController);


let ProductsController = require('./routes/Products');
app.use('/', ProductsController);


let DeliveryController = require('./routes/Delivery');
app.use('/', DeliveryController);

let UsersController = require('./routes/Users');
app.use('/', UsersController);

let AddressController = require('./routes/Address');
app.use('/', AddressController);

let CartController = require('./routes/Cart');
app.use('/', CartController);

let OrdersController = require('./routes/Orders');
app.use('/', OrdersController);

let StkController = require('./routes/Stk');
app.use('/', StkController);

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

app.listen(8001);