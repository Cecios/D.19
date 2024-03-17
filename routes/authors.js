const express = require('express')
const router = express.Router();
const authorModel = require('../models/authors.js')

/// GET ///
router.get('/Author', async (request, response)=>{
    //PAGING
    const {page = 1, pagSize = 5} = request.query 
    const totalUser = await authorModel.countDocuments(); // conta quanti file ci sono nella collection
    try{
        const authors = await authorModel.find()
        .limit(pagSize)
        .skip((page-1) * pagSize)
        .sort({firstName: -1})
        response
            .status(200)
            .send({
                currentPage: +page,
                totalPag: Math.ceil(totalUser / pagSize),
                authors
            })
    }catch (e) {
        response
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal server Error'
            })
    };
})

router.get('/Author/:birthDay', async (request,response)=>{
    const {birthDay} = request.params

    try{
        const authorByBirthday = await authorModel.find({
            birthDay:{          // stiamo lavorando sulla proprietà birthday dell'oggetto
                $gte: birthDay, // >= 
            } 
        })
        response
        .status(200)
        .send(authorByBirthday)
    }catch(e){
        response
        .status
        .send({
            statusCode: 500,
            message:'Internal Server Error'
        })
    }
})

router.get('/Author/byName/:query', async (request, response)=>{
    const {query} = request.params
    try{
        const author = await authorModel.find({
            surName: {
                $regex: '.*'+query+'.*',
                //$gte: min
                $options:'i',
            }
        })
        if (!author) {
            return response
                .status(404)
                .send({
                    statusCode:404,
                    message:'User not found with given query'
                })
        }
        response
            .status(200)
            .send(author) 
    }catch (e){
        response
            .status(500)
            .send({
                statusCode:500,
                message: 'Internal Server Error'
            })
        
    }
})

router.get('/Author/:id',async (request,response)=>{
    const {id} = request.params
    try{
        const author = await authorModel.findById(id)
        if (!author) {
            return response
                .status(404)
                .send({
                    statusCode:404,
                    message:'The requested user does not exists'
                })
        }
            response
                .status(200)
                .send(author)
    }catch(e){
        response
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal server Error'
            })
    }
})
/// PATCH ///
router.patch('/Author/:id',async (request, response) =>{
    const {id} = request.params
    try{
        const author = await authorModel.findById(id)
        if (!author) {
            return response
                .status(404)
                .send({
                    statusCode:404,
                    message:'The requested user does not exists'
                })
        }
        const updateAuthor = request.body
        const options = {new: true};

        const result = await authorModel.findByIdAndUpdate(id,updateAuthor,options)
        response
            .status(200)
            .send(result)

    }catch(e){
        response
        .status(500)
        .send({
            statusCode: 500,
            message: 'Internal server Error'+e
        })
    }
})
/// DELETE ///
router.delete('/Author/:id',async (request, response) =>{
    const {id} = request.params
    try{
        const author = await authorModel.findByIdAndDelete(id)
            response
                .status(200)
                .send(author.firstName)
    }catch(e){
        response
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal server Error'+e
            })
    }
})
/// POST ///
router.post('/Author', async (request,response)=>{
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
                message:'Internal server Error'+e
            })
    }
})

module.exports = router; 
