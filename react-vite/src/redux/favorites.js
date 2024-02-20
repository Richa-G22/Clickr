const FETCH_FAVORITES_REQUEST = 'FETCH_FAVORITES_REQUEST';
const FAVORITE_PHOTO_SUCCESS = 'FAVORITE_PHOTO_SUCCESS';
const FETCH_FAVORITES_FAILURE = 'FETCH_FAVORITES_FAILURE';
const REMOVE_FROM_FAVORITES_SUCCESS = 'REMOVE_FROM_FAVORITES_SUCCESS';

// Action creators
export const fetchFavoritesRequest = () => ({
  type: FETCH_FAVORITES_REQUEST,
});

export const favoritePhotoSuccess = (photoId) => ({
  type: FAVORITE_PHOTO_SUCCESS,
  payload: {
    photoId,
  },
});

export const fetchFavoritesFailure = (error) => ({
  type: FETCH_FAVORITES_FAILURE,
  payload: error,
});

export const removeFromFavoritesSuccess = (photoId) => ({
  type: REMOVE_FROM_FAVORITES_SUCCESS,
  payload: {
    photoId,
  },
});

export const favoritePhoto = (photoId, userId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/favorites/fav/${photoId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      dispatch(favoritePhotoSuccess(photoId));
    } else {
      throw new Error('Failed to favorite photo');
    }
  } catch (error) {
    console.error('Error favoriting photo:', error.message);
  }
};

export const removeFromFavorites = (photoId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/favorites/unfav/${photoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      dispatch(removeFromFavoritesSuccess(photoId));
    } else {
      throw new Error('Failed to remove photo from favorites');
    }
  } catch (error) {
    console.error('Error removing photo from favorites:', error.message);
  }
};

const initialState = {
  favorites: []
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITE_PHOTO_SUCCESS:
      {
        const { photoId } = action.payload;
        return {
          ...state,
          favorites: [...state.favorites, photoId],
        };
      }
    case REMOVE_FROM_FAVORITES_SUCCESS:
      {
        const { photoId: removedPhotoId } = action.payload;
        return {
          ...state,
          favorites: state.favorites.filter(favId => favId !== removedPhotoId),
        };
      }
    default:
      return state;
  }
};

export default favoritesReducer;
