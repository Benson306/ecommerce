let mongoose = require('mongoose');

let categoriesSchema = new mongoose.Schema({
    categ: String
});

let Categories = mongoose.model('categories', categoriesSchema);

module.exports = Categories;