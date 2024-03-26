import "./editcommentModal.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit_comment_thunk } from "../../../redux/comments";
// import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";

const EditComment = (props) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const commentId = props.props.comment.id;
  const photoId = props.props.photoId;
  const content = props.props.comment.comment;
  const [comment, setComment] = useState(`${content}`);
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.session.user);


  useEffect(() => {
    setErrors({});
  }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedComment = comment.trim();
    if (!comment.trim()) {
      setErrors({ comment: "Comment cannot be empty" });
      return;
    }

    setErrors({});

    const response = dispatch(
      edit_comment_thunk(trimmedComment, commentId, photoId)
    );
    closeModal();
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
        <div className="comment-edit-form">
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
                style={{ width: "95%", padding: "10px" }}
              ></textarea>
              <div className="edit-button" style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  style={{
                    marginRight: "5px",
                    fontSize: "15px",
                    backgroundColor: "rgb(84, 132, 213)",
                    textAlign: "center",
                    padding: "10px",
                    width: "100%",
                    margin: "0 10px",
                  }}
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
                  style={{
                    marginRight: "5px",
                    fontSize: "15px",
                    color: "black",
                    backgroundColor: "rgb(120, 119, 119)",
                    padding: "10px",
                    textAlign: "center",
                    width: "100%",
                    margin: "0 10px",
                  }}
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
