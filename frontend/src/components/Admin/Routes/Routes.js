import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../Dashboard/Dashboard';
import { Navbar } from '../Navigation/Navbar';
import { CreateProject } from '../Projects/CreateProject';
import { ProjectDetails } from '../Projects/ProjectDetails';

export const AdminRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="admin" element={[<Navbar />, <Dashboard />]}>
                    <Route path="projects" element={<Dashboard />} />
                </Route>
                <Route
                    path="admin/create-project"
                    element={[<Navbar />, <CreateProject />]}
                />
                <Route
                    path="admin/project/:id"
                    element={[<Navbar />, <ProjectDetails />]}
                />
            </Routes>
        </BrowserRouter>
    );
};
