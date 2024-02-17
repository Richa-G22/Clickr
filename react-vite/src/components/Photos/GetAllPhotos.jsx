import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from "../../redux/photos/photoReducer";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ManagePhotoModal from './managePhotoModal';

function GetAllPhotos() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const photos = useSelector(state => state.photo.photos);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    const handleImageClick = (id) => {
        console.log("Clicked photo id:", id);
        navigate(`/${id}`);
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

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // const handleUpdate = () => {
    //     setShowModal(false);
    // };

    return (
        <div>
        
            <button onClick={() => navigate('/new')}>Add Photo</button>

            <div>
                {photos.map(photo => (
                    <div key={photo.id}>
                        <img src={photo.url} alt={photo.title} onClick={() => handleImageClick(photo.id)}/>
                        {renderManageButton(photo.id)}
                    </div>
                ))}
            </div>
            {showModal && <ManagePhotoModal />}
        </div>
    );
}

export default GetAllPhotos;
