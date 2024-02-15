import { createSlice } from "@reduxjs/toolkit";

export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const CREATE_PHOTO_SUCCESS = 'CREATE_PHOTO_SUCCESS';
export const UPDATE_PHOTO_REQUEST = 'UPDATE_PHOTO_REQUEST';
export const UPDATE_PHOTO_SUCCESS = 'UPDATE_PHOTO_SUCCESS';
export const UPDATE_PHOTO_FAILURE = 'UPDATE_PHOTO_FAILURE';
export const DELETE_PHOTO_SUCCESS = 'DELETE_PHOTO_SUCCESS';

export const fetchPhotosSuccess = (data) => ({
  type: FETCH_PHOTOS_SUCCESS,
  payload: data || [],
});

export const createPhotoSuccess = (data) => ({
  type: CREATE_PHOTO_SUCCESS,
  payload: data || [],
});

export const updatePhotoRequest = () => ({
  type: UPDATE_PHOTO_REQUEST,
});

export const updateSinglePhotoSuccess = (photo) => ({
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
<<<<<<< Updated upstream

    console.log('API Response for fetchPhotos:', data);

=======
    console.log('API Response for fetchPhotos:', data);
>>>>>>> Stashed changes
    dispatch(fetchPhotosSuccess(data));
  } catch (error) {
    console.log('Error fetching photos:', error.message);
    // Dispatch an action to update Redux store with error if needed
  }
};

export const createPhoto = (photoData) => async (dispatch) => {
<<<<<<< Updated upstream
    try {
        // Perform API request to create a new photo
        const response = await fetch('/api/photo/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(photoData),
        });

        if (!response.ok) {
            throw new Error(`Failed to create photo (${response.status})`);
        }

        // Fetch photos again after creating the new photo to update the state
        const fetchData = await fetch('/api/photo/all');
        if (!fetchData.ok) {
            throw new Error(`Failed to fetch photos (${fetchData.status})`);
        }
        const data = await fetchData.json();

        // Dispatch the action to update the photos state with the new data
        dispatch(fetchPhotosSuccess(data));



    } catch (error) {
        console.error('Error creating photo:', error.message);
=======
  try {
    const response = await fetch('/api/photo/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(photoData),
    });
    if (!response.ok) {
      throw new Error(`Failed to create photo (${response.status})`);
>>>>>>> Stashed changes
    }
    const data = await response.json();
    dispatch(createPhotoSuccess(data));
  } catch (error) {
    console.error('Error creating photo:', error.message);
    // Dispatch an action to update Redux store with error if needed
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
    dispatch(updateSinglePhotoSuccess(updatedPhoto));
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
  } catch (error) {
    console.error('Error deleting photo:', error);
    // Handle errors as needed
  }
};

const photoSlice = createSlice({
  name: 'photo',
  initialState: {
    photos: [],
    loading: false,
    error: null,
  },
  reducers: {}, // Define additional reducers if needed
  extraReducers: (builder) => {
    builder.addCase(fetchPhotosSuccess, (state, action) => {
      state.photos = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createPhotoSuccess, (state, action) => {
      state.photos.push(action.payload);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateSinglePhotoSuccess, (state, action) => {
      const updatedPhotoIndex = state.photos.findIndex(photo => photo.id === action.payload.id);
      if (updatedPhotoIndex !== -1) {
        state.photos[updatedPhotoIndex] = action.payload;
        state.loading = false;
        state.error = null;
      }
    });
    builder.addCase(updatePhotoRequest, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePhotoFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default photoSlice.reducer;
