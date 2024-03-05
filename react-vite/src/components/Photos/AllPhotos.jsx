import { getAllPhotosThunk } from '../../redux/photos';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./AllPhotos.css";
import { NavLink } from "react-router-dom";

const AllPhotos = () => {
    // const user = useSelector((state) => state.session.user);
    const photos = useSelector((state) => state.photos.photos_arr);
    const dispatch = useDispatch();


    useEffect(() => {
        const getPhotos = async() => {
            dispatch(getAllPhotosThunk());
        }
        getPhotos()

    }, [dispatch]);


    if (!photos) {
        return <h2>Loading...</h2>
    }

    return (
        <div>
            <div className="photos-grid">
                {photos.map((photo) => (
                    <NavLink key={photo.id} className="photo-div" to={`/photos/${photo.id}`} title={photo.title}>
                        
                        <div className="polaroid">
                            <img className="photo-image" src={photo.url} alt="Displaying default image" />
                            
                            <div className="title">
                                    <p>{photo.title}</p>     
                            </div>

                        </div>
                        <div style={{marginBottom:"30px"}}></div>
                    </NavLink>
                ))}
            </div>

        </div> 
    );
}


export default AllPhotos;