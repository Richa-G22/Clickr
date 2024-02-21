import { deletePhotoFromAlbumThunk } from '../../redux/albums';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeletePhotoModal.css';

function DeletePhotoModal( albumId, photoId ) {
  console.log('......photoId inside deleteModal..albumId..',albumId.albumId, typeof(albumId));
  console.log('......photoId inside deleteModal..photoId...',albumId.photoId, typeof(photoId));
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  return (
        <div className='main-div'>
            <h2 style={{ marginBottom: 0, paddingBottom: "0px" }}>Confirm Delete</h2>
            <p style={{ padding: "20px",paddingBottom: "0px",marginTop: 0, fontSize: "19px" }}>
              Are you sure you want to remove this photo? </p>
            <button className='yes-button' onClick={() => dispatch(deletePhotoFromAlbumThunk(albumId.albumId,albumId.photoId))
                    .then(() => closeModal())} >Yes (Delete Photo)
            </button>
            <button className='no-button' onClick={() => closeModal()}>No (Keep Photo)
            </button><br></br>           
        </div>   
  )
}

export default DeletePhotoModal;