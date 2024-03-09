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
    console.log("****detailedAlbumThunk ",albumId)
    try {
        const response = await fetch(`/api/albums/${albumId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        console.log('$$$$$$$$$$$$$$response in thunk', response)
        if(response.ok) {
            const data = await response.json();
            console.log('$$$$$$$$$$$$$$ before dispatch data', data)
            dispatch(getAlbumDetails(data));
            console.log('$$$$$$$$$$$$$$ after dispatch data', data)
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
        console.log('$$$$$$$$$$$$$$response in thunk', response)
        if(response.ok) {
            const data = await response.json();
            console.log('$$$$$$$$$$$$$$ data', data)
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


// Create a new Album
export const createNewAlbumThunk = (album) => async (dispatch) => {
    try {
        const response = await fetch("/api/albums/new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(album)
        });

        if(response.ok) {
            const data = await response.json();
            dispatch(createNewAlbum(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        // const errors = await response.json();
        return errors;
    }
};


// Update an Album
export const editAlbumThunk = (id, album) => async (dispatch) => {
 
    try {
         console.log('...................reached edit album think............')
         console.log('$$$$$$$$$$$$$$$$$ . id, album......',id, album)
        const response = await fetch(`/api/albums/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(album),
          });
        console.log('&&&&&&&&&&&&&&response', response)
        if (response.ok) {
            console.log('&&&&&&&&&&&&&&response', response)
                const data = await response.json();
                console.log('&&&&&&&&&&&&&&data', data)
                dispatch(editAlbum(data));
                return data;
        } else {
                throw response;
        }
    } catch (e) {
        // const errors = await e.json();
        return errors;
    }
};


// Add a photo to an Album
export const addPhotoToAlbumThunk = (albumId, photo) => async (dispatch) => {
    try {
        console.log("......in add photo to album thunk", albumId, typeof(albumId), photo, typeof(photo))
        const response = await fetch(`/api/albums/add/${albumId}/${photo.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(photo),
          });
        console.log(".............response in thunk....", response)
        if (response.ok) {
                     const data = await response.json();
                     console.log(".........data.....", data)
                     dispatch(addPhotoToAlbum(albumId, photo));
                     //dispatch(refetchAlbum(albumId));
                     console.log("SUCCESSFULL RETURN FROM DISPATCH")
                     return data;
        } else {
            throw response;
        }
    } catch (e) {
        console.log('eeeeeeeeeeeee', e)
        const errors = await e.json();
        console.log(",,,,,,,,,,,,,,,,errors......", errors)
        return errors;
    }
};


// Remove a photo from an Album
export const deletePhotoFromAlbumThunk = (albumId, photoId) => async (dispatch) => {
    try {
        // console.log('$$$$$$$$$inside delete photo Thunk photo...albumId', albumId, typeof(albumId))
        // console.log('$$$$$$$$$inside delete photo Thunk photo....photoId', photoId, typeof(photoId))
        const response = await fetch(`/api/albums/delete/${albumId}/${photoId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        // console.log('---------response------', response)
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
        console.log('$$$$$$$$$inside delete Album Thunk', albumId)
        const response = await fetch(`/api/albums/delete/${albumId.albumId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        console.log('$$$$$$$$$$$$$$response in thunk', response)
        if(response.ok) {
            dispatch(deleteAlbum(albumId));
        //console.log('$$$$$$$$$$$$$$response in thunk', response)
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
            console.log("1", newById)
            console.log("action.payload", action.payload,action.payload.albumId, typeof action.payload.albumId)
            console.log("3",newById[action.payload.albumId], typeof newById[action.payload.albumId])
            delete newById[action.payload.albumId];
            console.log("2", newById)
            newState.byId = newById
            console.log("newState...nyid", newState)


            const newAlbums = newState.allAlbums.filter((album) => {
                return album.id !== action.payload.albumId;
            })

            newState.allAlbums = newAlbums;
            console.log("&&&&&",newState.byId[action.payload.albumId])
            console.log('......newState after delete......', newState);
            return newState;
        }

        case UPDATE_ALBUM: {
            console.log('.....inside update Reducer....');
            console.log('......newState before update......', newState);
            //return { ...state, [action.album.id]: action.album };
            //return { ...state, [action.payload.albumId]: action.album };
            newState.allAlbums[0] = action.payload.albumId
            //newState.byId[albumId.id] = action.payload.albumId
            return newState;
        }

        case ADD_PHOTO_TO_ALBUM : {
            console.log('......inside Add photo reducer state.....', state);
            const newState = {...state}
            console.log('... new state ', newState )
            console.log('... payload ', action.payload)
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
            console.log("........state......", state)
            console.log(".....action.payload......", action.payload)
            console.log(".....newState.....", newState)
         
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
            console.log('@@@@@@@@@',action.payload);
            console.log('&&&&&&&&&&', newState);
            // newState.allAlbums.push(action.payload)
            newState.allAlbums = [...newState.allAlbums, action.payload]
            newState.byId[action.payload.id] = action.payload
            return newState;
        }

        case GET_ALBUM_DETAILS : {
        
            newState = {...state};
            console.log("$$$$$$", action.payload)
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
            console.log('++++++++', newState);
            return newState;
        }

        default:
            return newState;
    }
};

export default albumsReducer;
