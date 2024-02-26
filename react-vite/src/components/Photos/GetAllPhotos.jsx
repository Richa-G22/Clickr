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
    const { showModal } = useModal();
    const [favorites, setFavorites] = useState([]); 
    const photos = useSelector(state => state.photo.photos);
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchPhotos());
        if (currentUser) {

            dispatch(fetchFavorites(currentUser.id))
                .then(response => {
                    if (response && response.data) {
                        const userFavorites = response.data.map(favorite => favorite.photoId);
                        setFavorites(userFavorites);
                    }
                })
                .catch(error => {
                    console.error("Error fetching favorites:", error);
                });
        }
    }, [dispatch, currentUser]);

    useEffect(() => {

        const storedFavorites = localStorage.getItem(`favorites_${currentUser ? currentUser.id : 'guest'}`);
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, [currentUser]);

    const handleFavoriteToggle = (photo) => {
        const photoId = photo.id;
        const isCurrentlyFavorited = favorites.includes(photoId);

        if (!isCurrentlyFavorited) {
            dispatch(favoritePhoto(photoId))
                .then(() => {
                    setFavorites(prevFavorites => [...prevFavorites, photoId]);
                    localStorage.setItem(`favorites_${currentUser ? currentUser.id : 'guest'}`, JSON.stringify([...favorites, photoId])); // Update local storage
                })
                .catch(error => {
                    console.error("Error favoriting photo:", error);
                });
        } else {
            dispatch(removeFromFavorites(photoId))
                .then(() => {
                    setFavorites(prevFavorites => prevFavorites.filter(id => id !== photoId)); // Update favorites state
                    localStorage.setItem(`favorites_${currentUser ? currentUser.id : 'guest'}`, JSON.stringify(favorites.filter(id => id !== photoId))); // Update local storage
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

    useEffect(() => {

        if (!currentUser) {
            setFavorites([]);
            localStorage.removeItem(`favorites_guest`);
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
                                <button onClick={() => handleFavoriteToggle(photo)}>
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
