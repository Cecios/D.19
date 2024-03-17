const express = require('express');
const router = express.Router();
const blogPostModel = require('../models/blogPosts.js')

// GET
router.get('/blogPosts', async (request, response)=> {
    const {page =1 , pagSize = 3} = request.query
    const totalBlogPosts = await blogPostModel.countDocuments()
    try{
        const blogPosts = await blogPostModel.find()
        .limit(pagSize)
        .skip((page-1)*pagSize)
        .sort({title: -1 })
            response
            .status(200)
            .send({
                currentPage:page,
                pagSize,
                totalPages: Math.ceil(totalBlogPosts/pagSize),
                totalBlogPosts,
                blogPosts
            })
    }catch(e){
        response
        .status(500)
        .send({
            statusCode:500,
            message:'Internal server error'
        })
    }
})
// POST
router.post('/blogPosts', async (request, response) => {

    const newBlogPost = new blogPostModel(
        {
        category: request.body.category,
        title: request.body.title,
        cover: request.body.cover,
        readTime: request.body.readTime,
        author: request.body.author,
        content: request.body.content,
    }
    )

    try{
        const blogPostSave = await newBlogPost.save()
        response
            .status(201)
            .send({
                statusCode:201,
                payload: blogPostSave,
            })
    }catch(e){
        response
            .status(500)
            .send({
                statusCode:500,
                message: 'Internal server Error'
            })
    }
})

module.exports = router; 