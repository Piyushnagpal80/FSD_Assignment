// api creation

const express = require('express');
const user = express();

const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');


user.use(bodyParser.urlencoded({ extended:true }));

user.use(express.static(path.resolve(__dirname,'public')));

var storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./public/uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
});

var upload = multer({storage:storage});

const userController = require('../controllers/userController');
const User = require('../models/User');

user.post( '/importUser',upload.single('file'), userController.importUser );

user.get('/displayData', userController.displayData);

user.get('/search', userController.searchProjects);



module.exports = user;