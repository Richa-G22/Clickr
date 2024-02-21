import { getCurrentUserAlbumsThunk } from '../../redux/albums';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./GetCurrentUserAlbums.css";
import { NavLink } from "react-router-dom";
import  OpenModalButton  from "../OpenModalButton/OpenModalButton";
import  DeleteAlbum  from "./DeleteAlbumModal";
import DeleteAlbumModal from './DeleteAlbumModal';

const CurrentUserAlbums = () => {
    const user = useSelector((state) => state.session.user.id);

    const allAlbums = useSelector((state) => state.albums.allAlbums);
    
    const dispatch = useDispatch();
    console.log('########allAlbums', allAlbums);
 
    useEffect(() => {
        dispatch(getCurrentUserAlbumsThunk());
    }, [dispatch]);
    console.log('*******after useEffect Thunk allAlbums', allAlbums);
   //   console.log('*******albumId******', albumId);
    //console.log('*******album******', album);
    return (
        <div>
            <div className='menu'>
                  {/* {user &&  */}
                  <NavLink style={{ textDecoration: "none", color: 'grey', fontSize: '18px' }}
                  to="/albums/new"><i class="fa-sharp fa-thin fa-plus"></i>&nbsp;New Album</NavLink>&nbsp;&nbsp;&nbsp;      
            </div>
            <div className="albums-grid"> 
                 {allAlbums.map((album) => (             
                    <NavLink key={album.id} className="album-div" to={`/albums/${album.id}`} title={album.title}>
                        {console.log('.....album.....', album)} 
                        <div className='line-1'></div>
                        <div className="album-image-div">
                            <img className="album-image" src={album.image_url} alt="preview" />
                        </div> 
                        <div className="desc-title">
                                <div>{album.description}, {album.title}</div>
                        </div>
                            
                        {/* <div className="buttons">
                           
                        <OpenModalButton style={{backgroundColor: "grey", color: "white", 
                                boxShadow: "5px 5px 5px black", height: "30px", cursor: "pointer"}}
                                modalComponent={<DeleteAlbumModal albumId={album.id}  />}
                                buttonText="Delete"
                                /> */}

                                {/* <button style={{backgroundColor: "grey", color: "white", 
                                                boxShadow: "5px 5px 5px black", height: "30px", cursor: "pointer"}} 
                                        onClick={() => navigate(`/spots/${spot.id}/edit`)}>Update
                                </button>    */}
                        {/* </div>     */}
                    </NavLink>                   
                ))} 
            </div>
        </div>   
    );
}

export default CurrentUserAlbums;