import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/ProjectDetails.css';

export const ProjectDetails = () => {
    const [project, setProject] = useState([]);
    const [media, setMedia] = useState([]);

    // Get project id through url parameters
    const projectId = useParams().id;

    // Navigator upon deletion
    const navigate = useNavigate();

    // 'UPDATE' Project details
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredCategory, setEnteredCategory] = useState('PHOTO');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredState, setEnteredState] = useState('SAVE');

    const [showForm, setShowForm] = useState(false);

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
                setMedia(res.data.media);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [projectId]);

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
            title: enteredTitle,
            category: enteredCategory,
            description: enteredDescription,
            state: enteredState,
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
                <div>
                    <small>Media:</small>
                    {media.map((media) => (
                        <img src={media.link[0]} alt="AMERCIA" key={media.id} />
                    ))}
                </div>
                {/* Update Form */}
                {showForm && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateProjectHandler(project.id).then((r) =>
                                console.log(r)
                            );
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Title"
                            value={enteredTitle}
                            onChange={(e) => setEnteredTitle(e.target.value)}
                        />
                        <select
                            placeholder="Category"
                            value={enteredCategory}
                            onChange={(e) => setEnteredCategory(e.target.value)}
                        >
                            <option value="PHOTO">Photo</option>
                            <option value="VIDEO">Video</option>
                            <option value="BOTH">Both</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Description"
                            value={enteredDescription}
                            onChange={(e) =>
                                setEnteredDescription(e.target.value)
                            }
                        />
                        <select
                            placeholder="State"
                            value={enteredState}
                            onChange={(e) => setEnteredState(e.target.value)}
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
