import { useState } from 'react';
import axios from 'axios';
import './styles/CreateProject.css';
import { Navbar } from '../Navigation/Navbar';

export const CreateProject = () => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredCategory, setEnteredCategory] = useState('PHOTO');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredState, setEnteredState] = useState('SAVE');
    const [enteredPhotos, setEnteredPhotos] = useState([]);
    // const [enteredVideos, setEnteredVideos] = useState([]);

    // Input Handlers
    const titleChangeHandler = (e) => {
        setEnteredTitle(e.target.value);
    };

    const categoryChangeHandler = (e) => {
        setEnteredCategory(e.target.value);
    };

    const descriptionChangeHandler = (e) => {
        setEnteredDescription(e.target.value);
    };

    const stateChangeHandler = (e) => {
        setEnteredState(e.target.value);
    };

    const photoChangeHandler = (e) => {
        setEnteredPhotos(e.target.files[0]);
    };

    // const videoChangeHandler = (e) => {
    //     setEnteredVideos(e.target.files[0]);
    // };

    // Submit Handlers
    const submitHandler = async () => {
        const formData = new FormData();

        formData.append('title', enteredTitle);
        formData.append('category', enteredCategory);
        formData.append('description', enteredTitle);
        formData.append('state', enteredState);
        formData.append('photo', enteredPhotos);
        // formData.append('video', enteredVideos);

        await axios
            .post('http://localhost:8000/projects/', formData)
            .then((res) => console.log('POSTING DATA'))
            .catch((err) => console.log(err));
    };

    return (
        <>
            {/* Create Button */}
            <form
                id="form"
                onSubmit={submitHandler}
                className="col-start-4 col-end-12"
                encType="multipart/form-data"
            >
                {/* Title */}
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={enteredTitle}
                    onChange={titleChangeHandler}
                />
                {/* Category */}
                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    value={enteredCategory}
                    onChange={categoryChangeHandler}
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
                    value={enteredDescription}
                    onChange={descriptionChangeHandler}
                />
                {/* State */}
                <label htmlFor="state">State</label>
                <select
                    name="state"
                    value={enteredState}
                    onChange={stateChangeHandler}
                >
                    <option value="SAVE">Save</option>
                    <option value="PUBLISH">Publish</option>
                    <option value="HIDE">Hide</option>
                </select>
                {/* Photo */}
                <label htmlFor="photo">Photo</label>
                <input
                    type="file"
                    name="photo"
                    onChange={(e) => photoChangeHandler(e)}
                />
                {/* Video */}
                {/* <label htmlFor="video">Video</label>
                <input
                    type="file"
                    name="video"
                    onChange={(e) => videoChangeHandler(e)}
                /> */}
                {/* Submit */}
                <button type="submit">Save</button>
            </form>
        </>
    );
};
