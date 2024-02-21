import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from "react";
import { detailedAlbumThunk } from '../../redux/albums';
import { NavLink, useNavigate } from "react-router-dom";
import "./DetailedAlbum.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteAlbumModal from "./DeleteAlbumModal";
import DeletePhotoModal from "./DeletePhotoModal";

const DetailedAlbum = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log('.......inside detailed Album function........');
    const { id } = useParams();
    const albumId = parseInt(id);
    console.log('.....albumId......', albumId, typeof(albumId));
    const sessionUser = useSelector((state) => state.session.user);
    
    const currentAlbum = useSelector((state) => state.albums.allAlbums[0]);
    console.log('.......currentAlbum........',currentAlbum);
    const [isLoaded, setisLoaded] = useState(false);
    
  
    useEffect(() => {
        const getData = async() => {
            await dispatch(detailedAlbumThunk(albumId))
            setisLoaded(true)
        }
        getData();
    },[dispatch, albumId]);

    if (!currentAlbum) { 
        return <h1>Loading...</h1>
    }

    return (
            <div>     
                <div className='menu'>
                        <div>
                        <OpenModalButton 
                                    buttonText="Delete Album"
                                    modalComponent={
                                        <DeleteAlbumModal albumId={albumId}  />
                                    }       
                                    />
                                    {/* {if(!currentAlbum) 
                                        navigate('/albums/all')
                                    } */}
                                    
                        </div> &nbsp; 
                        
                        {/* <NavLink style={{ textDecoration: "none", color: 'grey', fontSize: '18px', borderLeftColor: '1px solid grey' }}
                        to="/albums/update/albumId"><button style={{backgroundColor: "grey", color: "white", 
                        boxShadow: "5px 5px 5px black", height: "30px", cursor: "pointer"}}>Update Album</button></NavLink>&nbsp;&nbsp;&nbsp; */}
                        <button style={{backgroundColor: "grey", color: "white", 
                                boxShadow: "5px 5px 5px black", height: "30px", cursor: "pointer"}} 
                                onClick={() => navigate(`/albums/update/${albumId}`)}>Update Album
                        </button>      
                </div>     
                
                <div className="photos-grid"> 
                    {isLoaded?
                    currentAlbum.photos.map((photo) => (             
                        <NavLink key={photo.id} className="photo-div" title={photo.title}>
                            {console.log('.....photo.....', photo)} 
                            <div className='line-1'></div>
                            <div className="photo-image-div">
                                <img className="photo-image" src={photo.url} alt="preview" />
                            </div> 
                            <div className="desc-title">
                                    <div>{photo.description}, {photo.title}</div>
                            </div>
                            {console.log(photo.id)}   
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
)}

export default DetailedAlbum;