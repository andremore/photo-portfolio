const projectsRoutes = require('../routes/projects');
const supertest = require('supertest');
const requestWithSupertest = supertest(projectsRoutes);

describe('Projects Endpoints', () => {
    it('GET /projects should show all projects', async () => {
        const res = await requestWithSupertest.get('/projects');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toEqual(expect.arrayContaining(res.body));

        res.body.forEach((project) => {
            expect(project).toHaveProperty('id');
            expect(project).toHaveProperty('title');
            expect(project).toHaveProperty('category');
            expect(project).toHaveProperty('createdAt');
            expect(project).toHaveProperty('state');
        });
    });
});
