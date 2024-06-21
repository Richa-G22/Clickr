import { getCurrentUserAlbumsThunk } from '../../redux/albums';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./GetCurrentUserAlbums.css";
import { NavLink } from "react-router-dom";

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
                                
                                <div className="album-image-div">
                                
                                    {album.image_url ?
                                        <img className="album-image" src={album.image_url} alt="Displaying default image" />
                                        : <img className="album-image" src="https://static.vecteezy.com/system/resources/thumbnails/021/979/500/small_2x/old-retro-camera-on-vintage-background-90-s-concepts-vintage-style-filtered-photo.jpg  " alt="Displaying Default Image" />
                                    }
                                    <div className="albums-title">{album.title}</div>
                                </div>
                                {/* <div className="album-title">{album.title}</div> */}
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
