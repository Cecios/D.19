const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/users') 
//MIDDLEWARE
const logger = require('../middleware/logger')


router.post('/login', logger,  async (request, response)=>{

    try{
        const user = await userModel.findOne({
            email: request.body.email
        })
        if (!user){
        return  response
                .status(404)
                .send({
                    statusCode:404,
                    message:'User does not exists'
                })
        }
        const isPasswordValid = await bcrypt.compare(request.body.password, user.password)
        if(!isPasswordValid){
        return  response
                .status(401)
                .send({
                    statusCode:401,
                    message:'Email or Password is not valid'
                })
        }
        const token = jwt.sign({
            userName: user.userName,
            email: user.email,
            role: user.role
        },process.env.SECRET_KEY,
        {
            expiresIn:'15m'
        }
        )
        response.setHeader('authorization',token)
            .status(200)
            .send({
                message:'Login successfully done',
                statusCode:200,
                token
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


