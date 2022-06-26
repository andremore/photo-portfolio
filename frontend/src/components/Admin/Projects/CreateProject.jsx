import { useState } from 'react';
import axios from 'axios';
import './styles/CreateProject.css';

export const CreateProject = () => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredCategory, setEnteredCategory] = useState('PHOTO');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredState, setEnteredState] = useState('SAVE');
    const [enteredMedia, setEnteredMedia] = useState([]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', enteredTitle);
        formData.append('category', enteredCategory);
        formData.append('description', enteredTitle);
        formData.append('state', enteredState);

        for (let file = 0; file < enteredMedia.length; file++) {
            formData.append('media', enteredMedia[file]);
        }

        await axios
            .post('http://localhost:8000/projects', formData)
            .then(() => {
                setEnteredTitle('');
                setEnteredDescription('');
                setEnteredMedia([]);
            })
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
                            onChange={(e) => {
                                setEnteredTitle(e.target.value);
                            }}
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
                            onChange={(e) => {
                                setEnteredCategory(e.target.value);
                            }}
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
                            onChange={(e) => {
                                setEnteredDescription(e.target.value);
                            }}
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
                            onChange={(e) => {
                                setEnteredState(e.target.value);
                            }}
                        >
                            <option disabled>State</option>
                            <option value="SAVE">Save</option>
                            <option value="PUBLISH">Publish</option>
                            <option value="HIDE">Hide</option>
                        </select>
                    </label>
                </div>
                {/* Media */}
                <div>
                    <label htmlFor="media">
                        <span>Media</span>
                        <input
                            type="file"
                            multiple={true}
                            name="media"
                            onChange={(e) => {
                                setEnteredMedia(e.target.files);
                                console.log(enteredMedia);
                            }}
                        />
                    </label>
                </div>
                {/* Submit */}
                <button type="submit">Save</button>
            </form>
        </section>
    );
};
