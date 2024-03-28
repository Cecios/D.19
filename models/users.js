const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        min: 6,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    age:{
        type: Number,
        required:true
    },
    role:{
        type: String,
        required:true
    }
},
{
    timestamps: true,
    strict: true
}) 


module.exports = mongoose.model('userModel',userSchema,'users')