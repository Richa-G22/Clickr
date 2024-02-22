import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updatePhoto } from '../../redux/photoReducer';

function UpdatePhoto() {
    const { id } = useParams();
    console.log("ID from useParams:", id);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});

    const photo1 = useSelector(state => state.photo.photos);

    const photo = useSelector(state => state.photo);


    const userId = useSelector(state => state.session.user.id);
    // console.log("!!!!!!!!!!", userId)





    const [formFields, setFormFields] = useState({
        label: '',
        title: '',
        description: '',
        url: ''
    });


    useEffect(() => {
        if (photo1) {
            setFormFields({
                label: photo1.label || '',
                title: photo1.title || '',
                description: photo1.description || '',
                url: photo1.url || ''
            });
        }
    }, [dispatch, id, photo1]);

    const validate = () => {
        let errors = {};

        if (!formFields.label.trim()) {
            errors.label = 'Label is required';
        }

        if (!formFields.title.trim()) {
            errors.title = 'Title is required';
        }

        if (!formFields.description.trim()) {
            errors.description = 'Description is required';
        }
         if (photo1.photos.userId !== userId) {
           errors.unauthorized = "Unauthorized";
         }



        if (!formFields.url.trim()) {
            errors.url = 'Photo URL is required';
        } else if (!/^http(s)?:\/\/.+\..+$/.test(formFields.url.trim())) {
            errors.url = 'Enter a valid URL';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (e) => {

      e.preventDefault();
      if (validate()) {

        try {
          // Dispatch the updatePhoto action with photo ID and updated data
          await dispatch(updatePhoto(id, formFields)); // Use the id from the URL params
          // Navigate to another route after successful update
          navigate("/");
        } catch (error) {

          console.error("Error updating photo:", error);
        }
      } else {
        console.log("Form has errors");
      }
    };




    ;


    return (
        <div>
            <h2>Update Photo</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Label</label>
                    <input type="text" name="label" value={formFields.label} onChange={handleInputChange} />
                    {errors.label && <span>{errors.label}</span>}
                </div>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={formFields.title} onChange={handleInputChange} />
                    {errors.title && <span>{errors.title}</span>}
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" name="description" value={formFields.description} onChange={handleInputChange} />
                    {errors.description && <span>{errors.description}</span>}
                </div>
                <div>
                    <label>Photo URL</label>
                    <input type="text" name="url" value={formFields.url} onChange={handleInputChange} />
                    {errors.url && <span>{errors.url}</span>}
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default UpdatePhoto;
