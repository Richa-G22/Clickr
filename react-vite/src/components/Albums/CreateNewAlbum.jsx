import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createNewAlbumThunk, addPhotoToAlbumThunk, deletePhotoFromAlbumThunk } from '../../redux/albums';
import "./CreateNewAlbum.css";

const NewAlbum = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user.id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImage_url] = useState("");
  const [photoId, setphotoId] = useState("");
  const [errors, setErrors] = useState({});
  const [showUpload, setShowUpload] = useState(true);
  const [previewUrl, setPreviewUrl] = useState("");
  let foundError = false;

  // AWS 
  const updateImage = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      setImage_url(file);
      setShowUpload(false);
      return file
  };

  const validate = () => {
    foundError = false;
    setErrors({});
    console.log('.......inside validate........')

    if (!title.trim()) {
      foundError = true;
      console.log(".....foundError....", foundError)
      console.log("errors", errors);
      setErrors((errors) => ({ ...errors, title: "Album Title is required" }));
    }

    // if (image_url) {
    //     try {
    //         new URL(image_url);
    //         return true;
    //     } catch (errors) {
    //         foundError = true;
    //         setErrors((errors) => ({ ...errors, image_url: "Please enter a valid URL " }));

    //     } 
    // }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
    console.log(".....foundError123....", foundError)
    console.log("errors123", errors);
        try {
            if (!foundError) {
                const newAlbum =  await dispatch(
                createNewAlbumThunk({ title, description, image_url, user }),
               
            ). catch (async (res) => {
                console.log("in 1st catch")
                const data = await res.json();
                console.log("data123", data)
                if (data.errors) {
                setErrors((errors) => ({ ...errors, ...data.errors }));
            } 
            })
        navigate('/albums/all')
        }} catch (error) {
            console.log("....error", error)
            console.log("in 2nd catch")
                const data = await error.json(); 
                if (data.errors) {
                    setErrors((errors) => ({ ...errors, ...data.errors }));
                }
        }
};

    return (
        <form className="create-album-form" onSubmit={handleSubmit}>
            <h2>Create a new Album</h2>
            <p className="h4">Fields marked as * are mandatory. If no image is provided, default image will be displayed.</p>
            <div className="input-row">
                <label htmlFor="title">
                Title * <span className="error">{errors.title}</span>
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
            {showUpload && (
                <>
                <label htmlFor="file-upload">
                Select from device *   <span className="error">{errors.image_url}</span>
                </label>
                <input
                className="input-wide"
                type="file"
                value={image_url}
                onChange={updateImage}
                placeholder="Album Image"
                id="file-upload"
                accept=".pdf, .png, .jpg, .jpeg, .gif"
                name="image_url"
                />
                </>)}
                {!showUpload && (
                    <img  
                      src={previewUrl}
                      className="preview-image"
                      alt="preview"
                    />
                )}
            </div>

            {/* <div className="input-row">
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
            </div> */}

            <div className="submit-button-div">
                <button className="submit-button" type="submit">
                Create Album
                </button>
            </div>
        </form>
    );
};

export default NewAlbum;
