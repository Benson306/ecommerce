let mongoose = require('mongoose');


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

module.exports = Product;