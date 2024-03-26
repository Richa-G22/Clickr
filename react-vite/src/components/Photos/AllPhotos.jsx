import { getAllPhotosThunk } from "../../redux/photos";
import { useEffect, useState } from "react";
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
  const navigate = useNavigate()
  // ka
  const allFavorites = useSelector((state) => state.favorites.allFavorites);
  const currentUser = useSelector((state) => state.session.user);
  const [isFav, setIsFav] = useState({})


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
      dispatch(allFavThunk()).then((favorites) => {
        let favPic = {};
        favorites.forEach((fav) => {
          favPic[fav.photoId] = true;
        });
        setIsFav(favPic);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
    }
  }, [dispatch, currentUser]);

  const handleHeartClick = async(photoId) => {
    const isFavorite = allFavorites.find((fav) => fav.photoId === photoId);

    if (isFav[photoId]) {
      await dispatch(unfavPhotoThunk(photoId));
    } else {
      await dispatch(favPhotoThunk(photoId));

    }
    setIsFav((prev) => ({ ...prev, [photoId]: !prev[photoId] }));

  };

  // ka

  if (!photos) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <div className="photos-grid">
        {photos.map((photo) => (
          // <NavLink
          //   key={photo.id}
          //   className="photo-div"
          //   // to={`/photos/${photo.id}`}
          //   title={photo.title}
          // >
          <div className="photo-div">
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
                  icon={isFav[photo.id] ? solidHeart : regularHeart}
                  onClick={() => handleHeartClick(photo.id)}
                />
              )}
              {/* ka */}
            </div>
            <div style={{ marginBottom: "30px" }}></div>
            {/* // </NavLink> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPhotos;
