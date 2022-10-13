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
app.use(cors({
    origin: ['http://localhost:3000', 'https://ecomm-test.onrender.com'],
    methods: ['GET','POST','DELETE', 'PUT'],
    credentials: true // enable set cookie
}));
app.use(express.static('src'));


let session = require('express-session');

let sessionStore = require('connect-mongodb-session')(session);
let store = new sessionStore({
    uri: mongoURI,
    collection:'userSessions'
});

app.enable('trust proxy')

app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    store: store,
    proxy: true,
    name: 'MyCoolWebAppCookieName', // This needs to be unique per-host.
    cookie: {
      secure: true, // required for cookies to work on HTTPS
      httpOnly: false,
      sameSite: 'none'
    }
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

let AdminController = require('./routes/Admin');
app.use('/', AdminController);

app.get('/auth', function(req,res){
    if(req.session.isAuth){
        res.status(200).json('success');
    }else{
        res.status(200).json('failed')
    }
});

app.get('/admin_auth', function(req,res){
    
    if(req.session.isAdmin){
        res.status(200).json('success');
    }else{
        res.status(401).json('failed')
    }
});

app.get('/admin_logout', urlEncoded, function(req,res){
    req.session.destroy(function(err){
        res.status(200).json('success');
    })
});

app.get('/logout', urlEncoded, function(req,res){
    req.session.destroy(function(err){
        res.status(200).json('success');
    })
});

port = process.env.PORT || 8001;
app.listen(port);

console.log("App is listening at "+port)