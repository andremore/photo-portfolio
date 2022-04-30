const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = (() => {
    const route = express();

    // Videos
    route.get('/videos', async (req, res, next) => {
        const videos = await prisma.video.findMany();
        res.json(videos);
    });

    route.get(`/video/:id`, async (req, res, next) => {
        const { id } = req.params;
        const video = await prisma.video.findUnique({
            where: { id: Number(id) },
        });

        res.json(video);
    });

    // Photos
    route.get('/photos', async (req, res, next) => {
        const photos = await prisma.photo.findMany();
        res.json(photos);
    });

    route.get(`/photo/:id`, async (req, res, next) => {
        const { id } = req.params;
        const photo = await prisma.photo.findUnique({
            where: { id: Number(id) },
        });

        res.json(photo);
    });

    return route;
})();
