import { useState } from 'react';
import axios from 'axios';
import './styles/CreateProject.css';

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
            .then(() => console.log('POSTING DATA'))
            .catch((err) => console.log(err));
    };

    return (
        <section>
            {/* Create Button */}
            <form onSubmit={submitHandler} encType="multipart/form-data">
                <div>
                    {/* Title */}
                    <label htmlFor="title">
                        <span>Title</span>
                        <input
                            type="text"
                            name="title"
                            value={enteredTitle}
                            onChange={titleChangeHandler}
                        />
                    </label>
                </div>
                {/* Category */}
                <div>
                    <label htmlFor="category">
                        <span>Category</span>
                        <select
                            name="category"
                            value={enteredCategory}
                            onChange={categoryChangeHandler}
                        >
                            <option disabled>Pick category</option>
                            <option value="PHOTO">Photo</option>
                            <option value="VIDEO">Video</option>
                            <option value="BOTH">Both</option>
                        </select>
                    </label>
                </div>
                {/* Description */}
                <div>
                    <label htmlFor="description">
                        <span>Description</span>
                        <input
                            type="text"
                            name="description"
                            value={enteredDescription}
                            onChange={descriptionChangeHandler}
                        />
                    </label>
                </div>
                {/* State */}
                <div>
                    <label htmlFor="state">
                        <span>State</span>
                        <select
                            name="state"
                            value={enteredState}
                            onChange={stateChangeHandler}
                        >
                            <option disabled>State</option>
                            <option value="SAVE">Save</option>
                            <option value="PUBLISH">Publish</option>
                            <option value="HIDE">Hide</option>
                        </select>
                    </label>
                </div>
                {/* Photo */}
                <div>
                    <label htmlFor="photo">
                        <span>Photo</span>
                        <input
                            type="file"
                            name="photo"
                            onChange={(e) => photoChangeHandler(e)}
                        />
                    </label>
                </div>
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
        </section>
    );
};
