import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectsTable } from '../Projects/ProjectsTable';
import { ProjectsGrid } from '../Projects/ProjectsGrid';
import 'boxicons';

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
        <>
            <main className="container col-start-3 col-end-12">
                {/* Header */}
                <header className="flex mx-auto justify-end">
                    {/* Search */}
                    <div className="flex align-middle mr-4">
                        <box-icon name="search" color="#FFFFFF"></box-icon>
                        <input
                            type="search"
                            placeholder="Search projects"
                            className="rounded-sm px-2 w-40"
                        ></input>
                    </div>
                    {/* Create Project */}
                    <button
                        className="text-gray-100 mr-5"
                        onClick={createProjectHandler}
                    >
                        Create new
                    </button>
                    {/* Change view to grid or table */}
                    <box-icon
                        name="table"
                        color="#4ADE80"
                        onClick={clickTableHandler}
                    ></box-icon>
                    <box-icon
                        name="grid-alt"
                        color="#4ADE80"
                        onClick={clickGridHandler}
                    ></box-icon>
                </header>
                {/* Projects table & grid components */}
                <div className="container">
                    {projectsTable ? <ProjectsTable /> : null}
                    {projectsGrid ? <ProjectsGrid /> : null}
                </div>
            </main>
        </>
    );
};
