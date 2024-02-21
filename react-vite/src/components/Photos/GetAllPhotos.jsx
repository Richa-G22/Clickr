import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from "../../redux/photoReducer";
import { favoritePhoto, removeFromFavorites, fetchFavorites } from '../../redux/favorites';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ManagePhotoModal from './managePhotoModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';




function GetAllPhotos() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const photos = useSelector(state => state.photo.photos);

    useEffect(() => {
        dispatch(fetchPhotos()); // Fetch photos from Redux store
    }, [dispatch]);

    useEffect(() => {
        // Fetch user's favorites and update state
        // You need to implement this according to your Redux setup
        // This could be done through another Redux action and reducer
        // or by directly accessing user's favorites from the Redux store
    }, []);

    const handleImageClick = (id) => {
        console.log("Clicked photo id:", id);
        navigate(`/${id}`);
    };

    const handleHeartClick = (photoId) => {
        const isFavorite = favorites.find(fav => fav.photoId === photoId);

        if (!isFavorite) {
            dispatch(favoritePhoto(photoId)); // Dispatch action to add to favorites
            setFavorites([...favorites, { photoId }]); // Update local state
        } else {
            dispatch(removeFromFavorites(photoId)); // Dispatch action to remove from favorites
            setFavorites(favorites.filter(fav => fav.photoId !== photoId)); // Update local state
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const renderManageButton = (id) => {
        return (
            <OpenModalButton
                buttonText="Manage"
                modalComponent={<ManagePhotoModal id={id} />}
                onButtonClick={toggleModal}
            />
        );
    };

    return (
        <div>
            <button onClick={() => navigate('/new')}>Add Photo</button>

            <div>
                {photos.map(photo => (
                    <div key={photo.id}>
                        <img src={photo.url} alt={photo.title} onClick={() => handleImageClick(photo.id)} />
                        {renderManageButton(photo.id)}
                        <FontAwesomeIcon
                            icon={favorites.find(fav => fav.photoId === photo.id) ? solidHeart : regularHeart}
                            onClick={() => handleHeartClick(photo.id)}
                        />
                    </div>
                ))}
            </div>
            {showModal && <ManagePhotoModal />}
        </div>
    );
}

export default GetAllPhotos;
