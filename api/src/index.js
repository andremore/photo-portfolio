const express = require('express');
const cors = require('cors');
const app = express();

const projectsRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');
const videosAndPhotosRoutes = require('./routes/videosAndPhotos');
const authRoutes = require('./routes/auth');

app.use(
    cors({
        origin: 'http://localhost:3000',
        allowedHeaders: ['content-type'],
        credentials: true,
    })
);

// app.use(cors({ origin: '*' }))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.use('/', [
    contactRoutes,
    projectsRoutes,
    videosAndPhotosRoutes,
    authRoutes,
]);

app.listen(8000, () =>
    console.log(`🚀 Server ready at: http://localhost:8000`)
);
