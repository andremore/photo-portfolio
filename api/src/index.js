const { PrismaClient } = require('@prisma/client');
const { v4: uuid } = require('uuid');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const prisma = new PrismaClient();
const transport = require('./configs/email.js');
const mime = require('mime-types');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../frontend/public/media');
    },
    filename: function (req, file, cb) {
        const fileName = uuid() + '.' + mime.extension(file.mimetype);

        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

const app = express();

// ! app.use(express.static('public'));

app.use(express.json({ limit: '50mb' }));
app.use(express.json({ extended: false, limit: '50mb' }));
app.use(
    express.urlencoded({
        limit: '50mb',
        extended: false,
        parameterLimit: 50000,
    })
);

app.use(
    cors({
        origin: '*',
    })
);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// AdminProjects
app.get('/projects', async (req, res, next) => {
    const projects = await prisma.project.findMany({
        include: {
            photos: true,
        },
    });

    res.json(projects);
});

app.post('/projects', upload.array('photo'), async (req, res, next) => {
    const { title, description, category, state, photos, video } = req.body;

    const project = await prisma.project.create({
        data: {
            title,
            description,
            category,
            state,
            photos: {
                create: [{ photo: req.files[0].path }],
            },
            // videos: {
            //     create: [{ video: req.files[1].path }],
            // },
        },
    });

    res.json(project);
});

app.get(`/project/:id`, async (req, res, next) => {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
        where: { id: Number(id) },
        include: {
            photos: true,
        },
    });

    res.json(project);
});

app.delete(`/project/:id`, async (req, res, next) => {
    const { id } = req.params;

    const deleteProject = await prisma.project.delete({
        where: { id: Number(id) },
    });

    res.json(deleteProject);
});

app.put(`/project/:id`, async (req, res) => {
    const { title, description, category, photos, videos } = req.body;
    const { id } = req.params;
    const project = await prisma.project.update({
        where: { id: Number(id) },
        data: {
            title,
            description,
            category,
            photos,
            videos,
        },
    });
    res.json(project);
});

// Videos
app.get('/videos', async (req, res, next) => {
    const videos = await prisma.video.findMany();
    res.json(videos);
});

app.get(`/video/:id`, async (req, res, next) => {
    const { id } = req.params;
    const video = await prisma.video.findUnique({
        where: { id: Number(id) },
    });

    res.json(video);
});

// Photos
app.get('/photos', async (req, res, next) => {
    const photos = await prisma.photo.findMany();
    res.json(photos);
});

app.get(`/photo/:id`, async (req, res, next) => {
    const { id } = req.params;
    const photo = await prisma.photo.findUnique({
        where: { id: Number(id) },
    });

    res.json(photo);
});

app.post('/contact', (req, res, next) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: email,
        subject: subject,
        text: 'Name: ' + name + ' ' + 'Message: ' + message,
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: %s', info.messageId);
        }
    });
});

const server = app.listen(8000, () =>
    console.log(`
🚀 Server ready at: http://localhost:8000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
