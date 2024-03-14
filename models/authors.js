const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,   //tipo
        required: true, //obbligatorio
        max: 255        //dimensione massima
    },
    surName: {
        type: String,
        required: true,
        max: 255
    },
    email:{
        type: String,
        required: true,
    },
    birthDay: {
        type: Date,
        required: false,
    },
    avatar:{
        type: String,
        required: false,
    }
}, //options
{
    timestamps:true,
    strict:true
})
module.exports = mongoose.model('authorModel',authorSchema,'authors')