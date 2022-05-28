import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../Dashboard/Dashboard';
import { Navbar } from '../Navigation/Navbar';
import { CreateProject } from '../Projects/CreateProject';
import { ProjectDetails } from '../Projects/ProjectDetails';

export const AdminRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="admin"
                    element={[
                        <Navbar key="main-navbar" />,
                        <Dashboard key="dashboard" />,
                    ]}
                >
                    <Route path="projects" element={<Dashboard />} />
                </Route>
                <Route
                    path="admin/create-project"
                    element={[
                        <Navbar key="create-project-navbar" />,
                        <CreateProject key="create-project" />,
                    ]}
                />
                <Route
                    path="admin/project/:id"
                    element={[
                        <Navbar key="project-navbar" />,
                        <ProjectDetails key="project-details" />,
                    ]}
                />
                <Route
                    path="admin/auth"
                    element={[<Navbar key="auth-navbar" />]}
                />
            </Routes>
        </BrowserRouter>
    );
};
