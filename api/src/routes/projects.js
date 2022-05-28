const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuid } = require('uuid');
const multer = require('multer');
const mime = require('mime-types');

module.exports = (() => {
    // ! app.use(express.static('public'));
    const route = express();
    route.use(express.json());

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../../../frontend/public/media');
        },
        filename: function (req, file, cb) {
            const fileName = uuid() + '.' + mime.extension(file.mimetype);

            cb(null, fileName);
        },
    });

    const upload = multer({ storage: storage });

    // Projects
    // 'GET'
    route.get('/projects', async (req, res, next) => {
        const projects = await prisma.project.findMany({
            include: {
                photos: true,
            },
        });

        res.json(projects);
    });

    // 'POST'
    route.post('/projects', upload.array('photo'), async (req, res, next) => {
        const { title, description, category, state, photos, video } = req.body;

        const project = await prisma.project.create({
            data: {
                title,
                description,
                category,
                state,
                // photos: {
                //     create: [{ photo: req.files[0].path }],
                // },
                // videos: {
                //     create: [{ video: req.files[1].path }],
                // },
            },
        });

        res.json(project);
    });

    // Single project
    // 'GET'
    route.get(`/project/:id`, async (req, res, next) => {
        const { id } = req.params;

        const project = await prisma.project.findUnique({
            where: { id: Number(id) },
            include: {
                photos: true,
            },
        });

        res.json(project);
    });

    // 'DELETE'
    route.delete(`/project/:id`, async (req, res, next) => {
        const { id } = req.params;

        const deleteProject = await prisma.project.delete({
            where: { id: Number(id) },
        });

        res.json(deleteProject);
    });

    // 'UPDATE'
    route.put(`/project/:id`, async (req, res) => {
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

    return route;
})();
