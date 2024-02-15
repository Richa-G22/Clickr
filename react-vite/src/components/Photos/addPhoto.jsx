import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPhoto } from "../../redux/photos/photoActions";

function AddPhotos() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [photoData, setPhotoData] = useState({
        label: '',
        title: '',
        description: '',
        url: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPhotoData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Dispatch the action to create a new photo
            await dispatch(createPhoto(photoData));
            navigate('/')
        } catch (error) {
            console.error('Error creating photo:', error.message);
        }
    };

    return (
        <div>
            <h2>Add Photo</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Label</label>
                    <input type="text" name="label" value={photoData.label} onChange={handleChange} />
                </div>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={photoData.title} onChange={handleChange} />
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" name="description" value={photoData.description} onChange={handleChange} />
                </div>
                <div>
                    <label>URL</label>
                    <input type="text" name="url" value={photoData.url} onChange={handleChange} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default AddPhotos;
