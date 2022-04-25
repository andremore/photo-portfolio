import useFetch from '../../../hooks/useFetch/useFetch';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import 'boxicons';
import './styles/ProjectsGrid.css';

export const ProjectsGrid = () => {
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
        <section id="projectsGrid">
            {data.map((project) => (
                <div key={project.id}>
                    {/* Project Details */}
                    <div>
                        <h1>{project.title}</h1>
                        <h3>{project.category}</h3>
                        <p>{project.description}</p>
                        {/* View Project Button */}
                        <button
                            onClick={() =>
                                viewProjectHandler(project.id, project.title)
                            }
                        >
                            View project
                            <box-icon
                                name="right-arrow-alt"
                                color="#1F2937"
                            ></box-icon>
                        </button>
                    </div>
                </div>
            ))}
        </section>
    );
};
