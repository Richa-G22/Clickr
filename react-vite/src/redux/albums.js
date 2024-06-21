//Imports
//Actions -> If part of the reducers
//Action Creators -> Determining the payload
//Thunks -> Grabs from FE, goes to BE, goes back to FE
//Reducers -> Manages state(status)

// Action Types
const GET_CURRENT_USER_ALBUMS = "albums/GET_CURRENT_USER_ALBUMS";
const UPDATE_ALBUM = "albums/UPDATE_ALBUM";
const DELETE_ALBUM = "albums/DELETE_ALBUM";
const ADD_PHOTO_TO_ALBUM = "albums/ADD_PHOTO_TO_ALBUM";
const DELETE_PHOTO_FROM_ALBUM = "albums/DELETE_PHOTO_FROM_ALBUM";
const CREATE_NEW_ALBUM = "albums/CREATE_NEW_ALBUM";
const GET_ALBUM_DETAILS = "albums/GET_ALBUM_DETAILS";

// Action Creators
const createNewAlbum = (album) => {
    return {
        type: CREATE_NEW_ALBUM,
        payload: album,
    };
};

const getCurrentUserAlbums = (albums) => {
    return {
        type: GET_CURRENT_USER_ALBUMS,
        payload: albums
    };
};

const deleteAlbum = (albumId) => {
    return {
        type: DELETE_ALBUM,
        payload: albumId,
    };
};

const addPhotoToAlbum = (albumId, photo) => {
    return {
        type: ADD_PHOTO_TO_ALBUM,
        payload: {
            albumId,
            photo
        }
    }
};

const deletePhotoFromAlbum = (albumId, photoId) => {
    return {
        type: DELETE_PHOTO_FROM_ALBUM,
        payload: {
            albumId,
            photoId
        }
    };
};

const editAlbum = (albumId, album) => {
    return {
        type: UPDATE_ALBUM,
        payload: {
            albumId,
            album
        }
    };
};

const getAlbumDetails = (album) => {
    return {
        type: GET_ALBUM_DETAILS,
        payload: album
    };
};


