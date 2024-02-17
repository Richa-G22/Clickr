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

const edit_Comment = (commentId, comment) => {
    return {
        type: EDIT_COMMENT,
        payload:{commentId,comment},
    }
}

const delete_Comment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        payload:commentId,
    }
}

// Thunks

export const get_comments_thunk = () => async (dispatch) => {
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

export const add_comment_thunk=(photoId, comment)=>async(dispatch)=>{
    try {
        const response = await fetch(`/api/comments/${photoId}/postComments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment),

        });
        if (response.ok) {
            const data = await response.json();
            dispatch(add_Comment(data));
            return data;
        }else {
            throw response;
        }
    } catch (e) {
        return e;
    }
};


export const edit_comment_thunk=(commentId, comment ) =>async(dispatch)=> {
    // export const edit_comment_thunk=(commentId, formData ) =>async(dispatch)=> {
    try {
        const response = await fetch(`/api/comments/update/${commentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment),
            // body: formData
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

export const delete_comment_thunk = (commentId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/comments/delete/${commentId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },

        });
        if (response.ok) {
            const data = await response.json();
            dispatch(delete_Comment(data));
            // dispatch(delete_Comment(commentId));
            return data;
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
            new_state.allComments = action.payload;
            for(let comment of action.payload){
                new_state.byId[comment.id] = comment
            }
            return new_state;
        case ADD_COMMENT:
            new_state.allComments.push(action.payload);
            new_state.byId[action.payload.id] = action.payload;
            return new_state
        case EDIT_COMMENT:
            return { ...state, [action.comment.id]: action.comment };
        case DELETE_COMMENT:
            new_state.allComments = new_state.allComments.filter((comment) => comment.id !== action.payload.commentId); delete new_state.byId[action.payload];
            return new_state;
            default:
                return state;
            }
        };

export default commentReducer;
