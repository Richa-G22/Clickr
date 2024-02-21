import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createNewAlbumThunk, addPhotoToAlbumThunk, deletePhotoFromAlbumThunk } from '../../redux/albums';
import "./CreateNewAlbum.css";

const NewAlbum = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImage_url] = useState("");
  const [photoId, setphotoId] = useState("");
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.session.user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const newAlbum =  await dispatch( 
        createNewAlbumThunk({ title, description, user, image_url }))
           
    } catch (error) {  
        const errors = await error.json();
        return errors;
    };
    navigate('/albums/all')  
};
    
    return (
        <form className="create-album-form" onSubmit={handleSubmit}>
            <h2>Create a new Album</h2>

            <div className="input-row">
                <label htmlFor="title">
                Title <span className="error">{errors.title}</span>
                </label>
                <input
                className="input-wide"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
                id="title"
                ></input>
            </div>

            <div className="input-row">
                <label htmlFor="description">
                Description <span className="error">{errors.description}</span>
                </label>
                <input
                className="input-wide"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                id="description"
                />
            </div>

            <div className="input-row">
                <label htmlFor="image_url">
                Album Image <span className="error">{errors.image_url}</span>
                </label>
                <input
                className="input-wide"
                type="text"
                value={image_url}
                onChange={(e) => setImage_url(e.target.value)}
                placeholder="Album Image"
                id="image_url"
                />
            </div>

            <div className="submit-button-div">
                <button className="submit-button" type="submit">
                Create Album
                </button>
            </div>
        </form>
    );
};

export default NewAlbum;