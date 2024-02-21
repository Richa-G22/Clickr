import { useEffect, useState } from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from "../../redux/photoReducer";
import { favoritePhoto, removeFromFavorites, fetchFavorites } from '../../redux/favorites';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ManagePhotoModal from './managePhotoModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '../../context/Modal';
// import '../Albums/GetCurrentUserAlbums.css'





function GetAllPhotos() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showModal, setModalContent } = useModal();
  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const photos = useSelector(state => state.photo.photos);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    const closeModal = () => {
        setShowModal(false);
    };

    const handleManageClick = (id) => {
    setSelectedPhotoId(id);
    setModalContent(<ManagePhotoModal id={id} />);
  };

    const handleHeartClick = (photoId) => {
        const isFavorite = favorites.find(fav => fav.photoId === photoId);

        if (!isFavorite) {
            dispatch(favoritePhoto(photoId));
            setFavorites([...favorites, { photoId }]);
        } else {
            dispatch(removeFromFavorites(photoId));
            setFavorites(favorites.filter(fav => fav.photoId !== photoId));
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
            <NavLink to="/new" className='menu no-outline' style={{ textDecoration: "none", color: 'grey', fontSize: '18px' }}>Add Photo</NavLink>

            <div className='photos-grid'>
                {photos.map(photo => (
                    <div key={photo.id} className='album-div'>
                        <img src={photo.url} alt={photo.title} onClick={() => handleImageClick(photo.id)} className='line-1' />
                        <div className='manage-buttons'>
                            {renderManageButton(photo.id)}
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
