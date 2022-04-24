import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const ProjectDetails = () => {
    const [project, setProject] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [photos, setPhotos] = useState('');
    const navigate = useNavigate();

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
        setLoading(true);

        axios
            .get(`http://localhost:8000/project/31`)
            .then((res) => {
                setProject(res.data);

                let selectPhoto = res.data.photos[0].photo;

                let photoPath = selectPhoto.substring(
                    selectPhoto.indexOf('media') + 5
                );

                setPhotos('../../../../public/media/' + photoPath);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [photos]);

    // 'DELETE' Project
    const deleteProjectHandler = async (id) => {
        await axios
            .delete(`http://localhost:8000/project/${id}`)
            .then((res) => console.log(id));

        navigate('/admin/projects');
    };

    // 'UPDATE' Project
    const updateProjectHandler = async (e) => {
        await axios.put('http://localhost:8000/project/31', {
            title: putTitle,
            category: putCategory,
            description: putDescription,
            state: putState,
        });
    };

    return (
        <section className="bg-opacity-25 bg-slate-900 text-gray-100 mx-auto col-start-4 col-end-12 w-full max-w-screen">
            {/* Edit & Delete Buttons */}
            <div className="flex justify-end">
                <button
                    className="bg-blue-500 px-6 py-3"
                    onClick={showFormHandler}
                >
                    Edit
                </button>
                <button
                    onClick={() => deleteProjectHandler(project.id)}
                    className="bg-red-500 px-6 py-3"
                >
                    Delete
                </button>
            </div>
            {/* Project Details */}
            <span className="flex">
                Title:
                <h1 className="text-2xl font-bold">{project.title}</h1>
            </span>
            <span className="flex">
                Category:
                <h1 className="text-2xl font-bold">{project.category}</h1>
            </span>
            <span className="flex">
                Description:
                <h1 className="text-2xl font-bold">{project.description}</h1>
            </span>
            <span className="flex">
                State:
                <h1 className="text-2xl font-bold">{project.state}</h1>
            </span>
            {/* <img src={`${photos}`} alt="Project content"></img> */}
            {/* Update Form */}
            {showForm && (
                <form onSubmit={(e) => updateProjectHandler(e)}>
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
