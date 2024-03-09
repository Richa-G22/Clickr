import { deletePhotoFromAlbumThunk } from '../../redux/albums';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './DeletePhotoModal.css';

function DeletePhotoModal({albumId, photoId, setDeleteMode}) {
  console.log('......albumId inside deleteModal..albumId..',albumId, typeof(albumId));
  console.log('......photoId inside deleteModal..photoId...',photoId, typeof(photoId));
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  return (
        <div className='main-div'>
            <h2 style={{ marginBottom: 0, paddingBottom: "0px" }}>Confirm Delete</h2>
            <p style={{ padding: "20px",paddingBottom: "0px",marginTop: 0, fontSize: "19px" }}>
              Are you sure you want to remove this photo? </p>
            <button className='yes-button' onClick={() => dispatch(deletePhotoFromAlbumThunk(albumId,photoId))
                    .then(() => setDeleteMode(false), closeModal())} >Yes (Delete Photo)
                    {/* // .then(() => closeModal())} >Yes (Delete Photo) */}
            </button>
            <button className='no-button' onClick={() => closeModal()}>No (Keep Photo)
            {/* <button className='no-button' onClick={() => setDeleteMode(false) .then(() => closeModal())}>No (Keep Photo) */}
            
            
            </button><br></br>           
        </div>   
  )
}

export default DeletePhotoModal;