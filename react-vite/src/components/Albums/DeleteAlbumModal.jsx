import { deleteAlbumThunk } from '../../redux/albums';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useNavigate } from "react-router-dom";
import './DeleteAlbumModal.css';

function DeleteAlbumModal( albumId ) {
  console.log('......albumId inside deleteModal.....',albumId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  return (
        <div className='main-div'>
            <h2 style={{ marginBottom: 0, paddingBottom: "0px" }}>Confirm Delete</h2>
            <p style={{ padding: "20px",paddingBottom: "0px",marginTop: 0, fontSize: "19px" }}>
              Are you sure you want to remove this album? </p>
            <button className='yes-button' onClick={() => dispatch(deleteAlbumThunk(albumId))
                    .then(() => closeModal(), navigate("/albums/all"))} >Yes (Delete Album)
            </button>
            <button className='no-button' onClick={() => closeModal()}>No (Keep Album)
            </button><br></br>
        </div>

  )
}

export default DeleteAlbumModal;
