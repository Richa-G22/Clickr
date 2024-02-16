import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {updatePhoto }  from "../../redux/photos/photoReducer";

function UpdatePhoto() {
    const { id } = useParams();
    console.log("ID from useParams:", id);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const photo = useSelector(state => state.photo.photo);


    const [formFields, setFormFields] = useState({
        label: '',
        title: '',
        description: '',
        url: ''
    });


    useEffect(() => {
        if (photo) {
            setFormFields({
                label: photo.label || '',
                title: photo.title || '',
                description: photo.description || '',
                url: photo.url || ''
            });
        }
    }, [dispatch, id, photo]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('ID:', id);
        console.log('Form Data:', formFields);

        await dispatch(updatePhoto(id, formFields));
        navigate(`/${id}`); // Navigate to the updated photo details page
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
