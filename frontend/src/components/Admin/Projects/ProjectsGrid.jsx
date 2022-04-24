import useFetch from '../../../Hooks/useFetch/useFetch';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import 'boxicons';

export const ProjectsGrid = () => {
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
        <section id="projectsGrid" className="grid grid-cols-3 container">
            {data.map((project) => (
                <div
                    className="bg-opacity-25 bg-slate-900 m-2 rounded-lg"
                    key={project.id}
                >
                    {/* Project Details */}
                    <div className="p-5">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-100">
                            {project.title}
                        </h1>
                        <h3 className="mb-2 text-gray-200 font-medium text-sm">
                            {project.category}
                        </h3>
                        <p className="mb-3 font-normal text-gray-300">
                            {project.description}
                        </p>
                        {/* View Project Button */}
                        <span
                            onClick={() =>
                                viewProjectHandler(project.id, project.title)
                            }
                            className="cursor-pointer inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-800 bg-green-400 rounded-lg"
                        >
                            View project
                            <box-icon
                                name="right-arrow-alt"
                                className="ml-2 -mr-1 w-4 h-4"
                                color="#1F2937"
                            ></box-icon>
                        </span>
                    </div>
                </div>
            ))}
        </section>
    );
};
