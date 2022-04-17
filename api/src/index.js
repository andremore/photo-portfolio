const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use(
    cors({
        origin: '*',
    })
);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.get('/', (req, res, next) => {
    return res.json('Hello');
});

// Projects
app.get('/projects', async (req, res, next) => {
    const projects = await prisma.project.findMany();
    res.json(projects);
});

app.post('/projects', async (req, res, next) => {
    const { title, description, category, photos, videos, projects } = req.body;

    const projectData = projects
        ? projectData.map((project) => {
              return {
                  title: project.title,
                  description: project.description,
                  category: project.category,
                  state: project.state,
                  photos: project.photos,
                  videos: project.videos,
              };
          })
        : [];

    const result = await prisma.project.create({
        data: {
            title,
            description,
            category,
            photos,
            videos,
        },
    });

    res.json(result);
});

app.get(`/project/:id`, async (req, res, next) => {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
        where: { id: Number(id) },
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
    const { title, description, category, photos, videos, projects } = req.body;
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

const server = app.listen(8000, () =>
    console.log(`
🚀 Server ready at: http://localhost:8000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
