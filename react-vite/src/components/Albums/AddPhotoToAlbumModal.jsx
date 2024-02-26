import { addPhotoToAlbumThunk } from '../../redux/albums';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useNavigate } from "react-router-dom";
import './AddPhotoToAlbumModal.css';

function AddPhotoToAlbumModal({albumId, photos_available}) {
    console.log("Add photos to modal1", albumId);
    console.log("Add photos to modal2", photos_available, typeof(photos_available));
    const [photo, setPhoto] = useState("Select a Photo");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    
    const handlePhotoChange = (e) => {
        setPhoto(e.target.value)
    }
    
    return (
        <div className='main-div'>
                <h2 style={{ marginBottom: 0, paddingBottom: "0px" }}>Select Photo</h2>
        
                <select style={{width: '400px', height: '30px',paddingLeft: '10px', paddingRight: '10px', backgroundColor: 'lightyellow'}} onChange={handlePhotoChange}>
                    <option style={{display: "flex", width: "30%"}} value="Select a Photo"> -- Select a Photo -- </option>
                    {photos_available.map((photo) => <option key={photo.id} value={photo.id}>{photo.title}</option> )}
                </select>

                <p style={{ padding: "20px",paddingBottom: "0px",marginTop: 0, fontSize: "19px" }}>
                Are you sure you want to add this photo? </p>
                <button className='yes-button' onClick={() => dispatch(addPhotoToAlbumThunk(albumId,photos_available[parseInt(photo)-1]))
                          .then(() => closeModal(), navigate("/albums/all"))} >Yes (Add Photo)
                          {/* .then(() => closeModal())} >Yes (Add Photo) */}
                          {/* .then((() => navigate("/albums/all")) .then(() => closeModal()))} >Yes (Add Photo) */}
                        {/* .then(() => closeModal())} >Yes (Add Photo) */} 
                        
                </button>    
                <button className='no-button' onClick={() => closeModal()}>No (Do not Add)
                </button><br></br>     
            </div>      
    )
}

export default AddPhotoToAlbumModal;