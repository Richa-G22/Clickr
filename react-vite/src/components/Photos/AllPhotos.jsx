import { getAllPhotosThunk } from "../../redux/photos";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AllPhotos.css";
import { NavLink, useNavigate } from "react-router-dom";
// ka
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import {
  allFavThunk,
  favPhotoThunk,
  unfavPhotoThunk,
} from "../../redux/favorites";
// ka

const AllPhotos = () => {
  // const user = useSelector((state) => state.session.user);
  const photos = useSelector((state) => state.photos.photos_arr);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ka
  const allFavorites = useSelector((state) => state.favorites.allFavorites);
  const currentUser = useSelector((state) => state.session.user);
  // ka

  useEffect(() => {
    const getPhotos = async () => {
      dispatch(getAllPhotosThunk());
    };
    getPhotos();
  }, [dispatch]);

  // ka
  useEffect(() => {
    if (currentUser) {
      dispatch(allFavThunk()).catch((error) => {
        console.error("Error fetching favorites:", error);
      });
    }
  }, [dispatch, currentUser]);

  const handleHeartClick = (photoId) => {
    const isFavorite = allFavorites.find((fav) => fav.photoId === photoId);

    if (!isFavorite) {
      dispatch(favPhotoThunk(photoId));
    } else {
      dispatch(unfavPhotoThunk(photoId));
    }
  };

  // ka

  if (!photos) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <div className="photos-grid">
        {photos.map((photo) => (
          <>
            <div className="photo-div">
            {/* <NavLink
              key={photo.id}
              className="photo-div"
              to={`/photos/${photo.id}`}
              title={photo.title}
            > */}
              <div className="polaroid">
                <img
                  className="photo-image"
                  onClick={() => navigate(`/photos/${photo.id}`)}
                  src={photo.url}
                  alt="Displaying default image"
                />

                <div className="title">
                  <p>{photo.title}</p>
                </div>
                {/* ka */}
                {currentUser && (
                <FontAwesomeIcon
                  icon={
                    allFavorites.find((fav) => fav.photoId === photo.id)
                      ? solidHeart
                      : regularHeart
                  }
                  onClick={() => handleHeartClick(photo.id)}
                />
              )}
                {/* ka */}
              </div>
              <div style={{ marginBottom: "30px" }}></div>
              </div>
            {/* </NavLink> */}
          </>
        ))}
      </div>
    </div>
  );
};

export default AllPhotos;
