import { FETCH_PHOTOS_SUCCESS,
  CREATE_PHOTO_SUCCESS,
  UPDATE_PHOTO_REQUEST,
  UPDATE_PHOTO_SUCCESS,
    UPDATE_PHOTO_FAILURE,
    DELETE_PHOTO_SUCCESS} from './photoActions';

const initialState = {
  photos: [],
  loading: false,
  error: null,
};

const photoReducer = (state = initialState, action) => {
  let updatedPhotos;
  let updatedPhotoIndex;

  switch (action.type) {
    case FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: action.payload,
      };
    case CREATE_PHOTO_SUCCESS:
      return {
        ...state,
        photos: [...state.photos, action.payload],
      };
    case UPDATE_PHOTO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_PHOTO_SUCCESS:
      updatedPhotoIndex = state.photos.findIndex(
        (photo) => photo.id === action.payload.id
      );
      if (updatedPhotoIndex !== -1) {
        updatedPhotos = [...state.photos];
        updatedPhotos[updatedPhotoIndex] = action.payload;
        return {
          ...state,
          photos: updatedPhotos,
          loading: false,
        };
      }
      return state;
    case UPDATE_PHOTO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PHOTO_SUCCESS: // Handle the action for deleting a photo
      return {
        ...state,
        photos: state.photos.filter(photo => photo.id !== action.payload),
      };
    default:
      return state;
  }
};

export default photoReducer;

