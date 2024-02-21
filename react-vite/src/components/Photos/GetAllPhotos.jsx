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
    const [localFavorites, setLocalFavorites] = useState([false]);
    const favorites = useSelector(state => state.favorites.favorites);
    const photos = useSelector(state => state.photo.photos);

    useEffect(() => {
        dispatch(fetchPhotos());
        dispatch(fetchFavorites());
    }, [dispatch]);

    useEffect(() => {
        setLocalFavorites(photos.filter(photo => photo.isFavorite));
    }, [photos]);

    useEffect(() => {
        setLocalFavorites(favorites);
    }, [favorites]);

    const handleImageClick = (id) => {
        console.log("Clicked photo id:", id);
        navigate(`/${id}`);
    };

    const handleHeartClick = async (photoId) => {
        try {
            if (!localFavorites.some(fav => fav.photoId === photoId)) {
                await dispatch(favoritePhoto(photoId));
            } else {
                await dispatch(removeFromFavorites(photoId));
            }
        } catch (error) {
            console.error('Error handling heart click:', error);
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
