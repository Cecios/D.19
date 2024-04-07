const express = require('express')
const userModel = require('../models/users.js');
const router = express.Router();
const bcrypt = require('bcrypt')
const verified = require('../middleware/verifyToken.js')
//MIDDLEWARE
const validateUser = require('../middleware/validateUser.js')
// GET
router.get('/users',  verified, async (request, response) => {
    const {page=1,pagSize=5} = request.query
    const totalUser = await userModel.countDocuments()
    try{
        const getUsers = await userModel.find()
        .limit(pagSize)
        .skip((page-1)*pagSize)
        return response
            .status(200)
            .send(
                {
                    currentPage: + page,
                    totalUser,  
                    totalPage: Math.ceil(totalUser/pagSize),
                    getUsers
                }
                )
    }catch(e){
        return response
            .status(500)
            .send({
                statusCode:500,
                message: 'Internal server Error'
            })
    }
})
//POST
router.post('/register-user', validateUser, async (request, response) => {
    const salt = await bcrypt.genSalt(10) // --> complessita dell'algoritmo di cifratura
    const hashedPassword = await bcrypt.hash(request.body.password,salt)

    const newUser = new userModel({
        userName: request.body.userName,
        password: hashedPassword,
        email: request.body.email,
        age: Number(request.body.age),
        role: request.body.role,
    })
    try{
        const userSave = await newUser.save()
        response
            .status(201)
            .send({
                statusCode:201,
                payload: userSave,
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
//DELETE
router.delete('/users/:id', async (request, response) => {
    const {id} = request.params
    try{
        const user = await userModel.findByIdAndDelete(id)
        if(!user){
            response
                .status(404)
                .send({
                    statusCode:404,
                    message:'User does not exists'
                })
        }
        response
            .status(200)
            .send(user) 
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

