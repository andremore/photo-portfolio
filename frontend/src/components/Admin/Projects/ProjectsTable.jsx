import useFetch from '../../../Hooks/useFetch/useFetch';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import 'boxicons';

export const ProjectsTable = (props) => {
    const navigate = useNavigate();

    const viewProjectHandler = useCallback(
        (id, title) => navigate(`/admin/project/${title}`),
        [navigate]
    );

    const { data, loading, error } = useFetch(
        'http://localhost:8000/projects/'
    );

    if (loading) return <h1>LOADING...</h1>;

    if (error) console.log(error);

    return (
        <section className="grid grid-cols-1" id="projectsTable">
            <table className="bg-opacity-25 bg-slate-900">
                <thead>
                    <tr className="text-gray-100 border-b-2 border-gray-500">
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
                            className="text-gray-100 cursor-pointer hover:bg-slate-700 border-b-2"
                            onClick={() =>
                                viewProjectHandler(project.id, project.title)
                            }
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
