const GET_COMMENTS = 'GET_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

// actions

const get_comments = (comments) => {
    return {
        type: GET_COMMENTS,
        payload: comments,
    }
}

const add_Comment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment,
    }
}

const edit_Comment = (id) => {
    return {
        type: EDIT_COMMENT,
        payload:id
    }
}


const delete_Comment = (id) => {

    return {
        type: DELETE_COMMENT,
        payload: id
    }
}

// Thunks

export const get_comments_thunk = (photoId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/comments/${photoId}`)
        if (response.ok) {
            const data = await response.json();
            dispatch(get_comments(data));
            return data;
        } else {
            throw response;
        }
    } catch (e) {
        return e;
    }
};

export const add_comment_thunk=(comment)=>async(dispatch)=>{

    try {
        const response = await fetch(`/api/comments/${photo.id}/postComments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(comment),
            body: JSON.stringify({comment})
        });
        if (response.ok) {
            const data = await response.json();
            // console.log("!!!!!!data", data)
            dispatch(add_Comment(data));
            return data;
        }else {
            throw response;
        }
    } catch (e) {
        return e;
    }
};


export const edit_comment_thunk=(comment, id, photoId ) =>async(dispatch)=> {
    try {
        const response = await fetch(`/api/comments/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({comment: comment.comment}),
            //  body: JSON.stringify(comment),
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(edit_Comment(data));
            return data;
        }else {
            throw response;
        }
    } catch (e) {
        return e;
    }
};





export const delete_comment_thunk = (id) => async (dispatch) => {
    try {
        // console.log("+++++++++++id", id)
        const response = await fetch(`/api/comments/delete/${id}`, {
            method: "DELETE",

        });
        if (response.ok) {
            const data = await response.json();
            // dispatch(delete_Comment(data));
            dispatch(delete_Comment(id));
            return data;
            // return "comment deleted"
        }else {
            throw response;
        }
    } catch (e) {
        return e;
    }
};

// Reducer
const initialState={
    allComments:[],
    byId: {}
};
const commentReducer = (state=initialState, action)=> {
    let new_state = {...state};
    switch(action.type){
        case GET_COMMENTS:
            // console.log("**************", action.payload);
            new_state.allComments = action.payload;
            for(let comment of action.payload){
                new_state.byId[comment.id] = comment
            }
            return new_state;
        case ADD_COMMENT:
            // console.log("%%%%%%%%%%%%", action.payload)
            new_state.allComments.push(action.payload);
            new_state.byId[action.payload.id] = action.payload;
            return new_state;
        case EDIT_COMMENT:
            const index = new_state.allComments.findIndex((comment) => comment.id === action.payload.id);
            new_state.allComments[index] = action.payload;
            new_state.byId[action.payload.id] = action.payload;
            return new_state;

        case DELETE_COMMENT:
            new_state.allComments = new_state.allComments.filter((comment) => comment.id !== action.payload);
            delete new_state.byId[action.payload];
            return new_state;
            default:
                return state;
            }
        };

export default commentReducer;
