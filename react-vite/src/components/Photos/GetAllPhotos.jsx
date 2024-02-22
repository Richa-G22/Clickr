import { useEffect, useState } from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from "../../redux/photoReducer";
import { favoritePhoto, fetchFavorites, removeFromFavorites } from '../../redux/favorites';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ManagePhotoModal from './managePhotoModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useModal } from '../../context/Modal';
// import '../Albums/GetCurrentUserAlbums.css'


function GetAllPhotos() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showModal, setShowModal, setModalContent } = useModal();
    const [selectedPhotoId, setSelectedPhotoId] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const photos = useSelector(state => state.photo.photos);
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            // Fetch favorites for the currentUser
            dispatch(fetchFavorites(currentUser.id))
                .then(response => {
                    // Update favorites state with the fetched favorites
                    setFavorites(response.data);
                })
                .catch(error => {
                    console.error("Error fetching favorites:", error);
                });
        }
    }, [dispatch, currentUser]);

    const closeModal = () => {
        setShowModal(false);
    };

    const handleManageClick = (id) => {
        setSelectedPhotoId(id);
        setModalContent(<ManagePhotoModal id={id} />);
        setShowModal(true);
    };

    const handleHeartClick = (photoId) => {
        const isFavorite = favorites.find(fav => fav.photoId === photoId);

        if (!isFavorite) {
            dispatch(favoritePhoto(photoId));
            setFavorites(prevFavorites => [...prevFavorites, { photoId }]);
        } else {
            dispatch(removeFromFavorites(photoId));
            setFavorites(prevFavorites => prevFavorites.filter(fav => fav.photoId !== photoId));
        }
    };

    const renderManageButton = (photo) => {
        if (currentUser && currentUser.id === photo.userId) {
            return (
                <OpenModalButton
                    buttonText="Manage"
                    modalComponent={<ManagePhotoModal id={photo.id} />}
                    onButtonClick={() => handleManageClick(photo.id)}
                />
            );
        } else {
            return null;
        }
    };

    return (
        <div>
            {currentUser && (
                <NavLink to="/new" className='menu no-outline' style={{ textDecoration: "none", color: 'grey', fontSize: '18px' }}>Add Photo</NavLink>
            )}

            <div className='photos-grid'>
                {photos.map(photo => (
                    <div key={photo.id} className='album-div'>
                        <NavLink to={`/${photo.id}`} className='album-div'>
                            <img src={photo.url} alt={photo.title} className='line-1' />
                        </NavLink>
                        <div className='manage-buttons'>
                            {renderManageButton(photo)}
                            <FontAwesomeIcon
                                icon={favorites.find(fav => fav.photoId === photo.id) ? solidHeart : regularHeart}
                                onClick={() => handleHeartClick(photo.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            {showModal && <Modal />}
        </div>
    );
}

export default GetAllPhotos;
