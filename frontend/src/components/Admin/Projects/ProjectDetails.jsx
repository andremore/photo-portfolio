import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/ProjectDetails.css';

export const ProjectDetails = () => {
    const [project, setProject] = useState([]);
    const [photos, setPhotos] = useState('');

    // Get project id through url parameters
    const projectId = useParams().id;

    // Navigator upon deletion
    const navigate = useNavigate();

    // 'UPDATE' Project details
    const [putTitle, setPutTitle] = useState('');
    const [putCategory, setPutCategory] = useState('PHOTO');
    const [putDescription, setPutDescription] = useState('');
    const [putState, setPutState] = useState('SAVE');

    const [showForm, setShowForm] = useState(false);

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

    const stateChangeHandler = (e) => {
        setPutState(e.target.value);
    };

    // Show || Hide Form
    const showFormHandler = () => {
        setShowForm(!showForm);
    };

    // 'GET' Project details
    useEffect(() => {
        axios
            .get(`http://localhost:8000/project/${projectId}`)
            .then((res) => {
                setProject(res.data);

                let selectPhoto = res.data.photos[0].photo;

                let photoPath = selectPhoto.substring(
                    selectPhoto.indexOf('media') + 5
                );

                setPhotos('../../../../public/media/' + photoPath);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [photos, projectId]);

    // 'DELETE' Project
    const deleteProjectHandler = async (id) => {
        await axios
            .delete(`http://localhost:8000/project/${id}`)
            .then(() => console.log(id));

        navigate('/admin/projects');
    };

    // 'UPDATE' Project
    const updateProjectHandler = async (id) => {
        await axios.put(`http://localhost:8000/project/${id}`, {
            title: putTitle,
            category: putCategory,
            description: putDescription,
            state: putState,
        });
    };

    return (
        <div id="projectDetails">
            <div>
                {/* Edit Button */}
                <button
                    onClick={() => showFormHandler(project.id)}
                    className="btn btn-ghost"
                >
                    Edit
                </button>
                {/* Delete Button */}
                <label htmlFor="deleteModal" className="btn btn-error">
                    Delete
                </label>
                <input
                    type="checkbox"
                    id="deleteModal"
                    className="modal-toggle"
                />
                {/* Deletion modal */}
                <div className="modal">
                    <div>
                        <h3>Are you sure you want to delete this project?</h3>
                        <p>You{"'"}re about to delete a project...</p>
                        <div>
                            <label
                                htmlFor="deleteModal"
                                onClick={() => deleteProjectHandler(project.id)}
                            >
                                Yes
                            </label>
                            <label htmlFor="deleteModal">No</label>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                {/* Project Details */}
                <div>
                    <small>Title:</small>
                    <h1>{project.title}</h1>
                </div>
                <div>
                    <small>Category:</small>
                    <h1>{project.category}</h1>
                </div>
                <div>
                    <small>Description:</small>
                    <h1>{project.description}</h1>
                </div>
                <div>
                    <small>State:</small>
                    <h1>{project.state}</h1>
                </div>
                {/* <img src={`${photos}`} alt="Project content"></img> */}
                {/* Update Form */}
                {showForm && (
                    <form onSubmit={() => updateProjectHandler(project.id)}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={putTitle}
                            onChange={titleChangeHandler}
                        />
                        <select
                            placeholder="Category"
                            value={putCategory}
                            onChange={categoryChangeHandler}
                        >
                            <option value="PHOTO">Photo</option>
                            <option value="VIDEO">Video</option>
                            <option value="BOTH">Both</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Description"
                            value={putDescription}
                            onChange={descriptionChangeHandler}
                        />
                        <select
                            placeholder="State"
                            value={putState}
                            onChange={stateChangeHandler}
                        >
                            <option value="SAVE">Save</option>
                            <option value="PUBLISH">Hide</option>
                            <option value="HIDE">Hide</option>
                            <option value="DELETE">Delete</option>
                        </select>
                        <button type="submit">Submit</button>
                    </form>
                )}
            </section>
        </div>
    );
};
