const express = require('express');
const cors = require('cors');
const app = express();

const projectsRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');

const path = require('path');

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

app.get('/favicon.ico', (req, res) => {
    // Use actual relative path to your .ico file here
    res.sendFile(path.resolve(__dirname, '../favicon.ico'));
});

app.use('/', [contactRoutes, projectsRoutes, authRoutes]);

app.listen(8000, () =>
    console.log(`🚀 Server ready at: http://localhost:8000`)
);
