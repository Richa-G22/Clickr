import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deletePhoto } from '../../redux/photos/photoReducer';
import { useNavigate } from 'react-router-dom';

function ManagePhotoModal({ id }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const navigate = useNavigate()


    const handleDelete = () => {

        dispatch(deletePhoto(id));
        closeModal();
    };

    const handleUpdate = () => {
        closeModal();
        navigate(`/update/${id}`);
    };



    return (
        <div>
            <h3>Manage Photo</h3>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => closeModal()}>Close</button>
        </div>
    );
}

export default ManagePhotoModal;
