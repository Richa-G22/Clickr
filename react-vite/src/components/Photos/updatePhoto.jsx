import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchPhotos, fetchPhotosSuccess, updatePhoto }  from "../../redux/photos/photoActions";

function UpdatePhoto() {
    const { id } = useParams();
    console.log("ID from useParams:", id); // Add console log to check id
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const photo = useSelector(state => state.photo.photo); // Accessing the photo object from Redux state

    // State to hold form input values
    const [formFields, setFormFields] = useState({
        label: '',
        title: '',
        description: '',
        url: ''
    });

    // Fetch photo when the component mounts
    useEffect(() => {
        // Perform API request to fetch the photo with the given ID
        if (id) {
            // Use the id parameter in the API request
            fetch(`/api/photo/${id}`)
                .then(response => response.json())
                .then(data => {
                    dispatch(fetchPhotosSuccess(data));
                    // Set form fields with photo data
                    setFormFields({
                        label: data.label || '',
                        title: data.title || '',
                        description: data.description || '',
                        url: data.url || ''
                    });
                })
                .catch(error => console.error('Error fetching photo:', error));
        }
    }, [dispatch, id]);

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
        </div>
    );
}

export default UpdatePhoto;
