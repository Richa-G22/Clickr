import { deletePhotoThunk } from '../../redux/photos';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useNavigate } from "react-router-dom";
import './DeleteImageModal.css';

function DeleteImageModal({id} ) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
 
  return (
        <div className='main-div'>
            <h2 style={{ marginBottom: 0, paddingBottom: "0px" }}>Confirm Delete</h2>
            <p style={{ padding: "20px",paddingBottom: "0px",marginTop: 0, fontSize: "19px" }}>
              Are you sure you want to delete this photo? </p>
            <button className='yes-button' onClick={() => dispatch(deletePhotoThunk(id))
                    .then(() => closeModal())} >Yes (Delete Photo)
            </button>
            <button className='no-button' onClick={() => closeModal()}>No (Keep Photo)
            </button><br></br>           
        </div>   
  )
}

export default DeleteImageModal;