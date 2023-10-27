const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
     title : {type : String ,required: true},
    categorie: {type : String ,required: true},
    dateCreation: {type : String,required: true},
    img: {type : String ,required: true},
     nbpages: {type : Number,required: true}

})

module.exports = mongoose.model('Book', bookSchema);