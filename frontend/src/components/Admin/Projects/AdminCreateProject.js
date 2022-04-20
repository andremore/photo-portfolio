import { useState } from 'react';
import './styles/CreateProject.css';
import { api } from '../Api';

export const CreateProject = () => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredCategory, setEnteredCategory] = useState('PHOTO');
    const [enteredDescription, setEnteredDescription] = useState('');

    const [showForm, setFormStatus] = useState(false);

    // Show | Hide 'CREATE NEW' Form
    const viewData = () => {
        setFormStatus(!showForm);
    };

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

    // Submit Handlers
    const submitHandler = async (e) => {
        e.preventDefault();

        await api
            .post('/projects/', {
                title: enteredTitle,
                category: enteredCategory,
                description: enteredDescription,
            })
            .then((res) => console.log('POSTING DATA'))
            .catch((err) => console.log(err));
    };

    return (
        <>
            {/* Create Button */}
            <button id="btn-create" onClick={viewData}>
                CREATE NEW
            </button>
            {showForm && (
                <form onSubmit={submitHandler}>
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
                    {/* Submit */}
                    <button type="submit">Save</button>
                </form>
            )}
        </>
    );
};
