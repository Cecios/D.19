const express = require('express');   // è uguale a import express from 'express'
const mongoose = require('mongoose');
require('dotenv').config(); // richiedo la libreria dotenv


const PORT = 3030; //Creo la porta dove mettere in ascolto il server
const app = express();

//4 IMPORT ROUTES
const usersRoute = require('./routes/users');
//3 MIDDLEWARE
app.use(express.json()) // è un parse che si interpone tra la request e la response

app.use('/',usersRoute)

//2 DEFINIAMO GLI ENDPOINT

app.get('/authors',(request,response)=>{
    response.status(200).send({
        title:'Andrea',
        isServerActive:true
    })
})
app.post('/createUser',(request,response)=>{

})
app.patch('/updateUser',(request,response)=>{
    
})
app.delete('/deleteUser',(request,response)=>{
    
})
//1 CONNESSIONE DATABASE
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on('error',console.error.bind(console,'Db connection error!')) // Ascolto di eventuali errori
db.once('open', ()=>{console.log('Database successfully connected');})//Ascolto di connessione avvvenuta


app.listen(PORT,()=> console.log(`Server connected and listening on port ${PORT}`))//Metto il mio server in ascolto su una porta --> http://localhost:3030