// Thunk Action Creators
// Get the details of an album by id
export const detailedAlbumThunk = (albumId) => async (dispatch) => {
    
    try {
        const response = await fetch(`/api/albums/${albumId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        
        if(response.ok) {
            const data = await response.json();
            
            dispatch(getAlbumDetails(data));
            
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = await response.json();
        return errors;
    }
};


// Get all Albums of the logged in User
export const getCurrentUserAlbumsThunk = (albums) => async (dispatch) => {
    try {
        const response = await fetch("/api/albums/all", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        
        if(response.ok) {
            const data = await response.json();
            
            dispatch(getCurrentUserAlbums(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        // const errors = await response.json();
        return errors;
    }
};

//--------------------------------------------------------------------------
// Create a new Album with AWS
export const createNewAlbumThunk = (form) => async (dispatch) => {
    try {
        
        const { title, description, image_url, user } = form;
        const formData = new FormData()
        formData.append("title",title)
        formData.append("description",description)
        // formData.append("userId", userId)
        formData.append("image_url",image_url)
        //console.log("formData", formData)
      
        const response = await fetch(`/api/albums/new/${user}`, {
            method: "POST",
            body: formData
        });
        
        if(response.ok) {
            const data = await response.json();
            
            dispatch(createNewAlbum(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        const errors = e.json();
        
        return errors;
    }
};


// Create a new Album
// export const createNewAlbumThunk = (album) => async (dispatch) => {
//     try {
//         const response = await fetch("/api/albums/new", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(album)
//         });

//         if(response.ok) {
//             const data = await response.json();
//             dispatch(createNewAlbum(data));
//             return data;
//         } else {
//             throw response;
//         }
//     } catch (e) {
//         // const errors = await response.json();
//         return errors;
//     }
// };
//--------------------------------------------------------------------------

// Update an Album with AWS
export const editAlbumThunk = (id, form) => async (dispatch) => {
 
    try {
        const { title, description, image_url, user } = form;
        const formData = new FormData()
        formData.append("title",title)
        formData.append("description",description)
        formData.append("image_url",image_url)

        const response = await fetch(`/api/albums/update/${id}`, {
            method: "PUT",
            body: formData,
          });
        
        if (response.ok) {
            
                const data = await response.json();
                
                dispatch(editAlbum(data));
                return data;
        } else {
                throw response;
        }
    } catch (e) {
        const errors =  e.json();
        return errors;
    }
};


// Update an Album
// export const editAlbumThunk = (id, album) => async (dispatch) => {
 
//     try {
//          
//         const response = await fetch(`/api/albums/update/${id}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(album),
//           });

//         if (response.ok) {

//                 const data = await response.json();

//                 dispatch(editAlbum(data));
//                 return data;
//         } else {
//                 throw response;
//         }
//     } catch (e) {
//         // const errors = await e.json();
//         return errors;
//     }
// };

//--------------------------------------------------------------------
// Add a photo to an Album
export const addPhotoToAlbumThunk = (albumId, photo) => async (dispatch) => {
    try {
        
        const response = await fetch(`/api/albums/add/${albumId}/${photo.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(photo),
          });
        
        if (response.ok) {
                     const data = await response.json();
                     
                     dispatch(addPhotoToAlbum(albumId, photo));
                     //dispatch(refetchAlbum(albumId));
                    
                     return data;
        } else {
            throw response;
        }
    } catch (e) {
        
        const errors = await e.json();
        
        return errors;
    }
};


// Remove a photo from an Album
export const deletePhotoFromAlbumThunk = (albumId, photoId) => async (dispatch) => {
    try {

        const response = await fetch(`/api/albums/delete/${albumId}/${photoId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
       
        if (response.ok) {
            const data = await response.json();
         
            dispatch(deletePhotoFromAlbum(data.id, photoId));
            return response;
        } else {
                throw response;
        }
    } catch (e) {
        // const errors = await response.json();
        return errors;
    }
};


// Delete an Album
export const deleteAlbumThunk = (albumId) => async (dispatch) => {
    try {
        
        const response = await fetch(`/api/albums/delete/${albumId.albumId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        
        if(response.ok) {
            dispatch(deleteAlbum(albumId));
        
            return response;
        } else {
            throw response;
        }
    } catch (e) {
        // const errors = await response.json();
        return errors;
    }
};



// Albums Reducer
const initialState={
     allAlbums:[],
     byId: {}
};

const albumsReducer = (state = initialState, action) => {
     let newState = { ...state};

    switch (action.type) {
        case DELETE_ALBUM: {
            const newById = {...newState.byId};

            delete newById[action.payload.albumId];

            newState.byId = newById
            


            const newAlbums = newState.allAlbums.filter((album) => {
                return album.id !== action.payload.albumId;
            })

            newState.allAlbums = newAlbums;
            
            return newState;
        }

        case UPDATE_ALBUM: {
     
            //return { ...state, [action.album.id]: action.album };
            //return { ...state, [action.payload.albumId]: action.album };
            const newArr = [...newState.allAlbums];
            for(let i = 0; i < newState.allAlbums.length; i++){
                let currAlbum = newArr[i];
                if(currAlbum.id === action.payload.albumId.id){
                    newArr[i] = action.payload.albumId;
                    break;
                }
            }
            newState.allAlbums = newArr;
            //newState.allAlbums[0] = action.payload.albumId
            newState.byId[action.payload.albumId.id] = action.payload.albumId
            return newState;
        }

        case ADD_PHOTO_TO_ALBUM : {
           
            const newState = {...state}

            const newById = {...newState.byId[action.payload.albumId].photos}
            const image = action.payload.photo
            // newById[action.payload.albumId].photos = {...newState.byId[action.payload.albumId].photos, ...image}
            // newState.allAlbums[0].photos.push(action.payload.photo);
            newState.allAlbums[0].photos = [...newState.allAlbums[0].photos, action.payload.photo]
            // newState.byId[action.payload.albumId].photos =  [...newState.byId[action.payload.albumId].photos, action.payload.photo]
            newState.byId[action.payload.albumId].photos =  [...newState.byId[action.payload.albumId].photos, action.payload.photo]
            return newState
        }

        case DELETE_PHOTO_FROM_ALBUM : {

         
            const photo_id = action.payload.photoId
            const album_id = action.payload.albumId

            // const currentPhotos = newState.allAlbums[1].photos
            // const newPhotos = currentPhotos.filter((photo) => { 
            //      return photo.id !== photo_id
            //  })
          
            // newState.allAlbums[1].photos = newPhotos;
            // newState.byId[album_id].photos = newPhotos;

            const currentPhotos = newState.byId[album_id].photos.filter((photo) => {
                return photo.id !== photo_id
            })

            const newById = {...newState.byId} 
            newState.byId[album_id].photos = currentPhotos;

            for (let i = 0; i < newById.length; i++) {
                if (newById[i].id === album_id) {
                    newById[i].photos = currentPhotos
                }
            }
            newState.byId = JSON.parse(JSON.stringify(newById));
            return newState;
        }

        case GET_CURRENT_USER_ALBUMS : {
            newState.allAlbums = action.payload;  

            for(let album of action.payload) {
                newState.byId[album.id] = album
            }
            return newState;
        }

        case CREATE_NEW_ALBUM : {

            // newState.allAlbums.push(action.payload)
            newState.allAlbums = [...newState.allAlbums, action.payload]
            newState.byId[action.payload.id] = action.payload
            return newState;
        }

        case GET_ALBUM_DETAILS : {
        
            newState = {...state};
  
            const newAllAlbums = []
            for(let i=0; i < newState.allAlbums.length; i++){
                let album = newState.allAlbums[i]
                if(album.id === action.payload.id) {
                    newAllAlbums.push[action.payload]
                }
                newAllAlbums.push(album)
            }
            newState.allAlbums = newAllAlbums
            newState.byId[action.payload.id] = action.payload;

            return newState;
        }

        default:
            return newState;
    }
};

export default albumsReducer;
