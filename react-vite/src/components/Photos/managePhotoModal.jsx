import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deletePhoto } from '../../redux/photoReducer';
import { useNavigate } from 'react-router-dom';
import "./ManagePhotos.css";


function ManagePhotoModal({ id }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const navigate = useNavigate()


    const handleDelete = (event) => {
        event.stopPropagation();
        dispatch(deletePhoto(id));
        closeModal();
    };

    const handleUpdate = (event) => {
        event.stopPropagation();
        closeModal();
        navigate(`/update/${id}`);
    };



    return (
        <div className='manage-modal'>
            <div className='manage-title'>
                <h3>Manage Photo</h3>

            </div>
            <div className='manage-butt'>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => closeModal()}>Close</button>

            </div>
        </div>
    );
}

export default ManagePhotoModal;
