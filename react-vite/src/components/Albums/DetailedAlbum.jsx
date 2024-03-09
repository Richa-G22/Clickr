// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { detailedAlbumThunk } from '../../redux/albums';
// import { getAllPhotosThunk } from '../../redux/photos';
// import { NavLink, useNavigate} from "react-router-dom";
// import "./DetailedAlbum.css";
// import OpenModalButton from "../OpenModalButton/OpenModalButton";
// import DeleteAlbumModal from "./DeleteAlbumModal";
// import DeletePhotoModal from "./DeletePhotoModal";
// import AddPhotoToAlbumModal from "./AddPhotoToAlbumModal";

// const DetailedAlbum = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const albumId = parseInt(id);
//     console.log("*****", typeof id)
//     // const sessionUser = useSelector((state) => state.session.user);
//     // const currentAlbum = useSelector((state) => state.albums.byId[albumId]);
//     // //const photos_available = useSelector((state) => state.albums.byId[id].photos);
//     // const all_photos_in_state = useSelector((state) => state.photos.photos_arr);
//     // const all_photos_in_state_obj = useSelector((state) => state.photos.byId);
//     const [updateMode, setUpdateMode] = useState(false);

//     const [isLoaded, setisLoaded] = useState(false);

//     // useEffect(() => {
//     //     const getPhotos = async() => {
//     //         dispatch(getAllPhotosThunk());
//     //         dispatch(detailedAlbumThunk(albumId))
//     //         setisLoaded(true)     
//     //     }
//     //     getPhotos()
//     // }, [dispatch]);

//     // useEffect(() => {
       
//     //         const getData = async () => {
//     //         }
//     //         getData();
//     // }, [dispatch]);


//     //console.log("Detailed Album here", photos_available, typeof(photos_available));
//     console.log("All photos here", all_photos_in_state, typeof(all_photos_in_state));

//     if (!isLoaded) {
//         return <span>Loading...</span>
//     }
//     return (
//         <div>
           
//                 <div>
//                     <div style={{ paddingTop: "25px" }} className='menu'>
//                         <div>
//                             <OpenModalButton
//                                 buttonText="Delete Album"
//                                 modalComponent={
//                                     <DeleteAlbumModal albumId={albumId} />
//                                 }
//                             />
//                         </div> &nbsp;

//                         <button style={{
//                             backgroundColor: "grey", color: "white",
//                             boxShadow: "5px 5px 5px black", height: "30px", cursor: "pointer"
//                         }}
//                             onClick={() => navigate(`/albums/update/${albumId}`)}>Update Album
//                         </button> &nbsp;

//                         <div>
//                             {/* <OpenModalButton
//                                 buttonText="Add Photo"
//                                 modalComponent={
//                                     <AddPhotoToAlbumModal albumId={albumId} 
//                                                           all_photos_in_state={all_photos_in_state} 
//                                                           all_photos_in_state_obj={all_photos_in_state_obj}
//                                                           setUpdateMode={setUpdateMode}/>
//                                 }
//                             /> */}
//                         </div> &nbsp;
//                     </div>
//                     <div>
                        
//                         {/* {Object.keys(all_photos_in_state).length ? */}
//                         <div className="photos-grid">
//                             {/* {currentAlbum.photos.length > 0 ?
//                                 currentAlbum.photos.map((photo) => (
//                                     <div>
//                                         <NavLink key={photo.id} className="photo-div" to={`/photos/${photo.id}`} title={photo.title}>

//                                             <div className="polaroid">
//                                                 <img className="photo-image" src={photo.url} alt="preview"
//                                                     onClick={() => navigate(`/${photo.id}`)} />
//                                                 <div className="title">
//                                                     <p>{photo.title}</p>
//                                                 </div>
//                                             </div>
//                                         </NavLink>
//                                         <div className="buttons">
//                                             <OpenModalButton
//                                                 buttonText="Delete Photo"
//                                                 modalComponent={
//                                                     <DeletePhotoModal albumId={albumId} photoId={photo.id} />
//                                                 }
//                                             />
//                                         </div>
//                                     </div>
//                                 )) 
//                              : <h2>No photos yet</h2>  
//                             } */}
//                         </div>
//                         {/* : <h3 style={{fontStyle:"italic"}}>Please add a photo to your album !!</h3>} */}
//                     </div>
//                 </div>
               
