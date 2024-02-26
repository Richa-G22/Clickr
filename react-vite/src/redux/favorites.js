const FETCH_FAVORITES_REQUEST = 'FETCH_FAVORITES_REQUEST';
const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';
const FETCH_FAVORITES_FAILURE = 'FETCH_FAVORITES_FAILURE';
const FAVORITE_PHOTO_SUCCESS = 'FAVORITE_PHOTO_SUCCESS';
const REMOVE_FROM_FAVORITES_SUCCESS = 'REMOVE_FROM_FAVORITES_SUCCESS';

export const fetchFavoritesRequest = () => ({
  type: FETCH_FAVORITES_REQUEST,
});

// export const fetchFavoritesSuccess = (userId, favorites) => ({
//   type: FETCH_FAVORITES_SUCCESS,
//   payload: {
//     userId,
//     favorites,
//   },
// });
export const fetchFavoritesSuccess = ( favorites) => ({
  type: FETCH_FAVORITES_SUCCESS,
  payload: {
    favorites,
  },
});

export const fetchFavoritesFailure = (error) => ({
  type: FETCH_FAVORITES_FAILURE,
  payload: error,
});

export const favoritePhotoSuccess = (photo) => ({
  type: FAVORITE_PHOTO_SUCCESS,
  payload: {
    photo,
  },
});

export const removeFromFavoritesSuccess = (photoId) => ({
  type: REMOVE_FROM_FAVORITES_SUCCESS,
  payload: {
    photoId,
  },
});

// export const fetchFavorites = () => async (dispatch) => {
//   try {
//     const response = await fetch('/api/favorites/all');
//     console.log("@@@@2", response)
//     if (!response.ok) {
//       throw new Error(`Failed to fetch user favorites (${response.status})`);
//     }
//     const data = await response.json();
//     console.log("Response data:", data);
//     if (!data || !data.favorites) {
//       throw new Error('Invalid response format: Missing favorites data');
//     }
//     dispatch(fetchFavoritesSuccess(data.favorites));
//   } catch (error) {
//     dispatch(fetchFavoritesFailure(error.message));
//   }
// };
export const fetchFavorites = () => async (dispatch) => {
  try {
    const response = await fetch(`/api/favorites/all`);
    console.log("@@@@2", response)
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
          body: JSON.stringify( {photoId}  ),
        });

        if (response.ok) {
            dispatch(favoritePhotoSuccess( photoId));
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
  favoritesByUser: {},
  // loading: false,
  // error: null,
};

const favoritesReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    // case FETCH_FAVORITES_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null,
    //   };

    case FETCH_FAVORITES_SUCCESS: {
  const newState = { ...state };
  newState.favorites = action.payload.favorites; // Assign array to favorites
  for (let favorite of action.payload.favorites) {
    newState.favoritesByUser[favorite.id] = favorite;
  }
  return newState;
}
    // case FETCH_FAVORITES_SUCCESS:
    //   const { userId, favorites } = action.payload;
    //   console.log(action.payload, "$$$$$$$")
    //   console.log(favorites, "##########")
    //   return {
    //     ...state,
    //     favorites: favorites.map(favorite => favorite.photoId),

    //     favoritesByUser: {
    //       ...state.favoritesByUser,
    //       [userId]: favorites,
    //     },
    //   };
    // case FETCH_FAVORITES_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     favorites: [],
    //   };
    case FAVORITE_PHOTO_SUCCESS:
      const { photoId } = action.payload;
      return {
        ...state,
        favorites: [...state.favorites, photoId],
      };
    case REMOVE_FROM_FAVORITES_SUCCESS:
      const { photoId: removedPhotoId } = action.payload;
      return {
        ...state,
        favorites: state.favorites.filter(favId => favId !== removedPhotoId),
      };
    default:
      return state;
  }
};

export default favoritesReducer;
