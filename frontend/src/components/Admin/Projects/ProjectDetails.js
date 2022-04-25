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
        console.log(id);
        await axios
            .delete(`http://localhost:8000/project/${id}`)
            .then((res) => console.log(id));

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
        <section id="projectDetails">
            {/* Edit & Delete Buttons */}
            <div>
                <button onClick={() => showFormHandler(project.id)}>
                    Edit
                </button>
                <button onClick={() => deleteProjectHandler(project.id)}>
                    Delete
                </button>
            </div>
            {/* Project Details */}
            <span>
                Title:
                <h1>{project.title}</h1>
            </span>
            <span>
                Category:
                <h1>{project.category}</h1>
            </span>
            <span>
                Description:
                <h1>{project.description}</h1>
            </span>
            <span>
                State:
                <h1>{project.state}</h1>
            </span>
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
    );
};
