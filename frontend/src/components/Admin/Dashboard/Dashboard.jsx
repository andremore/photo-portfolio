import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectsTable } from '../Projects/ProjectsTable';
import { ProjectsGrid } from '../Projects/ProjectsGrid';
import 'boxicons';
import './styles/Dashboard.css';

export const Dashboard = () => {
    const [projectsGrid, setProjectsGrid] = useState(false);
    const [projectsTable, setProjectsTable] = useState(true);

    const navigate = useNavigate();

    const createProjectHandler = useCallback(
        () => navigate(`/admin/create-project`),
        [navigate]
    );

    const clickGridHandler = () => {
        setProjectsTable(false);
        setProjectsGrid(true);
    };

    const clickTableHandler = () => {
        setProjectsGrid(false);
        setProjectsTable(true);
    };

    return (
        <main>
            {/* Header */}
            <header>
                {/* Search */}
                <div className="form-control">
                    <div>
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <input type="text" placeholder="Search…" className="" />
                    </div>
                </div>
                {/* Create & Change view container */}
                <div>
                    {/* Create Project */}
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={createProjectHandler}
                    >
                        Create new
                    </button>
                    {/* Change view to grid or table */}
                    <button className="btn btn-sm" onClick={clickTableHandler}>
                        <box-icon name="table" color="#F28C18"></box-icon>
                    </button>
                    <button className="btn btn-sm" onClick={clickGridHandler}>
                        <box-icon name="grid-alt" color="#F28C18"></box-icon>
                    </button>
                </div>
            </header>
            {/* Projects table & grid components */}
            <div>
                {projectsTable && <ProjectsTable />}
                {projectsGrid && <ProjectsGrid />}
            </div>
        </main>
    );
};
