const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dysskkm8w', 
    api_key: '479748397817745', 
    api_secret: 'xahHt-q5VyKQjfXrxP6o78vxK3A'
});

module.exports = cloudinary;