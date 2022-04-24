import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './Dashboard/Dashboard';
import { CreateProject } from './Projects/CreateProject';
import { ProjectDetails } from './Projects/ProjectDetails';
import { Navbar } from './Navigation/Navbar';
import './Dashboard/styles/Dashboard.css';

export const AdminRoutes = () => {
    return (
        <main className="grid grid-cols-12 max-w-screen">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route exact path="/admin" element={<Dashboard />} />
                    <Route
                        exact
                        path="/admin/create-project"
                        element={<CreateProject />}
                    />
                    <Route
                        exact
                        path="/admin/projects"
                        element={<Dashboard />}
                    />
                    <Route
                        path="/admin/project/:id"
                        element={<ProjectDetails />}
                    />
                </Routes>
            </BrowserRouter>
        </main>
    );
};
