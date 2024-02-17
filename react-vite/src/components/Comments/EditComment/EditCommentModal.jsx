import "./editcommentModal.css";
import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit_comment_thunk } from "../../../redux/comments";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";

const EditComment = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { closeModal } = useModal();
    // const commentId = comment.id;
    const [editedComment, setEditedComment] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const currentUser = useSelector((state) => state.session.user.id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        closeModal()
        const Acomment = {
            comment: editedComment
        }

        // if (!validationErrors.length) {
          const response = await dispatch(
            edit_comment_thunk(id, Acomment)
          );
          if (!response.ok) {
            const errors = await response.json();
            setValidationErrors(errors);
          }
        // }


    }

    return (
      <div>
        <h3>Edit comment</h3>
        {validationErrors.message && (
          <p>{validationErrors.message}</p>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            placeholder="Add a comment about this photo"
          ></textarea>
          <button type="submit">
            Edit comment
          </button>
          <button
            onClick={() => closeModal()}
          >
            Cancel
          </button>
        </form>
      </div>
    );


}

export default EditComment;
