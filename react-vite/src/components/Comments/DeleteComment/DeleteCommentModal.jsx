import { useState } from "react";
import { useDispatch} from "react-redux";
import { useModal } from "../../../context/Modal";
import { useParams } from "react-router-dom";
import './deletecommentModal.css';
import { delete_comment_thunk } from "../../../redux/comments";

const DeleteComment = (props)=>{
  // console.log("______",props)
    const dispatch = useDispatch();
    const {id} = useParams()
    const commentId= props.comment.id
    // console.log("&&&&&&", commentId)
    // const [formErrors, setFormErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
      e.preventDefault();
      // setErrors({});
      try{
        await dispatch(delete_comment_thunk(commentId)).then(closeModal)


      } catch (e) {
        return e
      }
   
    };

    const handleCancelSubmit = (e) => {
      e.preventDefault();
      closeModal();
    };

return (
  <div className="div-comment-dlt">
    <h2>Delete Comment</h2>
    {/* {formErrors.message && <p>{formErrors.message}</p>} */}

    <p>Are you sure you want to delete this comment?</p>

    <button
      className="comment-dlt-button-ok"
      // onClick={() =>
      //   dispatch(delete_comment_thunk(commentId)).then(() => {
      //     closeModal();
      //   })
      // }
      type="button"
      onClick={handleSubmit}
    >
      OK (Delete Comment)
    </button>

    <button
      className="comment-dlt-button-no"
      // onClick={() => closeModal()}
      type="button"
      onClick={handleCancelSubmit}
    >
      Cancel (Keep comment)
    </button>
  </div>
);
}

export default DeleteComment;
