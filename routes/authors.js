const express = require('express')
const router = express.Router();
const authorModel = require('../models/authors.js')

router.get('/getAuthor', async (request, response)=>{
    try{
        const authors = await authorModel.find()
        response
            .status(200)
            .send(authors)
    }catch (e) {
        response
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal server Error'
            })
    };
})

router.post('/createUser', async (request,response)=>{
    const newAuthor = new authorModel({
        firstName: request.body.firstName,
        surName: request.body.surName,
        email: request.body.email,
        birthDay: request.body.birthDay,
        avatar: request.body.avatar,
    })

    try{
        const authorSave = await newAuthor.save()
        response
            .status(201)
            .send({
                statusCode: 201,
                payload: authorSave
            }) 
    }catch(e){
        response
            .status(500)
            .send({
                statusCode:500,
                message:'Internal server Error'
            })
    }

})

module.exports = router; 
