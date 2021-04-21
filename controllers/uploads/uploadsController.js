var fs = require('fs');
var loadevn = require('dotenv').config();
const multer = require('multer');
var path = require('path');
const helpers = require('./helpers');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/ads');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const adUpload = function (request, response, next) {
    let uploader = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, `public/images/${request.params.path}`);
            },
            // By default, multer removes file extensions so let's add them back
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            }
        }),
        fileFilter: helpers.imageFilter
    })
        .array('pic', 10);
    uploader(request, response, function (err) {
        if (request.fileValidationError) {
            return response.send(request.fileValidationError);
        } else if (!request.files) {
            return response.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            return response.send(err);
        } else if (err) {
            return response.send(err);
        }
        response.send({
            "image_name": request.files.map((element, index) => {
                return element.filename

            }),
            "image_full_path": request.files.map((element, index) => {
                return element.path.replace(/\\/g, "/")

            }),
            "view_image": request.files.map((element, index) => {
                return `http://localhost:${process.env.PORT}/images/${request.params.path}/` + element.filename

            }),
        });
    });
}
module.exports = { adUpload };