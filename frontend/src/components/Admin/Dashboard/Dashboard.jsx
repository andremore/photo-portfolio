import { useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectsTable } from '../Projects/ProjectsTable';
import { ProjectsGrid } from '../Projects/ProjectsGrid';
import { gsap } from 'gsap';
import 'boxicons';
import './styles/Dashboard.css';

export const Dashboard = () => {
    const [projectsGrid, setProjectsGrid] = useState(false);
    const [projectsTable, setProjectsTable] = useState(true);

    const navigate = useNavigate();

    const gridRef = useRef();
    const tableRef = useRef();

    // const [enteredSearch, setEnteredSearch] = useState('');
    // const { search } = window.location;
    // const query = new URLSearchParams(search).get('s');

    const createProjectHandler = useCallback(
        () => navigate(`/admin/create-project`),
        [navigate]
    );

    // const searchHandler = (e) => {
    //     let searchFix = e.target.value.toLowerCase();
    //     setEnteredSearch(searchFix);
    // };

    const clickGridHandler = () => {
        setProjectsTable(false);
        setProjectsGrid(true);

        gsap.to(gridRef.current, {
            rotation: '+=360',
            duration: 0.155,
        });
    };

    const clickTableHandler = () => {
        setProjectsGrid(false);
        setProjectsTable(true);

        gsap.to(tableRef.current, {
            rotation: '+=360',
            duration: 0.155,
        });
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
                        <input
                            type="text"
                            placeholder="Search…"
                            // onChange={searchHandler}
                        />
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
                        <box-icon
                            id="tableButton"
                            name="table"
                            type="regular"
                            color="#F28C18"
                            ref={tableRef}
                        ></box-icon>
                    </button>
                    <button className="btn btn-sm" onClick={clickGridHandler}>
                        <box-icon
                            id="gridButton"
                            name="grid-alt"
                            type="regular"
                            color="#F28C18"
                            ref={gridRef}
                        ></box-icon>
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
