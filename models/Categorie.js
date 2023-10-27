const mongoose = require('mongoose');

const CategorieSchema = mongoose.Schema({
    title : {type: 'String',required:true},
    imgcategorie : {type: 'String', required:true},


})

module.exports = mongoose.model('Categorie', CategorieSchema);