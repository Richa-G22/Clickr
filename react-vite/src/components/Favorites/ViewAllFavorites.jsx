import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from '../../redux/favorites';
import { fetchPhotos } from '../../redux/photoReducer';

function ViewAllFavorites() {
    const dispatch = useDispatch();
    const favoritePhotos = useSelector(state => state.favorites.favorites || []);
    const photos = useSelector(state => state.photo.photos);

    useEffect(() => {
        dispatch(fetchFavorites());
        dispatch(fetchPhotos()); 
    }, [dispatch]);

    const favoriteImages = photos.filter(photo => favoritePhotos.find(fav => fav.photoId === photo.id));

    return (
        <div>
            <h1>Favorites</h1>
            {favoriteImages.length > 0 ? (
                <div>
                    {favoriteImages.map(image => (
                        <div key={image.id}>
                            <p>{image.title}</p>
                            <img src={image.url} alt={image.title} />
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
