const express = require('express');   // è uguale a import express from 'express'
const mongoose = require('mongoose');
require('dotenv').config(); // richiedo la libreria dotenv
const logger = require('./middleware/logger.js')
const path = require('path');
const cors = require('cors');
const PORT = 3030; //Creo la porta dove mettere in ascolto il server
const app = express();

//4 IMPORT ROUTES
const authorsRoute = require('./routes/authors');
const blogPostRoute = require('./routes/blogPosts');
const usersRoute = require('./routes/users.js')
const loginRoute = require('./routes/login.js')
const booksRoute = require('./routes/books.js')
const emailRoute = require('./routes/sendEmail.js')
const githubRoute = require('./routes/gitHub.js')
//3 MIDDLEWARE
app.use(cors())
app.use(express.json()) // è un parse che si interpone tra la request e la response

//Servire cartella upload con express.static middleware
app.use('/uploads', express.static(path.join(__dirname,'./uploads')));

app.use(logger)
app.use('/', authorsRoute);
app.use('/', blogPostRoute);
app.use('/', usersRoute);
app.use('/', githubRoute)
app.use('/', loginRoute);
app.use('/', booksRoute);
app.use('/', emailRoute)

//2 DEFINIAMO GLI ENDPOINT


//1 CONNESSIONE DATABASE
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on('error',console.error.bind(console,'Db connection error!')) // Ascolto di eventuali errori
db.once('open', ()=>{console.log('Database successfully connected');})//Ascolto di connessione avvvenuta


app.listen(PORT,()=> console.log(`Server connected and listening on port ${PORT}`))//Metto il mio server in ascolto su una porta --> http://localhost:3030