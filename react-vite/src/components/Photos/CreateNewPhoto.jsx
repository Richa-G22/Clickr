import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createNewPhotoThunk } from '../../redux/photos';
import "./CreateNewPhoto.css";

const CreateNewPhoto = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user.id);
    const [title, setTitle] = useState("");
    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [photoId, setphotoId] = useState("");
    const [errors, setErrors] = useState({});
    const [showUpload, setShowUpload] = useState(true);
    const [previewUrl, setPreviewUrl] = useState("");

    let foundError = false;
    // AWS 
    const updateImage = async (e) => {
        console.log("Inside updateImage AWS")
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






    const validate = () => {
        foundError = false;
        setErrors({});
        console.log('.......inside validate........')

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
        validate();

        try {
            if (!foundError) {
                const newPhoto = await dispatch(
                    createNewPhotoThunk({ title, description, label, url, user })

                ).catch(async (res) => {
                    const data = await res.json();
                    if (data.errors) {
                        setErrors((errors) => ({ ...errors, ...data.errors }));
                    }
                })
                navigate('/photos/current')
            }
        } catch (error) {
            const data = await error.json();
            if (data.errors) {
                setErrors((errors) => ({ ...errors, ...data.errors }));
            }
        }
    }

    return (
        <form className="create-photo-form" onSubmit={handleSubmit}>
            <h2>Create a new Photo</h2>
            <p className="h4">Fields marked as * are mandatory.</p>
            <div className="input-row">
                <label htmlFor="title">
                    Title *  &nbsp;<span className="error">{errors.title}</span>
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
                <label htmlFor="label">
                    Label <span className="error">{errors.label}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    value={label}
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    id="description"
                />
            </div>

            <div className="input-row">
                {console.log("Inside input row of photo")}
                {console.log("showUpload", showUpload)}
                {showUpload && (
                    <>
                        <label htmlFor="file-upload">
                            Select from device *   &nbsp;<span className="error">{errors.url}</span>
                        </label>
                        <input
                            className="input-wide"
                            type="file"
                            value={url}
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

            <div className="submit-button-div">
                <button className="submit-button" type="submit">
                    Create Photo
                </button>
            </div>
        </form>
    );
};

export default CreateNewPhoto;
