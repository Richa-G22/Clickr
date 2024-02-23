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
  let foundError = false;

  const validate = () => {
    foundError = false;
    setErrors({});
    console.log('.......inside validate........')

    if (!title) {
      foundError = true;
      setErrors((errors) => ({ ...errors, title: "Album Title is required" }));
      console.log('...........inside title loop...........')
      console.log('........title.....', title);
    }

    if (image_url) {
        if (!/^http(s)?:\/\/.+\..+$/.test(image_url.trim())) {
            foundError = true;
            setErrors((errors) => ({ ...errors, image_url: "Please enter a valid URL " }));
            console.log('...........inside IMAGE_URL loop...........')
            console.log('........IMAGE_URL.....', image_url);
        }  
    }};

  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
    // try {
    //     if (!foundError) {
    //         const newAlbum =  await dispatch(
    //         createNewAlbumThunk({ title, description, user, image_url }))
    //     }

    // } catch (error) {
    //     const data = await error.json();
    //     if (data.errors) {
    //         setErrors((errors) => ({ ...errors, ...data.errors }));
    //     }
    // }
    // navigate('/albums/all')
        try {
            if (!foundError) {
                const newAlbum =  await dispatch(
                createNewAlbumThunk({ title, description, user, image_url })
            ). catch (async (res) => {
                const data = await res.json();
                if (data.errors) {
                setErrors((errors) => ({ ...errors, ...data.errors }));
            } 
            })
        navigate('/albums/all')
        }} catch (error) {
                const data = await error.json(); 
                if (data.errors) {
                    setErrors((errors) => ({ ...errors, ...data.errors }));
                }
        }
};

    return (
        <form className="create-album-form" onSubmit={handleSubmit}>
            <h2>Create a new Album</h2>
            <p className="h4">Description and Album Image fields are optional. If no image is provided, default image will be displayed.</p>
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
