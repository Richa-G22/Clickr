import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from "../../redux/photos/photoActions";

function GetAllPhotos() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const photos = useSelector(state => state.photo.photos);

    useEffect(() => {
        // Dispatch the action to fetch photos when the component mounts
        dispatch(fetchPhotos());
    }, [dispatch]);

    const handleImageClick = (photoId) => {
        navigate(`/update/${photoId}`);
    };

    return (
        <div>
            <h2>All Photos</h2>
            <button onClick={() => navigate('/new')}>Add Photo</button>
            <div>
                {photos.map(photo => (
                    <div key={photo.id} onClick={() => handleImageClick(photo.id)}>
                        <img src={photo.url} alt={photo.title} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GetAllPhotos;
