const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
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
        type: Image,
        required: false,
    }
}, //options
{
    timestamps:true,
    strict:true
})
module.exports = mongoose.model('userModel',userSchema,'users')