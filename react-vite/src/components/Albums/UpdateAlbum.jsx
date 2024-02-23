import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editAlbumThunk, detailedAlbumThunk } from '../../redux/albums';
import "./UpdateAlbum.css";

const UpdateAlbum = () => {
    console.log('.......inside update Album function........');
    const { id } = useParams();
    const albumId = parseInt(id);
    console.log('.....albumId......', albumId,)
    const currentAlbum = useSelector((state) => state.albums.allAlbums[0]);
    console.log('.......currentAlbum........', currentAlbum);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState(currentAlbum? currentAlbum.album.title : title);
    const [description, setDescription] = useState(currentAlbum? currentAlbum.album.description : description);
    const [image_url, setImage_url] = useState(currentAlbum? currentAlbum.album.image_url : image_url);
    const [errors, setErrors] = useState({});
    let foundError = false;
    
    useEffect(() => {
        dispatch(detailedAlbumThunk(albumId));
    }, [dispatch, albumId]);

    useEffect(() => {
        dispatch(detailedAlbumThunk(albumId));
    }, [dispatch, albumId]);

    if (!currentAlbum) {
        return <h1>Loading...</h1>
    }

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
        }
    };

    console.log('..control here after detailed album current album...', currentAlbum)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const albumPassed = {
            title,
            description,
            image_url
        };
        
        validate();
        try {
            if (!foundError) {
                const updatedAlbum = await dispatch(
                    editAlbumThunk(albumId, albumPassed )
            ). catch (async (res) => {
                const data = await res.json();
                if (data.errors) {
                    setErrors((errors) => ({ ...errors, ...data.errors }));
            } 
            })
        navigate('/albums/all')   
        }} catch (error) {
            const data = await error.json(); 
            console.log('$$$$$$$$$$data', data)
                if (data.errors) {
                    setErrors((errors) => ({ ...errors, ...data.errors }));
                }
        };
    };

    return (
        <form className="update-album-form" onSubmit={handleSubmit}>
            <h2>Update your Album</h2>

            <div className="input-row">
                <label htmlFor="title">
                    Title<span className="error">{errors.title}</span>
                </label>
                <input
                    className="input-wide"
                    type="text"
                    defaultValue={currentAlbum.album.title}
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
                    defaultValue={currentAlbum.album.description}
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
                    defaultValue={currentAlbum.album.image_url}
                    onChange={(e) => setImage_url(e.target.value)}
                    placeholder="Album Image"
                    id="image_url"
                />
            </div>

            <div className="submit-button-div">
                <button className="submit-button" type="submit">
                    Update your Album
                </button>
            </div>
        </form>
    )
}

export default UpdateAlbum;
