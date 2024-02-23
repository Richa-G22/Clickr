import { addPhotoToAlbumThunk } from '../../redux/albums';
import { useEffect, useState} from "react";
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './AddPhotoToAlbumModal.css';
import GetAllPhotos from '../Photos/GetAllPhotos';

function AddPhotoToAlbumModal({albumId, photos_available}) {
    console.log("Add photos to modal1", albumId);
    console.log("Add photos to modal2", photos_available, typeof(photos_available));
  //console.log('......albumId inside addPhotoModal..albumId..',albumId.albumId, typeof(albumId));
  //console.log('......photoId inside addPhotoModal..photoId...',albumId.photoId, typeof(photoId));
  //console.log('......available photos inside modal....', photos_available, typeof(photos_available));
  const [photo, setPhoto] = useState("Select a Photo");
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handlePhotoChange = (e) => {
    setPhoto(e.target.value)
  }

  return (
        <div className='main-div'>
            <h2 style={{ marginBottom: 0, paddingBottom: "0px" }}>Select Photo</h2>
            {/* <div class="dropdown">
                <button class="dropbtn">Available Photos</button>
                <div class="dropdown-content">
                    <a href="#">Photo 1</a>
                    <a href="#">Photo 2</a>
                    <a href="#">Photo 3</a>
                </div>
            </div> */}
            <select onChange={handlePhotoChange}>
                <option style={{display: "flex", width: "30%"}} value="Select a Photo"> -- Select a Photo -- </option>
                {photos_available.map((photo) => <option key={photo.id} value={photo.description}>{photo.url}</option>)}
            </select>
            <p style={{ padding: "20px",paddingBottom: "0px",marginTop: 0, fontSize: "19px" }}>
              Are you sure you want to add this photo? </p>
            <button className='yes-button' onClick={() => dispatch(addPhotoToAlbumThunk(albumId,photo.id))
                    .then(() => closeModal())} >Yes (Add Photo)
            </button>         
        </div>   
  )
}

export default AddPhotoToAlbumModal;