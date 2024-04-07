const express = require('express');
const router = express.Router();
const booksModel = require('../models/books');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');

require('dotenv').config();
// configurazione cloudinary
cloudinary.config({
    cloud_name: 'dnr7aderm',
    api_key: '131381732122523',
    api_secret: 'OuHpYKrQcfpCWD62HMz15t38cCY'
})

const internalStorage = multer.diskStorage({
    //1 destinazione dei file *cb callback
    destination: (req,file,cb) =>{
        cb(null,'uploads') //null, nome cartella
    },
    fileFilter: (req,file,cb) => {
        if (file.mimetype === 'image/png') {
            throw new Error('Non si può!')
        }
    },
    //2 assegnazione nome: filename
    filename:(req,file,cb) =>{
        const uniqueSuffix = Date.now() + '-'+Math.round(Math.random() * 1E9); // Suffisso unico 
        
        const fileExtension = file.originalname.split('.').pop() //recuperare l'estensione del file. Si splitta al . ed elimina gli spazi
        cb(null,`${file.fieldname}-${uniqueSuffix}.${fileExtension}`) //il nome del file è composto da:
        //nome del file(pippo.jpg) - suffisso.estensione
    }
})

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: 'AR01',
        format: async (req, file ) => 'png', //Si può anche omettere
        public_id: (req, file) => file.name
    }
})

const cloudUpload = multer({storage: cloudStorage})
//ROTTA DEDICATA PER L'UPLOAD DEI FILE SU CLOUDINARY
router.post('/file/uploadFile', cloudUpload.single('cover'),async (request, response) => {
    try{
        response
        .status(200)
        .json({ source: request.file.path })
    }catch(e){
        response
        .status(500)
        .send({
            statusCode:500,
            message:'Server Error (Uploading failed)'
        })
    }
})
const upload = multer({storage: internalStorage})// usa come storage lo Storage appena sopra configurato
//ROTTA DEDICATA PER L'UPLOAD DEI FILE
                                        //Nella stringa ci va il name dell'input di tipo file che ci sarà nel frontend
router.post('/file/uploadFile', upload.single('cover'), async (request, response) => {
    
    const url = request.protocol +'://' + request.get('host') //url dinamico
//                            https://pippo.com
    try{
        const fileUrl = request.file.filename // all'interno dell'oggetto file riceveremo il nostro file dal fe: 
//                                               il nome del file che stiamo caricando
        response
        .status(200)
        .json({source: `${url}/uploads/${fileUrl}` })
    }catch(e){
        response
        .status(500)
        .send({
            statusCode:500,
            message:'Server Error (Uploading failed)'
        })
    }
})

// GET
router.get('/books', async (request, response) => {
    const {page = 1, pagSize = 3} = request.query
    const totalBooks = await booksModel.countDocuments()
    try{
        const books = await booksModel.find()
        .limit(pagSize)
        .skip((page -1)*pagSize)
        response
        .status(200)
        .send({
            statusCode:200,
            currentPage: page,
            pagSize,
            totalPages:Math.ceil(totalBooks/pagSize),
            totalBooks,
            books
        })
    }catch(e){
        response
        .status(500)
        .send({
            statusCode:500,
            message:'Internal Server Error' + e
        })        
    }
});
router.post('/books', async (request, response) => {
    const newBoook = new booksModel({
        title: request.body.title,
        category: request.body.category,
        author: request.body.author,
        cover: request.body.cover,
        price: Number(request.body.price),
        description: request.body.description
    })
    try{
        const bookSave = await newBoook.save()
        response
        .status(201)
        .send({
            statusCode:201,
            payload: bookSave,
        })
    }catch(e) {
        response
        .status(500)
        .send({
            statusCode: 500,
            message:'Internal Server Error' + e
        })
    }
})
module.exports = router;