import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../../redux/favorites';


function ViewAllFavorites() {
    const dispatch = useDispatch();
    const favoritePhotos = useSelector(state => state.favorites.favorites);
    const loading = useSelector(state => state.favorites.loading);
    const error = useSelector(state => state.favorites.error);

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);

    useEffect(() => {
        if (favoritePhotos.length > 0) {
            const photoIds = favoritePhotos.map(favorite => favorite.photoId);
            dispatch(fetchPhotosByIds(photoIds)); // Dispatch action to fetch photos by IDs
        }
    }, [favoritePhotos, dispatch]);

    const photos = useSelector(state => state.photo.photosByIds); // Assuming you store fetched photos by IDs in your state

    if (loading) return <div>Loading favorites...</div>;
    if (error) return <div>Error loading favorites: {error}</div>;

    return (
        <div>
            <h1>Favorites</h1>
            {photos.length > 0 ? (
                <div>
                    {photos.map(photo => (
                        <div key={photo.id}>
                            <img src={photo.url} alt={photo.title} />
                            <p>{photo.title}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No favorites added yet.</p>
            )}
        </div>
    );
}

export default ViewAllFavorites;
