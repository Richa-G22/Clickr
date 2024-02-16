import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { createPhoto } from "../../redux/photos/photoReducer";

function AddPhotos() {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.photo.error);
    console.log(errors, '**********')
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
    await dispatch(createPhoto(photoData));
  } catch (error) {
    console.error('Error creating photo:', error.message);
    dispatch(createPhotoFailure(error.response.data));
  }
};

    return (
        <div>
            <h2>Add Photo</h2>
            {errors && errors.message && <p className="error">{errors.message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Label</label>
                    <input type="text" name="label" value={photoData.label} onChange={handleChange} />
                    {errors && errors.label && <p className="error">{errors.label}</p>}
                </div>
                <div>
                    <label>Title</label>
                    <input type="text" name="title" value={photoData.title} onChange={handleChange} />
                    {errors && errors.title && <p className="error">{errors.title}</p>}
                </div>
                <div>
                    <label>Description</label>
                    <input type="text" name="description" value={photoData.description} onChange={handleChange} />
                    {errors && errors.description && <p className="error">{errors.description}</p>}
                </div>
                <div>
                    <label>URL</label>
                    <input type="text" name="url" value={photoData.url} onChange={handleChange} />
                    {errors && errors.url && <p className="error">{errors.url}</p>}
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default AddPhotos;
