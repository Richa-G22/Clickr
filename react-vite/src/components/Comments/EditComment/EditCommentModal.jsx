import "./editcommentModal.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit_comment_thunk } from "../../../redux/comments";
// import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";

const EditComment = (props) => {
  // console.log("@@@@@@@@",props)
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const commentId = props.props.comment.id;
  // console.log("@@@@@@@@comment", commentId);
  const photoId = props.props.photoId;
  const content = props.props.comment.comment;
  // console.log("^^^^^^^^", content);

  const [comment, setComment] = useState(`${content}`);
  const [errors, setErrors] = useState({});

  const user = useSelector((state) => state.session.user);
  // console.log("**************", props.props.comment);

  useEffect(() => {
    setErrors({});
  }, [comment]);


  const handleSubmit = (e) => {
    e.preventDefault();
  
    setErrors({});

    const response = dispatch(edit_comment_thunk(comment, commentId, photoId));
    closeModal();
    // console.log("~~~~~~~~~~~~~~~", response)
  };
  const handleCancelSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <>
      {errors.content ? (
        <>{errors.content}</>
      ) : (
        <div
          className="comment-edit-form"
          style={{ width: "100%", padding: "10px", border: "1px solid #ccc" }}
        >
          <form onSubmit={handleSubmit}>
            <div
              className="errors"
              style={{ color: "red", marginBottom: "10px" }}
            >
              {errors.comment}
            </div>
            <div className="edit-input">
              <textarea
                id="input_comment"
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment about this photo"
                rows="10"
                value={comment}
                style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
              ></textarea>
              <div
                className="edit-button"
                style={{ textAlign: "center",  }}
              >
                <button
                  type="submit"
                  style={{ marginRight: "5px", fontSize: "25px" }}
                >
                  Edit comment
                </button>
              </div>
              <div
                className="edit-button"
                style={{ textAlign: "center", fontSize: "30px" }}
              >
                <button
                  type="button"
                  style={{ marginRight: "5px", fontSize: "25px", color:"gray" }}
                  onClick={handleCancelSubmit}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EditComment;
