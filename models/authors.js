const mongoose = require('mongoose');
//const userModel = require('../models/users')
const authorSchema = new mongoose.Schema({
    author:{
        type:String,
        required: true,
        max: 20,
        unique: true
    },
    firstName: {
        type: String,   //tipo
        required: true, //obbligatorio
        max: 255,
        unique: true        //dimensione massima
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
        default:Date.now()
    },
    avatar:{
        type: String,
        required: false,
    },
    postedBooks:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'bookModel',
            default: []
        }
    ]
}, //options
{
    timestamps:true,
    strict:true
})

module.exports = mongoose.model('authorModel',authorSchema,'authors')
// authorSchema.pre('save',async function  (next)  {
//     const firstName = this
//     const existingUser = await userModel.findeOne()
//     if (existingUser) return
// })
