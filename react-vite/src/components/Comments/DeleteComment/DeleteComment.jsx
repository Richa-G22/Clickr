// import { useState } from "react";

import { useDispatch} from "react-redux";
import { useModal } from "../../context/Modal";
import './deletecomment.css';
import { delete_comment_thunk } from "../../redux/comments";

const DeleteComment = ({commentId})=>{
    const dispatch = useDispatch();
    const { closeModal } = useModal();

return (
  <div className="div-comment-dlt">
    <h2>Delete Comment</h2>
    {errors.message && <p>{errors.message}</p>}
    <p>Are you sure you want to delete this comment?</p>

    <button
      className="comment-dlt-button-ok"
      onClick={() =>
        dispatch(delete_comment_thunk(commentId)).then(() => {
          //   spotFetch();
          closeModal();
        })
      }
    >
      OK (Delete Comment)
    </button>

    <button className="comment-dlt-button-no" onClick={() => closeModal()}>
      Cancel (Keep comment)
    </button>
  </div>
);
}

export default DeleteComment;
