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
    const [favorites, setFavorites] = useState([]);
    const [favoritesInitialized, setFavoritesInitialized] = useState(false);
    const photos = useSelector(state => state.photo.photos);
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
    dispatch(fetchPhotos());
    if (currentUser && !favoritesInitialized) {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        } else {

            dispatch(fetchFavorites(currentUser.id))
                .then(response => {
                    if (response && response.payload && response.payload.favorites) {
                        const userFavorites = response.payload.favorites.map(favorite => favorite.photoId);
                        setFavorites(userFavorites);
                        localStorage.setItem('favorites', JSON.stringify(userFavorites));
                    } else {
                        console.error("Error fetching favorites: Invalid response format");
                    }
                    setFavoritesInitialized(true);
                })
                .catch(error => {
                    console.error("Error fetching favorites:", error);
                    setFavoritesInitialized(true);
                });
        }
        setFavoritesInitialized(true);
    } else {

        setFavorites([]);
        localStorage.removeItem('favorites');
        setFavoritesInitialized(false);
    }
}, [dispatch, currentUser, favoritesInitialized]);

    const closeModal = () => {
        setShowModal(false);
    };

    const handleManageClick = (id) => {
        setModalContent(<ManagePhotoModal id={id} />);
        setShowModal(true);
    };

    const handleFavoriteToggle = (photoId) => {
        if (!currentUser) return;
        const isCurrentlyFavorited = favorites.includes(photoId);

        if (!isCurrentlyFavorited) {
            dispatch(favoritePhoto(photoId))
                .then(() => {
                    setFavorites(prevFavorites => [...prevFavorites, photoId]);
                    localStorage.setItem('favorites', JSON.stringify([...favorites, photoId]));
                })
                .catch(error => {
                    console.error("Error favoriting photo:", error);
                });
        } else {
            dispatch(removeFromFavorites(photoId))
                .then(() => {
                    setFavorites(prevFavorites => prevFavorites.filter(id => id !== photoId));
                    localStorage.setItem('favorites', JSON.stringify(favorites.filter(id => id !== photoId)));
                })
                .catch(error => {
                    console.error("Error unfavoriting photo:", error);
                });
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

    const isFavorite = (photoId) => {
        return favorites.includes(photoId);
    };

    useEffect(() => {
        
        if (!currentUser) {
            setFavorites([]);
            localStorage.removeItem('favorites');
        }
    }, [currentUser]);

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
                            {currentUser && (
                                <button onClick={() => handleFavoriteToggle(photo.id)} >
                                    {favorites.includes(photo.id) ? 'Unfavorite' : 'Favorite'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {showModal && <Modal />}
        </div>
    );
}

export default GetAllPhotos;
