import {createSlice } from "@reduxjs/toolkit";

export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const CREATE_PHOTO_SUCCESS = 'CREATE_PHOTOS_SUCCESS';
export const UPDATE_PHOTO_REQUEST = 'UPDATE_PHOTO_REQUEST';
export const UPDATE_PHOTO_SUCCESS = 'UPDATE_PHOTO_SUCCESS';
export const UPDATE_PHOTO_FAILURE = 'UPDATE_PHOTO_FAILURE';

export const fetchPhotosSuccess = (data) => {
  const photos = data || []; // If data is undefined, use an empty array
  return {
    type: FETCH_PHOTOS_SUCCESS,
    payload: photos,
  };
};

export const createPhotoSuccess = (data) => {
  const photos = data || []; // If data is undefined, use an empty array
  return {
    type: CREATE_PHOTO_SUCCESS,
    payload: photos,
  };
};

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

export const createPhoto = (photoData) => async (dispatch) => {
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
    dispatch(updatePhotoFailure(error.message));
  }
};

const photoSlice = createSlice({
  name: 'photo',
  initialState: {
    photos: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotosSuccess, (state, action) => {
      state.photos = action.payload;
    });
    builder.addCase(createPhotoSuccess, (state, action) => {
      state.photos.push(action.payload);
    });
    builder.addCase(updatePhotoSuccess, (state, action) => {
      const updatedPhotoIndex = state.photos.findIndex(photo => photo.id === action.payload.id);
      if (updatedPhotoIndex !== -1) {
        const updatedPhotos = [...state.photos];
        updatedPhotos[updatedPhotoIndex] = action.payload;
        state.photos = updatedPhotos;
      }
    });
  },
});

export default photoSlice.reducer;
