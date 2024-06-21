import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editPhotosThunk } from '../../redux/photos';
import "./EditPhotos.css";

const EditPhotos = () => {
    
    let { id } = useParams();
    id = parseInt(id);
    
    const user = useSelector((state) => state.session.user.id);
    const currentPhoto = useSelector((state) => state.photos.byId[id]);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState(currentPhoto? currentPhoto.title : title);
    const [description, setDescription] = useState(currentPhoto? currentPhoto.description : description);
    const [url, setUrl] = useState(currentPhoto? currentPhoto.url : url);
    const [label, setLabel] = useState(currentPhoto? currentPhoto.label : label);
    const [errors, setErrors] = useState({});
    let foundError = false;
    const [showUpload, setShowUpload] = useState(true);
    const [previewUrl, setPreviewUrl] = useState("");

    // AWS 
    const updateImage = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreviewUrl(reader.result);
        };
        setUrl(file);
        setShowUpload(false);
        return file
    };
  

    if (!currentPhoto) {
        return <h2>Photo to be edited not found!!</h2>
    }

    const validate = () => {
        foundError = false;
        setErrors({});
        

        if (!title.trim()) {
          foundError = true;
          setErrors((errors) => ({ ...errors, title: "Title is required" }));     
        }

        // if (url) {
        //     try {
        //         new URL(url);
        //         return true;
        //     } catch (errors) {
        //         foundError = true;
        //         setErrors((errors) => ({ ...errors, url: "Please enter a valid URL " }));
    
        //     }
        // }
    
        // if (!url) {
        //     foundError = true;
        //     setErrors((errors) => ({ ...errors, url: "Photo URL is required" })); 
        // }
        if (!url) {
            foundError = true;
            setErrors((errors) => ({ ...errors, url: "Photo is required" })); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const photo = {
            label,
            title,
            description,
            url,    
        };

        validate();
        try {
            if (!foundError) {
                const updatedPhoto = await dispatch(
                    editPhotosThunk(currentPhoto.id, photo)
            ). catch (async (res) => {
                const data = await res.json();
                if (data.errors) {
                    setErrors((errors) => ({ ...errors, ...data.errors }));
            }
            })
        navigate('/photos/current')
        }} catch (error) {
            const data = await error.json();
            
                if (data.errors) {
                    setErrors((errors) => ({ ...errors, ...data.errors }));
                }
        }
    };

    return (
        <form className="update-photo-form" onSubmit={handleSubmit}>
            <h2>Update your Photo</h2>
            <p className="h4">Fields marked as * are mandatory.</p>
            <div className="input-row">
                <label htmlFor="title">
                Title *  &nbsp;<span className="error">{errors.title}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    defaultValue={currentPhoto.title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title"
                    id="title"
                ></input>
            </div>

            <div className="input-row">
                <label htmlFor="label">
                Label <span className="error">{errors.label}</span>
                </label>
                <input
                className="input-wide"
                type="text"
                defaultValue={currentPhoto.label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="label"
                id="label"
                ></input>
            </div>

            <div className="input-row">
                <label htmlFor="description">
                    Description <span className="error">{errors.description}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    defaultValue={currentPhoto.description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    id="description"
                />
            </div>

            <div className="input-row">
                {showUpload && (
                <>
                <label htmlFor="file-upload">
                Select from device *    &nbsp;<span className="error">{errors.url}</span>
                </label>
                <input
                className="input-wide"
                type="file"
                // defaultValue=" "
                onChange={updateImage}
                placeholder="Photo"
                id="file-upload"
                accept=".pdf, .png, .jpg, .jpeg, .gif"
                name="imageURL"
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
                <label htmlFor="url">
                Photo URL *   &nbsp;<span className="error">{errors.url}</span>
                </label>
                <input
                className="input-wide"
                type="text"
                defaultValue={currentPhoto.url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Photo"
                id="url"
                />
            </div> */}

            <div className="submit-button-div">
                <button className="submit-button" type="submit">
                    Update
                </button>
            </div>
        </form>
    )
}

export default EditPhotos;