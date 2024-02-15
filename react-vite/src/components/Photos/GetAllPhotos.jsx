import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from "../../redux/photos/photoActions";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ManagePhotoModal from './managePhotoModal';

function GetAllPhotos() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); // Local state for modal visibility
    const photos = useSelector(state => state.photo.photos);

    useEffect(() => {
        // Dispatch the action to fetch photos when the component mounts
        dispatch(fetchPhotos());
    }, [dispatch]);

    const handleImageClick = (id) => {
        console.log("Clicked photo id:", id);
        navigate(`/update/${id}`);
    };

    const renderManageButton = (id) => {
        return (
            <OpenModalButton
                buttonText="Manage"
                modalComponent={<ManagePhotoModal id={id} />}
                onButtonClick={toggleModal} // Open modal when button is clicked
            />
        );
    };

    const toggleModal = () => {
        setShowModal(!showModal); // Toggle modal visibility
    };

    const handleUpdate = () => {
        setShowModal(false); // Close the modal without navigating
    };

    return (
        <div>
            <h2>All Photos</h2>
            <button onClick={() => navigate('/new')}>Add Photo</button>

            <div>
                {photos.map(photo => (
                    <div key={photo.id}>
                        <img src={photo.url} alt={photo.title} />
                        {renderManageButton(photo.id)}
                    </div>
                ))}
            </div>
            {showModal && <ManagePhotoModal />}
        </div>
    );
}

export default GetAllPhotos;