//         </div>
//     );
// }

// export default DetailedAlbum;

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { detailedAlbumThunk, getCurrentUserAlbumsThunk } from '../../redux/albums';
import { getAllPhotosThunk } from '../../redux/photos';
import { NavLink, useNavigate } from "react-router-dom";
import "./DetailedAlbum.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteAlbumModal from "./DeleteAlbumModal";
import DeletePhotoModal from "./DeletePhotoModal";
import AddPhotoToAlbumModal from "./AddPhotoToAlbumModal";


const DetailedAlbum = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const albumId = parseInt(id);

    // const sessionUser = useSelector((state) => state.session.user);
    let currentAlbum = useSelector((state) => state.albums.byId[albumId]);
    const currentState = useSelector((state) => console.log(".....state....", state));
    const all_photos_in_state = useSelector((state) => state.photos.photos_arr);
    const all_photos_in_state_obj = useSelector((state) => state.photos.byId);
    console.log(".....id....albumId....", id, albumId);
    console.log(".......currentAlbum......", currentAlbum);

    const [isLoaded, setisLoaded] = useState(false);
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
             const getData = async() => {
                 await dispatch(getAllPhotosThunk());
                 await dispatch(getCurrentUserAlbumsThunk());
                 await dispatch(detailedAlbumThunk(albumId));
                setisLoaded(true) 
                setUpdateMode(true)    
             }
             getData()  
         }, [dispatch, albumId, setUpdateMode]);

         
    return (
        <div>
            {currentAlbum ?
                <div>
                    <div style={{ paddingTop: "25px" }} className='menu'>
                        <div>
                            <OpenModalButton
                                buttonText="Delete Album"
                                modalComponent={
                                    <DeleteAlbumModal albumId={albumId} />
                                }
                            />
                        </div> &nbsp;

                        <button style={{
                            backgroundColor: "grey", color: "white",
                            boxShadow: "5px 5px 5px black", height: "30px", cursor: "pointer"
                        }}
                            onClick={() => navigate(`/albums/update/${albumId}`)}>Update Album
                        </button> &nbsp;

                        <div>
                            <OpenModalButton
                                buttonText="Add Photo"
                                modalComponent={
                                    // <AddPhotoToAlbumModal albumId={albumId} photos_already_present={currentAlbum.photos} />
                                    <AddPhotoToAlbumModal albumId={albumId} 
                                                          all_photos_in_state={all_photos_in_state}
                                                          all_photos_in_state_obj={all_photos_in_state_obj}
                                                          setUpdateMode={setUpdateMode} 
                                                          photos_already_present={currentAlbum.photos}/>
                                }
                            />
                        </div> &nbsp;
                    </div>
                    <div>
                        {currentAlbum.photos.length > 0?
                            <div className="photos-grid">
                                {isLoaded ?                              
                                   currentAlbum.photos.map((photo) => (
                                        //<NavLink key={photo.id} className="photo-div" title={photo.title}>
                                        <div className="photo-div">
                                            <div className="polaroid">
                                                <img className="photo-image" src={photo.url} alt="preview"
                                                    onClick={() => navigate(`/photos/${photo.id}`)} />        
                                                <div className="title">
                                                    <p>{photo.title}</p>
                                                </div>
                                            </div>

                                            <div className="buttons">
                                                {/* {setUpdateMode(true)} */}
                                                <OpenModalButton
                                                    buttonText="Delete Photo"
                                                    modalComponent={
                                                        <DeletePhotoModal albumId={albumId} photoId={photo.id} setUpdateMode={setUpdateMode}/>

                                                    }
                                                />
                                            </div>
                                        {/* //</NavLink> */}
                                        </div>
                                    ))                                    
                                    :<h2>Loading..</h2>                                    
                                }
                            </div>
                             : <h3>Please add a photo to your album !!</h3>}
                    </div>
                </div>
                : <span> 404: Requested album not found !!</span>}
        </div>
    );
}

export default DetailedAlbum;