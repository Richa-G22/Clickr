import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { favoritePhoto, fetchFavorites, removeFromFavorites } from '../../redux/favorites';
import { fetchPhotos } from '../../redux/photoReducer';

function ViewAllFavorites() {
    const dispatch = useDispatch();
    const favoritePhotos = useSelector(state => state.favorites.favorites || []);
    const photos = useSelector(state => state.photo.photos);
    const isLoggedIn = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchFavorites());
        dispatch(fetchPhotos());
    }, [dispatch]);

    const favoriteImages = photos.filter(photo => favoritePhotos.find(fav => fav.photoId === photo.id));

    const handleFavoriteClick = (photoId) => {
        dispatch(favoritePhoto(photoId));
        dispatch(fetchFavorites());
    };

    const handleUnfavoriteClick = (photoId) => {
        dispatch(removeFromFavorites(photoId));
        dispatch(fetchFavorites());
    };

    return (
        <div>
            {isLoggedIn ? (
                favoriteImages.length > 0 ? (
                    <div>
                        <h1>Favorites</h1>
                        {favoriteImages.map(image => (
                            <div key={image.id}>
                                <p>{image.title}</p>
                                <img src={image.url} alt={image.title} />
                                <button onClick={() => handleUnfavoriteClick(image.id)}>Unfavorite</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No favorites added yet.</p>
                )
            ) : (
                <p>Please log in to view your favorites.</p>
            )}
        </div>
    );
}

export default ViewAllFavorites;
