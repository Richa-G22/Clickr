import { getCurrentUserAlbumsThunk } from '../../redux/albums';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./GetCurrentUserAlbums.css";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteAlbum from "./DeleteAlbumModal";
import DeleteAlbumModal from './DeleteAlbumModal';

const CurrentUserAlbums = () => {
    const user = useSelector((state) => state.session.user);
    const allAlbums = useSelector((state) => state.albums.allAlbums);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserAlbumsThunk());
    }, [dispatch]);
   
    return (
        <div>
            {user ?
                <div>
                    <div className='menu'>
                        <NavLink style={{ textDecoration: "none", color: 'grey', fontSize: '18px' }}
                            to="/albums/new"><i className="fa-sharp fa-thin fa-plus"></i>&nbsp;New Album</NavLink>&nbsp;&nbsp;&nbsp;
                    </div>
                    {allAlbums.length?
                    <div className="albums-grid">
                        {allAlbums.map((album) => (
                            <NavLink key={album.id} className="album-div" to={`/albums/${album.id}`} title={album.title}>
                                {console.log('.....album.....', album)}
                                <div className='line-1'></div>
                                <div className="album-image-div">
                                    {album.image_url ?
                                        <img className="album-image" src={album.image_url} alt="Displaying default image" />
                                        : <img className="album-image" src="https://m.media-amazon.com/images/I/818A+u-utdL.jpg" alt="Displaying Default Image" />
                                    }
                                </div>
                                <div className="desc-title">
                                    { album.description ?
                                    <div>
                                        <div>Title: {album.title}</div>
                                        <div>Description: {album.description} </div>
                                    </div>
                                    : <div>Title: {album.title} </div> }
                                </div>
                            </NavLink>
                        ))}
                    </div>
                    : <div><h3>Let's create your first album</h3></div>}
                </div>
            : <h2>Log in required to view albums..</h2> }
        </div>
    );
}

export default CurrentUserAlbums;
