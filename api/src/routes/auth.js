const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = (() => {
    const route = express();
    route.use(express.json());

    // GET
    route.get('/auth', async (req, res) => {
        const users = await prisma.user.findMany();
        res.json(users);
    });

    route.get('/auth/id/:id', async (req, res) => {
        const id = req.params.id;
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
        });
        res.json(user);
    });

    // POST
    route.post('/auth', async (req, res) => {
        const { email, username, password, isAdmin } = req.body;

        const user = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: password,
                isAdmin: isAdmin,
            },
        });

        res.json(user);
    });

    // UPDATE
    route.put('/auth', async (req, res) => {
        const { id, email, username, password, isAdmin } = req.body;
        const updatedUser = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                email: email,
                username: username,
                password: password,
                isAdmin: isAdmin,
            },
        });

        res.json(updatedUser);
    });

    // DELETE
    route.delete('/auth/:id', async (req, res) => {
        const id = req.params.id;
        const deletedUser = await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });

        res.json(deletedUser);
    });

    return route;
})();
