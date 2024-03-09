import { useState } from "react";
import { useDispatch} from "react-redux";
import { useModal } from "../../../context/Modal";
import { useParams } from "react-router-dom";
import './deletecommentModal.css';
import { delete_comment_thunk } from "../../../redux/comments";

const DeleteComment = (props)=>{
    const dispatch = useDispatch();
    const {id} = useParams()
    const commentId= props.comment.id
    const [formErrors, setFormErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setFormErrors({});
      return await dispatch(delete_comment_thunk(commentId)).then(closeModal).catch(async(response) =>{
        if (response && response.message){
          setFormErrors(response);
        }
      })
    };

    const handleCancelSubmit = (e) => {
      e.preventDefault();
      closeModal();
    };

return (
  <div className="div-comment-dlt">
    <h2>Delete Comment</h2>
    <p>Are you sure you want to delete this comment?</p>

    <button
      className="comment-dlt-button-ok"
      type="button"
      onClick={handleSubmit}
    >
      OK (Delete Comment)
    </button>

    <button
      className="comment-dlt-button-no"
      type="button"
      onClick={handleCancelSubmit}
    >
      Cancel (Keep comment)
    </button>
  </div>
);
}

export default DeleteComment;
