var fs = require('fs');

const multer = require('multer');
var path = require('path');
const helpers = require('./helpers');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const uploadImage = function (request, response, next) {
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('product-pic');
    upload(request, response, function (err) {

        if (request.fileValidationError) {
            return response.send(request.fileValidationError);
        }
        else if (!request.file) {
            return response.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return response.send(err);
        }
        else if (err) {
            return response.send(err);
        }

        response.send({
            "image_name": request.file.filename,
            "image_full_path": request.file.path,
            "view_image": "http://localhost:3000/images/" + request.file.filename

        });
    });
}



module.exports = { uploadImage };