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

const getAlbumDetails = (albumId) => {
    return {
        type: GET_ALBUM_DETAILS,
        payload: albumId 
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
            dispatch(getCurrentUserAlbums(data));
            console.log('$$$$$$$$$$$$$$ data', data)
            return data;
        } else {
            throw response;
        }   
    } catch (e) {
        const errors = await response.json();
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
        const errors = await response.json();
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
        // console.log('&&&&&&&&&&&&&&response', response)
        if (response.ok) {
                const data = await response.json();
                dispatch(editAlbum(data));
                return data;
        } else {
                throw response;
        }
    } catch (e) {
        const errors = await e.json();
        return errors;
    }
};


// Add a photo to an Album
export const addPhotoToAlbumThunk = (albumId, photo) => async (dispatch) => {  
    try {
        const response = await fetch(`/api/photo/${albumId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(photo),
          });

        if (response.ok) {
                     const data = await response.json();
                     dispatch(addPhotoToAlbum(data));
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
        console.log('$$$$$$$$$inside delete photo Thunk photo...albumId', albumId, typeof(albumId))
        console.log('$$$$$$$$$inside delete photo Thunk photo....photoId', photoId, typeof(photoId))
        const response = await fetch(`/api/albums/delete/${albumId}/${photoId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        console.log('---------response------', response)
        if (response.ok) {
                dispatch(deletePhotoFromAlbum(albumId, photoId));
                console.log('$$$$$$$$$$$$$$ response in thunk', response)
                return response;
        } else {
                throw response;
        }
    } catch (e) {  
        const errors = await response.json();
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
        const errors = await response.json();
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
            delete newState[action.payload.albumId];
            console.log('......newState after delete......', newState);
            return newState;
        } 

        case UPDATE_ALBUM: {
            console.log('.....inside update Reducer....');
            console.log('......newState before update......', newState);
            return { ...state, [action.album.id]: action.album };    
        }

        case ADD_PHOTO_TO_ALBUM : {
            console.log('......inside Add photo reducer state.....', state);
            const newState = {...state}
            console.log('... new state ', newState )
            console.log('... payload ', action.payload)
            newState.albums.push(action.payload);
            return {...newState}
        }

        case DELETE_PHOTO_FROM_ALBUM : {
            console.log('......inside  photo reducer state.....', state);
            const newState = {...state}
            console.log('... new state ', newState )
            console.log('... payload ', action.payload)
            const photo = action.payload.photoId
            console.log('**********photo', photo)
            //delete newState.albums[allAlbums[0].photos.filter(item => item.id = photo)];
            console.log('*************', newState.allAlbums[0]),
            console.log('^^^^^^^^^^', newState.byId.photos)
            newState.allAlbums.map((album) => { return {...album, photos: album.photos.filter((photo) => photo.id !==photo)}})
            console.log('$$$$$$$$$$$$$$$$$$$newState', newState)
            return {...newState}
        }

        case GET_CURRENT_USER_ALBUMS : {
            // const newState = {...state};
            // console.log("^^^^^^^^^^^^^^^^^^^^^^inside reducer");
            // console.log('... new state ', newState );
            // console.log('... payload ', action.payload);
            // action.payload.forEach((album) => (newState[action.albums.id] = album));
            // return {...newState}; 
            console.log('@@@@@@@@@',action.payload);
            console.log('&&&&&&&&&&', newState);
            newState.allAlbums = action.payload;  //add payload to all albums
            for(let album of action.payload) {
                console.log('--------', album)
                newState.byId[album.id] = album
            }
            return newState;
        }

        case CREATE_NEW_ALBUM : {
            console.log('@@@@@@@@@',action.payload);
            console.log('&&&&&&&&&&', newState);
            newState.allAlbums.push(action.payload)
            newState.byId[action.payload.id] = action.payload
            return newState;
        }

        case GET_ALBUM_DETAILS : {
            console.log('@@@@@@@@@',action.payload);
            console.log('&&&&&&&&&&', newState);
            console.log('-------------initial state......', initialState)
      
            newState.allAlbums = [action.payload];
            console.log('[[[[[[[[[[[[[[[[[[[',action.payload.album.id)
            newState.byId = {}
            newState.byId[action.payload.album.id] = action.payload; 
            console.log('++++++++', newState);
            return newState;
        }
        
        default:
            return newState;
    }
};

export default albumsReducer;
