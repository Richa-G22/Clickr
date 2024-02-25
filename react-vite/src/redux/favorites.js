const FETCH_FAVORITES_REQUEST = 'FETCH_FAVORITES_REQUEST';
const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';
const FETCH_FAVORITES_FAILURE = 'FETCH_FAVORITES_FAILURE';
const FAVORITE_PHOTO_SUCCESS = 'FAVORITE_PHOTO_SUCCESS';
const REMOVE_FROM_FAVORITES_SUCCESS = 'REMOVE_FROM_FAVORITES_SUCCESS';

export const fetchFavoritesRequest = () => ({
  type: FETCH_FAVORITES_REQUEST,
});

export const fetchFavoritesSuccess = (userId, favorites) => ({
  type: FETCH_FAVORITES_SUCCESS,
  payload: {
    userId,
    favorites,
  },
});

export const fetchFavoritesFailure = (error) => ({
  type: FETCH_FAVORITES_FAILURE,
  payload: error,
});

export const favoritePhotoSuccess = (photoId) => ({
  type: FAVORITE_PHOTO_SUCCESS,
  payload: {
    photoId,
  },
});

export const removeFromFavoritesSuccess = (photoId) => ({
  type: REMOVE_FROM_FAVORITES_SUCCESS,
  payload: {
    photoId,
  },
});

export const fetchFavorites = () => async (dispatch) => {
  try {
    const response = await fetch('/api/favorites/all');
    if (!response.ok) {
      throw new Error(`Failed to fetch user favorites (${response.status})`);
    }
    const data = await response.json();
    console.log("Response data:", data);
    if (!data || !data.favorites) {
      throw new Error('Invalid response format: Missing favorites data');
    }
    dispatch(fetchFavoritesSuccess(data.favorites));
  } catch (error) {
    dispatch(fetchFavoritesFailure(error.message));
  }
};
export const favoritePhoto = (photoId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/favorites/fav/${photoId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ photoId }),
        });

        if (response.ok) {
            dispatch(favoritePhotoSuccess( photoId ));
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
  favorites: [],
  favoritesByUser: {}
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVORITES_REQUEST:
      return {
        ...state,
      };
  case FETCH_FAVORITES_SUCCESS:
  const { userId, favorites } = action.payload;
  return {
    ...state,
    loading: false,
    favoritesByUser: {
      ...state.favoritesByUser,
      [userId]: favorites,
    },
    favorites: favorites, // Update favorites state with received data
  };
    case FETCH_FAVORITES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        favorites: [],
      }
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
