const cloudinary = require('cloudinary').v2;

const cloudinaryConfig = cloudinary.config({
    cloud_name: '<YOUR_CLOUD_NAME>',
    api_key: '<YOUR_API_KEY>',
    api_secret: '<YOUR_API_SECRET>',
});

module.exports = cloudinaryConfig;
