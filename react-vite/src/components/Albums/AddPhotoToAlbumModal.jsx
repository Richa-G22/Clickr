import { addPhotoToAlbumThunk } from '../../redux/albums';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './AddPhotoToAlbumModal.css';
import GetAllPhotos from '../Photos/GetAllPhotos';

function AddPhotoToAlbumModal(albumId) {
  console.log('......albumId inside addPhotoModal..albumId..',albumId.albumId, typeof(albumId));
  //console.log('......photoId inside addPhotoModal..photoId...',albumId.photoId, typeof(photoId));
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  return (
        <div className='main-div'>
            <h2 style={{ marginBottom: 0, paddingBottom: "0px" }}>Select Photo</h2>
            <div class="dropdown">
                <button class="dropbtn">Available Photos</button>
                <div class="dropdown-content">
                    <a href="#">Photo 1</a>
                    <a href="#">Photo 2</a>
                    <a href="#">Photo 3</a>
                </div>
            </div>
            <p style={{ padding: "20px",paddingBottom: "0px",marginTop: 0, fontSize: "19px" }}>
              Are you sure you want to add this photo? </p>
            <button className='yes-button' onClick={() => dispatch(addPhotoToAlbumThunk(albumId.albumId,albumId.photoId))
                    .then(() => closeModal())} >Yes (Add Photo)
            </button>         
        </div>   
  )
}

export default AddPhotoToAlbumModal;