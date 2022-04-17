import './styles/Projects.css';
import { useState, useEffect } from 'react';
import { CreateProject } from './CreateProject';
import { api } from '../Api';

const Projects = (props) => {
    const [projects, setProjects] = useState([]);
    const [putTitle, setPutTitle] = useState('');
    const [putCategory, setPutCategory] = useState('PHOTO');
    const [putDescription, setPutDescription] = useState('');

    const [showForm, setFormStatus] = useState(false);

    // Fetch projects from api
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects');
                setProjects(res.data);
            } catch (err) {
                if (err.res) {
                    console.log(err.res.data);
                    console.log(err.res.status);
                    console.log(err.res.headers);
                } else {
                    console.log(`Error: ${err.message}`);
                }
            }
        };

        fetchProjects();
    }, []);

    // Show | Hide 'Settings' Form
    const viewData = () => {
        if (showForm) {
            setFormStatus(false);
        } else {
            setFormStatus(true);
        }
    };

    // Input Handlers
    const titleChangeHandler = (e) => {
        setPutTitle(e.target.value);
    };

    const categoryChangeHandler = (e) => {
        setPutCategory(e.target.value);
    };

    const descriptionChangeHandler = (e) => {
        setPutDescription(e.target.value);
    };

    // 'UPDATE' Request Handler
    const updateProjectHandler = async (id, e) => {
        e.preventDefault();

        await api
            .put(`/project/${id}`, {
                title: putTitle,
                category: putCategory,
                description: putDescription,
            })
            .then((res) => console.log('UPDATING DATA'))
            .catch((err) => console.log(err));

        window.location.reload(true);
    };

    // 'DELETE' Request Handler
    const deleteProjectHandler = async (id, e) => {
        e.preventDefault();

        await api
            .delete(`/project/${id}`)
            .then((res) => console.log('DELETING DATA'));

        window.location.reload(true);
    };

    // Create project handler
    const saveProjectDataHandler = (enteredProjectData) => {
        const projectData = {
            ...enteredProjectData,
        };

        props.onAddProject(projectData);
    };

    return (
        <div>
            {/* Projects grid */}
            <section>
                {projects.map((project) => (
                    <div>
                        <ul key={project.id}>
                            <li>
                                <small>{project.id}</small>{' '}
                            </li>
                            <li>
                                <small>Title</small>{' '}
                                <strong>{project.title}</strong>
                            </li>
                            <li>
                                <small>Category</small>{' '}
                                <strong>{project.category}</strong>
                            </li>
                            <li>
                                <small>Description</small>{' '}
                                <strong>{project.description}</strong>
                            </li>
                            <li>
                                <small>State</small>{' '}
                                <strong>{project.state}</strong>
                            </li>
                        </ul>
                        <div>
                            {/* 'Settings' & 'Delete' Buttons */}
                            <button id="btn-settings" onClick={viewData}>
                                Settings
                            </button>
                            <button
                                id="btn-delete"
                                onClick={(e) =>
                                    deleteProjectHandler(project.id, e)
                                }
                            >
                                Delete
                            </button>
                        </div>
                        {/* Settings Form */}
                        {showForm && (
                            <form
                                onSubmit={(e) =>
                                    updateProjectHandler(project.id, e)
                                }
                            >
                                {/* Title */}
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    onChange={titleChangeHandler}
                                    value={putTitle}
                                />
                                {/* Category */}
                                <label htmlFor="category">Category</label>
                                <select
                                    name="category"
                                    onChange={categoryChangeHandler}
                                    value={putCategory}
                                >
                                    <option value="PHOTO">Photo</option>
                                    <option value="VIDEO">Video</option>
                                    <option value="BOTH">Both</option>
                                </select>
                                {/* Description */}
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    onChange={descriptionChangeHandler}
                                    value={putDescription}
                                />
                                {/* Submit */}
                                <button type="submit">Save</button>
                            </form>
                        )}
                    </div>
                ))}
            </section>
            <CreateProject onSaveProjectDataHandler={saveProjectDataHandler} />
        </div>
    );
};

export default Projects;
