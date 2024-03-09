import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allFavThunk, unfavPhotoThunk } from "../../redux/favorites";
import { getAllPhotosThunk } from "../../redux/photos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import "./ViewAllFavorites.css";

function ViewAllFavorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.allFavorites);
  const photos = useSelector((state) => state.photos.photos_arr);
  const isLoggedIn = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(allFavThunk());
    dispatch(getAllPhotosThunk());
  }, [dispatch]);

  const handleUnfavorite = (photoId) => {
    dispatch(unfavPhotoThunk(photoId));
  };

  return (
    <div className="ViewAllFavorites-container">
      <div>
        <h2 className="all-fav-title">All Favorites</h2>
        <div className="fav-grid">
          {isLoggedIn ? (
            favorites.length > 0 ? (
              favorites.map((favorite) => {
                const photo = photos.find(
                  (favPhoto) => favPhoto.id === favorite.photoId
                );
                if (!photo) return null;
                return (
                  <div
                    className="fav-item"
                    key={favorite.id}
                    title={photo.title}
                  >
                    <div>
                      <img
                        className="fav-photo"
                        src={photo.url}
                        alt={photo.title}
                      />
                      <div>
                        <p className="fav-title">{photo.title}</p>
                      </div>
                    </div>
                    <div>
                      {isLoggedIn && (
                        <FontAwesomeIcon
                          icon={solidHeart}
                          onClick={() => handleUnfavorite(photo.id)}
                          className="favorite-heart-icon"
                        />
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No favorites added yet.</p>
            )
          ) : (
            <div>
              <p>Please log in to view your favorites.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewAllFavorites;
