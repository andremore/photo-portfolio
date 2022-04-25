import useFetch from '../../../hooks/useFetch/useFetch';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import 'boxicons';
import './styles/ProjectsTable.css';

export const ProjectsTable = (props) => {
    const navigate = useNavigate();

    const viewProjectHandler = useCallback(
        (id, title) => navigate(`/admin/project/${id}`),
        [navigate]
    );

    const { data, loading, error } = useFetch(
        'http://localhost:8000/projects/'
    );

    if (loading) return <h1>LOADING...</h1>;

    if (error) console.log(error);

    return (
        <section id="projectsTable">
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Project Details */}
                    {data.map((project) => (
                        <tr
                            onClick={() =>
                                viewProjectHandler(project.id, project.title)
                            }
                            lucko={project.id}
                            key={project.id}
                        >
                            <th>{project.id}</th>
                            <th>{project.title}</th>
                            <th>{project.category}</th>
                            <th>{project.description}</th>
                            <th>{project.state}</th>
                            <th>
                                <box-icon name="cog" color="#4ADE80"></box-icon>
                            </th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};
