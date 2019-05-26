//import multer from 'multer';
//import path from 'path';
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname )
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000000
    },
    fileFilter: function (req, file, cb) {
        sanitizeFile(file, cb);
    }
}).array('files', 12);

const uploadSingle = multer({
    storage: storage,
    limits: {
        fileSize: 1000000000
    },
    fileFilter: function (req, file, cb) {
        sanitizeFile(file, cb);
    }
}).single('file');

function sanitizeFile(file, cb) {
    // Define the allowed extension
    let fileExts = ['png', 'jpg', 'jpeg', 'gif', 'pdf', 'doc', 'docx']

    // Check allowed extensions
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());
    // Mime type must be an image
    let isAllowedMimeAppType = file.mimetype.startsWith("application/")
    let isAllowedMimeImgType = file.mimetype.startsWith("image/")

    if (isAllowedExt && (isAllowedMimeImgType || isAllowedMimeAppType)) {
        return cb(null, true) // no errors
    }
    else {
        // pass error msg to callback, which can be displaye in frontend
        cb('Error: File type not allowed!')
    }
};

exports.uploadFiles = (req, res) => {
    //res.send('done');
    upload(req, res, (err) => {
        if (err){
            console.log(err)
        }else{
            // If file is not selected
            if (req.files == undefined) {
                console.log('No file selected!')
            }
            else{
                let result = []
                for(let i=0; i < req.files.length; i++){
                    result.push(req.files[i].filename)
                }
                res.status(200).send(result)
            }

        }

    })
};

exports.uploadFile =(req,res) => {
    uploadSingle(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.status(200).send(req.file.filename)
    });
};