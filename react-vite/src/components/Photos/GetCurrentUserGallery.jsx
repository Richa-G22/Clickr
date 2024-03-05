import { getCurrentUserGalleryThunk } from '../../redux/photos';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./GetCurrentUserGallery.css";
import { NavLink, useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteImageModal from "./DeleteImageModal";


const GetCurrentUserGallery = () => {
    console.log('........inside component-----')
    const user = useSelector((state) => state.session.user);
    const currentPhotos = useSelector((state) => state.photos.photos_arr);

    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    console.log("........currentUserPhotos.....", currentPhotos)


    useEffect(() => {
        const getCurrentUserPhotos = async () => {
            dispatch(getCurrentUserGalleryThunk());
        }       
        getCurrentUserPhotos()       
    }, [dispatch]);

    if (!user) {
        return (<h2>Please log in to view your Gallery !!</h2>)
    }

    return (
        <div>
            {user?
        <div>
            <div className='menu'>
                <NavLink style={{ textDecoration: "none", color: 'grey', fontSize: '18px' }}
                    to="/photos/new"><i className="fa-sharp fa-solid fa-plus"></i>&nbsp;New Photo</NavLink>

            </div>

            {currentPhotos.length?
                <div className="photos-grid">
                   
                    {currentPhotos.map((photo) => (
                        <div className='parent-div'>
                            <NavLink key={photo.id} className="photo-div" to={`/photos/${photo.id}`} title={photo.title}>

                                <div className="gallery-polaroid">
                                    <img className="photo-image" src={photo.url} alt="Displaying default image" />

                                    <div className="title">
                                        <p>{photo.title}</p>
                                    </div>

                                </div>
                                <div style={{ marginBottom: "30px" }}></div>
                            </NavLink>
                            <div className='upadte-delete'>
                                <span style={{ paddingTop: "0px", paddingRight: "190px" }}>
                                    <OpenModalButton
                                        buttonText="- Delete "
                                        modalComponent={
                                            <DeleteImageModal id={photo.id} />
                                        }
                                    />
                                </span> &nbsp;
                                <span style={{ paddingTop: "0px" }}>
                                    <button style={{
                                        backgroundColor: "grey", color: "white",
                                        boxShadow: "5px 5px 5px black", height: "30px", cursor: "pointer"
                                    }}
                                        onClick={() => navigate(`/photos/update/${photo.id}`)}><i className="fa-sharp fa-solid fa-pen"></i> &nbsp;Edit
                                    </button> &nbsp;
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                : <div style={{ fontStyle: "italic", fontSize: "20px", fontWeight: "bold" }}>Please add your first photo !!!</div>}
        </div>
        : <h2>Please log in to view your Gallery !!</h2>}
        </div>
    );
}

export default GetCurrentUserGallery;