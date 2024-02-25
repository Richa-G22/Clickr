import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from "react";
import { detailedAlbumThunk, getCurrentUserAlbumsThunk } from '../../redux/albums';
import { NavLink, useNavigate, Route, Routes } from "react-router-dom";
import "./DetailedAlbum.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteAlbumModal from "./DeleteAlbumModal";
import DeletePhotoModal from "./DeletePhotoModal";
import AddPhotoToAlbumModal from "./AddPhotoToAlbumModal";
import { fetchPhotos } from "../../redux/photoReducer"; 
import CurrentUserAlbums from "./GetCurrentUserAlbums";

const DetailedAlbum = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const albumId = parseInt(id);
   
    const sessionUser = useSelector((state) => state.session.user);  
    const currentAlbum = useSelector((state) => state.albums.allAlbums[0]);
    const photos_available = useSelector((state) => state.photo.photos);
    
    const [isLoaded, setisLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);
     
    useEffect(() => {
        const getData = async() => {
            await dispatch(detailedAlbumThunk(albumId))
            setisLoaded(true)
        }
        getData();
    },[dispatch, albumId]);
    
    console.log("Detailed Album here", photos_available);
    return (
        <div> 
        { currentAlbum ? 
            <div>
                <div className='menu'>
                        <div>
                        <OpenModalButton 
                                    buttonText="Delete Album"
                                    modalComponent={
                                        <DeleteAlbumModal albumId={albumId}  />
                                    }       
                                    />
                        </div> &nbsp; 
                        
                        <button style={{backgroundColor: "grey", color: "white", 
                                boxShadow: "5px 5px 5px black", height: "30px", cursor: "pointer"}} 
                                onClick={() => navigate(`/albums/update/${albumId}`)}>Update Album
                        </button> &nbsp;

                        <div>
                            <OpenModalButton 
                                    buttonText="Add Photo"
                                    modalComponent={
                                        <AddPhotoToAlbumModal albumId={albumId} photos_available={photos_available} />
                                    }       
                                    />           
                        </div> &nbsp;      
                </div>     
                
                <div className="photos-grid"> 
                    {isLoaded?
                    currentAlbum.photos.map((photo) => (             
                        <NavLink key={photo.id} className="photo-div" title={photo.title}>
                           
                            <div className='line-1'></div>
                            <div className="photo-image-div">
                                <img className="photo-image" src={photo.url} alt="preview" 
                                onClick={() => navigate(`/${photo.id}`)}/>
                            </div> 
                            <div className="desc-title">
                                    <div>{photo.title} , {photo.description} </div>
                            </div>
                             
                            <div className="buttons">      
                                <OpenModalButton 
                                    buttonText="Delete Photo"
                                    modalComponent={
                                        <DeletePhotoModal albumId={albumId} photoId={photo.id}  />
                                        
                                    }       
                                />  
                            </div>    
                        </NavLink>                   
                    )):
                    <span>Loading..</span>
                } 
                </div>  
            </div>
            : <h2> 404 : Requested album does not exist</h2> }
        </div>   
    );
}

export default DetailedAlbum;