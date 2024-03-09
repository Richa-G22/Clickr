const ALL_FAVORITES = "favorites/allFavorites";
const FAV_PHOTO = "favorites/favPhoto";
const UNFAV_PHOTO = "favorites/unfavPhoto";
const RESET = "favorites/reset";

// Action Creators

const reset = ()=> ({
  type: RESET
})

const allFavorites = (favorites) => ({
  type: ALL_FAVORITES,
  payload: favorites
})

const favPhoto = (photoId) => ({
  type: FAV_PHOTO,
  payload: photoId
})

const unfavPhoto = (photoId) => ({
  type: UNFAV_PHOTO,
  payload: photoId
})

// Thunk

export const resetFavThunk = () => async (dispatch) => {
  dispatch(reset())
}

export const allFavThunk = () => async (dispatch) => {
  try {
    const response = await fetch('/api/favorites/all');
    if(response.ok){
      const data = await response.json();
      dispatch(allFavorites(data));

      return data;
    } else{
      throw response
    }
  } catch (e) {
    return e;
  }
}

export const favPhotoThunk=(photoId)=>async(dispatch)=>{
  try {
    const response = await fetch(`/api/favorites/${photoId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      dispatch(favPhoto(photoId));
      return photoId;
    }else {
      throw response;
    }
  } catch (e) {
    return e;
  }
};


export const unfavPhotoThunk = (photoId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/favorites/${photoId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(unfavPhoto(photoId));
      return photoId;
    }else {
      throw response;
    }
  } catch (e) {
    return e;
  }
};

// Reducer

const initialState = {
    byId: {},
    allFavorites: []
};

function favoritesReducer(state = initialState, action) {
  let newState = {...state};
  switch (action.type) {
    case RESET:
      newState.byId={};
      newState.allFavorites= []
      return newState;
    case ALL_FAVORITES:
      newState.allFavorites = action.payload;

      for(let i = 0; i < action.payload.length; i++){
        let favorite = action.payload[i];
        newState.byId[favorite.photoId] = favorite
      }
      return newState

    case FAV_PHOTO:
      const newFavorite = action.payload;
      newState.allFavorites = [...newState.allFavorites, newFavorite]
      newState.byId[newFavorite.photoId] = newFavorite
      return newState;
    case UNFAV_PHOTO:
      const newById = {...newState.byId};
      delete newById[action.payload];
      newState.byId = newById

      const newAllFav = newState.allFavorites.filter((favo)=> {
        return favo.photoId !== action.payload;
      });

      newState.allFavorites = newAllFav;
      return newState;

      default:
        return state;
      }
}

export default favoritesReducer;
