const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

const projectsRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');
const videosAndPhotosRoutes = require('./routes/videosAndPhotos');

app.use('/', [contactRoutes, projectsRoutes, videosAndPhotosRoutes]);

const server = app.listen(8000, () =>
    console.log(`🚀 Server ready at: http://localhost:8000`)
);
