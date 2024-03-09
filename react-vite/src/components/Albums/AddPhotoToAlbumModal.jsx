import { addPhotoToAlbumThunk } from '../../redux/albums';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useNavigate } from "react-router-dom";
import './AddPhotoToAlbumModal.css';

function AddPhotoToAlbumModal({albumId, all_photos_in_state, all_photos_in_state_obj, setUpdateMode, photos_already_present}) {
    console.log("Add photos to modal1", albumId);
    console.log("Add photos to modal2", all_photos_in_state, typeof(all_photos_in_state));
    console.log("Photos already present", photos_already_present, typeof photos_already_present);
    const [photo, setPhoto] = useState("Select a Photo");
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    let foundError = false;
    
    const handlePhotoChange = (e) => {
        setUpdateMode(true);
        setPhoto(e.target.value)
    }
    
    return (
        <div className='main-div'>
                <h2 style={{ marginBottom: 0, paddingBottom: "0px" }}>Select Photo</h2>
        
                <select style={{width: '400px', height: '30px',paddingLeft: '10px', paddingRight: '10px', backgroundColor: 'lightyellow'}} onChange={handlePhotoChange}>
                    <option style={{display: "flex", width: "30%"}} value="Select a Photo"> -- Select a Photo -- </option>
                    {all_photos_in_state.map((photo) => <option key={photo.id} value={photo.id}>{photo.title}</option> )}
                    {/* {photos_available.map((photo) => <option key={photo.id} value={photo.id}>{photo.title}</option> )} */}
                </select>

                {/* {(() => {
                    if (parseInt(photo) in photos_already_present){
                        console.log("1", foundError);
                        foundError = true;
                        console.log("2", foundError);
                    }      
                    return null;
                })()} */}

                {(() => {
                    for (let i = 0; i < photos_already_present.length; i++) {
                        if (parseInt(photo) === photos_already_present[i].id) {
                            console.log("1", foundError);
                            foundError = true;
                            console.log("2", foundError);
                        }
                    }
                      
                    return null;
                })()}
            
                {!foundError ?
                
                <div style={{display:"flex",alignContent:"center", justifyContent:"center", flexDirection:"column", alignItems:"center", justifyItems:"center"}}>
                    <p style={{ padding: "20px",paddingBottom: "0px",marginTop: 0, fontSize: "19px" }}>
                    Are you sure you want to add this photo? </p>
                    {console.log("no error")}
                    <button className='yes-button' onClick={() => dispatch(addPhotoToAlbumThunk(albumId,all_photos_in_state_obj[parseInt(photo)])) 
                    // <button className='yes-button' onClick={() => dispatch(addPhotoToAlbumThunk(albumId,photos_available))
                            .then(() => setUpdateMode(false), closeModal())} >Yes (Add Photo) 
                            
                    </button>    
                    <button className='no-button' onClick={() => closeModal()}>No (Do not Add)
                    </button><br></br>     
                </div>
                : 
                <div style={{display:"flex",alignContent:"center", justifyContent:"center", flexDirection:"column", alignItems:"center", justifyItems:"center"}}>
                    <p style={{ padding: "20px",paddingBottom: "0px",marginTop: 0, fontSize: "19px", color:"red" }}>
                    Photo already present. </p>
                    {console.log("error")}
                    {foundError = false}
                    <button className='no-button'>Yes (Add Photo) </button>
                    <button className='no-button' onClick={() => closeModal()}>No (Do not Add)
                    </button><br></br>
                </div>}
            </div>      
    )
}

export default AddPhotoToAlbumModal;