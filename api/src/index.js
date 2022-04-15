const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.json('Hello');
});

// Projects
app.get('/projects', async (req, res) => {
    const projects = await prisma.project.findMany();
    res.json(projects);
});

app.get(`/project/:id`, async (req, res) => {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
        where: { id: Number(id) },
    });

    res.json(project);
});

// Videos
app.get('/videos', async (req, res) => {
    const videos = await prisma.video.findMany();
    res.json(videos);
});

app.get(`/video/:id`, async (req, res) => {
    const { id } = req.params;
    const video = await prisma.video.findUnique({
        where: { id: Number(id) },
    });

    res.json(video);
});

// Photos
app.get('/photos', async (req, res) => {
    const photos = await prisma.photo.findMany();
    res.json(photos);
});

app.get(`/photo/:id`, async (req, res) => {
    const { id } = req.params;
    const photo = await prisma.photo.findUnique({
        where: { id: Number(id) },
    });

    res.json(photo);
});

const server = app.listen(3000, () =>
    console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
