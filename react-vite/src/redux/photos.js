// Action Types
const GET_ALL_PHOTOS = "photos/GET_ALL_PHOTOS";
const GET_DETAILED_PHOTO = "photos/GET_DETAILED_PHOTO";
const CREATE_NEW_PHOTO = "photos/CREATE_NEW_PHOTO";
const GET_CURRENT_USER_PHOTOS = "photos/GET_CURRENT_USER_PHOTOS";
const DELETE_PHOTO = "photos/DELETE_PHOTO";
const UPDATE_PHOTO = "photos/UPDATE_PHOTO";

//----------------------------------------------------------------------------------------

// Action Creators
const getAllPhotos = (photos) => {
    return {
        type: GET_ALL_PHOTOS,
        payload: photos,
    };
};

const getDetailedPhoto = (id) => {
    return {
        type: GET_DETAILED_PHOTO,
        payload: id,
    }
};

const createNewPhoto = (photo) => {
    return {
        type: CREATE_NEW_PHOTO,
        payload: photo,
    }
};

const getCurrentGallery = (userId) => {
    return {
        type: GET_CURRENT_USER_PHOTOS,
        payload: userId,
    }
};

const deletePhoto = (id) => {
    return {
        type: DELETE_PHOTO,
        payload: id,
    }
};

const updatePhoto = (id) => {
    return {
        type: UPDATE_PHOTO,
        payload: id,
    }
}

//----------------------------------------------------------------------------------------

// Get all Photos
export const getAllPhotosThunk = () => async (dispatch) => {
    try {
        const response = await fetch("/api/photos/", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(getAllPhotos(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------

// Get Photo by id
export const detailedPhotoThunk = (id) => async (dispatch) => {
    try {

        const response = await fetch(`/api/photos/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(getDetailedPhoto(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------

// Create a new Photo
export const createNewPhotoThunk = (form) => async (dispatch) => {
    try {

        const { title, description, label, url, user } = form;
        const formData = new FormData()
        formData.append("title",title)
        formData.append("description",description)
        formData.append("label",label)
        formData.append("url",url)
      
        //console.log("formData in photo thunk", formData)
        const options = {
            method: 'POST',
            body: formData        
        }
        const response = await fetch(`/api/photos/new/${user}`, options);

        if (response.ok) {
            const data = await response.json();
            dispatch(createNewPhoto(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------

// Get all Photos of current logged in user
export const getCurrentUserGalleryThunk = () => async (dispatch) => {
    try {
        
        const response = await fetch("/api/photos/current", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
            const data = await response.json();
            
            dispatch(getCurrentGallery(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------

// Delete a photo by id
export const deletePhotoThunk = (id) => async (dispatch) => {
    try {
    
        const response = await fetch(`/api/photos/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
       
        if (response.ok) {
            const data = await response.json();
            dispatch(deletePhoto(id));

        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        return errors;
    }
};

//----------------------------------------------------------------------------------------
// Update a Photo AWS
export const editPhotosThunk = (id, form) => async(dispatch) => {
 
    try {
        

        const { title, description, label, url, user } = form;
        const formData = new FormData()
        formData.append("title",title)
        formData.append("description",description)
        formData.append("label",label)
        formData.append("url",url)
        
         const options = {
            method: 'PUT',
            body: formData
        };
        const response = await fetch(`/api/photos/update/${id}`, options);
        
        if (response.ok) {
            
                const data = await response.json();
                
                dispatch(updatePhoto(data));
                return data;
        } else {
                throw response;
        }
    } catch (e) {
        const errors =  e.json();
        return errors;
    }
};



//------------------------------------------------------------------------------------
// Update a Photo
// export const editPhotosThunk = (id, photo) => async(dispatch) => {
 
//     try {

//          const options = {
//             method: 'PUT',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(photo)
//         };
//         const response = await fetch(`/api/photos/update/${id}`, options);

//         if (response.ok) {

//                 const data = await response.json();
//                 dispatch(updatePhoto(data));
//                 return data;
//         } else {
//                 throw response;
//         }
//     } catch (e) {
//         const errors =  e.json();
//         return errors;
//     }
// };

//----------------------------------------------------------------------------------------

// Albums Reducer
const initialState = {
    photos_arr: [],
    byId: {}
};

const photosReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
        case GET_ALL_PHOTOS: {
            newState.photos_arr = action.payload;

            for (let i = 0; i < action.payload.length; i++) {
                let photo = action.payload[i]
                newState.byId[photo.id] = photo
            }
            return newState;
        }

        case GET_DETAILED_PHOTO: {
            newState.photos_arr.id = action.payload
            newState.byId[action.payload.id] = action.payload

            return newState;
        }

        case CREATE_NEW_PHOTO: {
            newState.photos_arr = [...newState.photos_arr, action.payload]
            newState.byId[action.payload.id] = action.payload

            return newState;
        }

        case GET_CURRENT_USER_PHOTOS: {
            const newById = {};
            newState.photos_arr = action.payload;
            for (let photo of action.payload) {
                newById[photo.id] = photo
            }
            
            newState.byId = newById
            return newState;
        }

        case DELETE_PHOTO: {
            const newById = {...newState.byId};
            delete newById[action.payload];
            newState.byId = newById

            const newPhotos = newState.photos_arr.filter((photo) => {
                return photo.id !== action.payload;
            })

            newState.photos_arr = newPhotos;
            return newState;
        }

        case UPDATE_PHOTO:
            const newArr = [...newState.photos_arr];
            const newUpdatedId = {...newState.byId};
            for(let i = 0; i < newState.photos_arr.length; i++){
                let currPhoto = newArr[i];
                if(currPhoto.id === action.payload.id){
                    newArr[i] = action.payload;
                    break;
                }
            }
            newState.photos_arr = newArr;

            newUpdatedId[action.payload.id] = action.payload;
            newState.byId = newUpdatedId
            return newState;

        default:
            return newState;
    }
};

export default photosReducer;



