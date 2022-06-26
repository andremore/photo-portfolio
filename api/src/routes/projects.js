const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('../configs/cloudinary/cloudinary.js');

module.exports = (() => {
    const route = express();
    route.use(express.json());

    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'Photo Portfolio',
        },
        resource_type: 'auto',
    });

    const upload = multer({ storage: storage });

    // Projects
    // 'GET'
    route.get('/projects', async (req, res) => {
        const projects = await prisma.project.findMany({
            include: {
                media: true,
            },
        });

        res.json(projects);
    });

    route.get('/media', async (req, res) => {
        const media = await prisma.media.findMany({
            include: {
                project: true,
            },
        });

        res.json(media);
    });

    // 'POST'
    route.post('/projects', upload.array('media'), async (req, res) => {
        const { title, description, category, state } = req.body;

        const project = await prisma.project.create({
            data: {
                title,
                description,
                category,
                state,
                media: {
                    create: req.files.map((file) => {
                        return {
                            link: file.path,
                        };
                    }),
                },
            },
            include: { media: true },
        });

        res.json(project);
    });

    // 'GET'
    route.get(`/project/:id`, async (req, res) => {
        const { id } = req.params;

        const project = await prisma.project.findUnique({
            where: { id: Number(id) },
            include: {
                media: true,
            },
        });

        res.json(project);
    });

    // 'DELETE'
    route.delete(`/project/:id`, async (req, res) => {
        const { id } = req.params;

        const deleteProject = await prisma.project.delete({
            where: { id: Number(id) },
            include: {
                media: true,
            },
        });

        res.json(deleteProject);
    });

    // 'UPDATE'
    route.put(`/project/:id`, async (req, res) => {
        const { title, description, category, state } = req.body;
        const { media } = req.files;
        const { id } = req.params;

        const project = await prisma.project.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                category,
                state,
                media,
            },
        });
        res.json(project);
    });

    return route;
})();
