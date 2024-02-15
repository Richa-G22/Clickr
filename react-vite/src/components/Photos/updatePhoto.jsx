import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchPhotos, updatePhoto }  from "../../redux/photos/photoActions";

function UpdatePhoto() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams(); // Get the photoId from the URL params
    const photos = useSelector(state => state.photo.photos);
    const photo = photos.find(p => p.id === parseInt(id)); // Find the photo with the matching id

    // State to hold form input values
    const [formFields, setFormFields] = useState({
        label: '',
        title: '',
        description: '',
        url: ''
    });

    // Fetch photos when the component mounts
    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    // Populate form fields with photo data when photo is available or changes
    useEffect(() => {
        if (photo) {
            setFormFields({
                label: photo.label || '',
                title: photo.title || '',
                description: photo.description || '',
                url: photo.url || ''
            });
        }
    }, [photo]);

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Dispatch the updatePhoto action with photo ID and updated data
            await dispatch(updatePhoto(id, formFields)); // Use the id from the URL params
            // Navigate to another route after successful update
            navigate('/');
        } catch (error) {
            console.error('Error updating photo:', error);
    
        }
    };

    return (
        <div>
            <h2>Update Photo</h2>
            {photo && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Label</label>
                        <input type="text" name="label" value={formFields.label} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Title</label>
                        <input type="text" name="title" value={formFields.title} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text" name="description" value={formFields.description} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Photo URL</label>
                        <input type="text" name="url" value={formFields.url} onChange={handleInputChange} />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default UpdatePhoto;
