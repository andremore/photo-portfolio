import useFetch from '../../../hooks/useFetch/useFetch';

export const Projects = () => {
    const { data, loading, error } = useFetch(
        'http://localhost:8000/projects/'
    );

    if (loading) return <h1>LOADING...</h1>;

    if (error) console.log(error);

    return (
        <main className="grid grid-cols-3 mx-auto gap-5">
            {data.map((project) => (
                <div key={project.id} className="bg-secondary-focus">
                    {/* Project Details */}
                    <div>
                        <h1>{project.title}</h1>
                        <h1>{project.category}</h1>
                        <p>{project.description}</p>
                        {/* View Project Button */}
                        <button
                        // onClick={() =>
                        //     viewProjectHandler(project.id, project.title)
                        // }
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
        </main>
    );
};
