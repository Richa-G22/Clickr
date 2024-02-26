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
    const [selectedPhotoId, setSelectedPhotoId] = useState();
    const [favorites, setFavorites] = useState([]);
    const photos = useSelector(state => state.photo.photos);
    console.log(photos, "!!!!!!!")
    const currentUser = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(fetchPhotos());
        dispatch(fetchFavorites());
    }, [dispatch]);



    const closeModal = () => {
        setShowModal(false);
    };

    const handleManageClick = (id) => {
        setSelectedPhotoId(id);
        setModalContent(<ManagePhotoModal id={id} />);
        setShowModal(true);
    };

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchFavorites(currentUser.id))
                .then(response => {
                    if (response && response.data) {
                        const userFavorites = response.data.map(favorite => favorite.photoId);
                        setFavorites(userFavorites);
                        localStorage.setItem('favorites', JSON.stringify(userFavorites));
                    }
                })
                .catch(error => {
                    console.error("Error fetching favorites:", error);
                });
        } else {

            setFavorites([]);
            localStorage.removeItem('favorites');
        }
    }, [dispatch, currentUser]);


    const handleFavoriteToggle = (photo) => {
        const photoId = photo.id;
        const isCurrentlyFavorited = isFavorite(photoId);

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


    useEffect(() => {
        dispatch(fetchFavorites(photos))
    })

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
                                <button onClick={() => handleFavoriteToggle(photo)} >
                                    {console.log(selectedPhotoId, "()()()()")}
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
