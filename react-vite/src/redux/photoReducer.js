const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
const FETCH_PHOTO_DETAILS_SUCCESS = 'FETCH_PHOTO_DETAILS_SUCCESS';
const FETCH_PHOTO_DETAILS_FAILURE = 'FETCH_PHOTO_DETAILS_FAILURE';
const CREATE_PHOTO_SUCCESS = 'CREATE_PHOTO_SUCCESS';
const CREATE_PHOTO_FAILURE = 'CREATE_PHOTO_FAILURE';
const UPDATE_PHOTO_REQUEST = 'UPDATE_PHOTO_REQUEST';
const UPDATE_PHOTO_SUCCESS = 'UPDATE_PHOTO_SUCCESS';
const UPDATE_PHOTO_FAILURE = 'UPDATE_PHOTO_FAILURE';
const DELETE_PHOTO_SUCCESS = 'DELETE_PHOTO_SUCCESS';


export const fetchPhotosSuccess = (data) => ({
  type: FETCH_PHOTOS_SUCCESS,
  payload: data || [],
});

export const fetchPhotoDetailsSuccess = (photoDetails) => ({
  type: FETCH_PHOTO_DETAILS_SUCCESS,
  payload: photoDetails,
});

export const fetchPhotoDetailsFailure = (error) => ({
  type: FETCH_PHOTO_DETAILS_FAILURE,
  payload: error,
});

export const createPhotoSuccess = (data) => ({
  type: CREATE_PHOTO_SUCCESS,
  payload: data || [],
});

export const createPhotoFailure = (errors) => ({
    type: CREATE_PHOTO_FAILURE,
    payload: errors
});

export const updatePhotoRequest = () => ({
  type: UPDATE_PHOTO_REQUEST,
});

export const updatePhotoSuccess = (photo) => ({
  type: UPDATE_PHOTO_SUCCESS,
  payload: photo,
});

export const updatePhotoFailure = (error) => ({
  type: UPDATE_PHOTO_FAILURE,
  payload: error,
});

export const deletePhotoSuccess = (id) => ({
  type: DELETE_PHOTO_SUCCESS,
  payload: id,
});

export const fetchPhotos = () => async (dispatch) => {
  try {
    const response = await fetch('/api/photo/all');
    if (!response.ok) {
      throw new Error(`Failed to fetch photos (${response.status})`);
    }
    const data = await response.json();
    console.log('API Response for fetchPhotos:', data);
    dispatch(fetchPhotosSuccess(data));
  } catch (error) {
    console.log('Error fetching photos:', error.message);

  }
};

export const fetchPhotoDetails = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/photo/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch photo details (${response.status})`);
    }
    const data = await response.json();
    dispatch(fetchPhotoDetailsSuccess(data));
  } catch (error) {
    dispatch(fetchPhotoDetailsFailure(error.message));
  }
};

export const createPhoto = (photoData) => async (dispatch) => {
  try {
    const response = await fetch('/api/photo/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(photoData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.errors.url);
    }

    const data = await response.json();
    dispatch(createPhotoSuccess(data));
  } catch (error) {
    console.error('Error creating photo:', error.message);
    return error.message;
  }
};


export const updatePhoto = (id, updatedPhotoData) => async (dispatch) => {
  try {
    dispatch(updatePhotoRequest());
    const formData = new FormData();
    formData.append('label', updatedPhotoData.label);
    formData.append('title', updatedPhotoData.title);
    formData.append('description', updatedPhotoData.description);
    formData.append('url', updatedPhotoData.url);
    const response = await fetch(`/api/photo/update/${id}`, {
      method: 'PUT',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Failed to update photo (${response.status})`);
    }
    const updatedPhoto = await response.json();
    dispatch(updatePhotoSuccess(updatedPhoto));
  } catch (error) {
    console.error('Error updating photo:', error.message);
    dispatch(updatePhotoFailure(error.message));
  }
};

export const deletePhoto = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/photo/delete/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete photo (${response.status})`);
    }
    dispatch(deletePhotoSuccess(id));
  } catch (error) {
    console.error('Error deleting photo:', error);
  }
};

const initialState = {
  photos: [],
  photoDetails: null,

};

const photoReducer = (state = initialState, action) => {
  let updatedPhotoIndex;
  switch (action.type) {
    case FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: action.payload,
      };
     case FETCH_PHOTO_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        photoDetails: action.payload,
      };
    case FETCH_PHOTO_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_PHOTO_SUCCESS:
      return {
        ...state,
        photos: [...state.photos, action.payload],
      };
      case CREATE_PHOTO_FAILURE:
            return {
                ...state,
                error: action.payload
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
        const updatedPhotos = [...state.photos];
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
    case DELETE_PHOTO_SUCCESS:
      return {
        ...state,
        photos: state.photos.filter(photo => photo.id !== action.payload),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default photoReducer;
