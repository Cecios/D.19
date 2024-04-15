const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        max: 30
    },
    category: {
        type: String,
        required: true,
        max: 20,
    },
    author:{
        // type: mongoose.Schema.Types.ObjectId, // è un objectId
        // ref: 'authorModel'//a che modello ci stiamo riferendo
        type: String,
        required: true,
        max: 20,
    },
    cover: {
        type:String,
        required:false,
        default: "https://picsum.photos/200/300",
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required:false,
    }
},
//options
{
    timestamps: true,
    strict:true
})
module.exports = mongoose.model('booksModel',bookSchema,'books');