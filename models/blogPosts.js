const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    title: {
        type:String,
        required: true,
        max: 150
    },
    cover: {
        type:String,
        required:false,
        default: "https://picsum.photos/200/300"
    },
    readTime:
    {
            value:{type: Number, required:false, default:0},
            unit:{type:String,required:false}
    },
    author: 
    {
            name:{type:String, required: false},
            avatar:{type:String, required: false}
    }
    ,
    content:{
        type:String,
        required: true
    }
},
{
    timestamps: true,
    strict:true
})
module.exports = mongoose.model('blogPostModel',blogPostSchema,'blogPosts')