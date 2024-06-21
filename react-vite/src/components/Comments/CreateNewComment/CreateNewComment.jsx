import { useDispatch, useSelector } from "react-redux";
import "./createNewComment.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { add_comment_thunk } from "../../../redux/comments";
import { get_comments_thunk } from "../../../redux/comments";

let commentLength = 30;

const CreateNewComment = ({ photo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment1, setComment1] = useState("");
  const userId = useSelector((state) => state.session.user.id);
  const [errors, setErrors] = useState({});

  const user = useSelector((state) => state.session.user);
  if (!user) {
    navigate("/");
  }

      useEffect(() => {
        setErrors({});
      }, [comment1]);

  const handleInputChange = (e) => {
    const newComment = e.target.value;
    if (newComment.length <= commentLength) {
      setComment1(newComment);
      setErrors({});
    } else {
      setErrors({
        comment: `Comment cannot be longer than ${commentLength} characters`,
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Empty Comment Validation
    if (!comment1.trim()) {
      setErrors({ comment: "Comment cannot be empty" });
      return;
    }
    if (comment1.length > commentLength) {
      setErrors({
        comment: `Comment cannot be longer than ${commentLength} characters`,
      });
      return;
    }

    try {
      await dispatch(add_comment_thunk(comment1, photo));

      setComment1("");
      setErrors({});
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div>
      {errors.comment && <p className="error-message">{errors.comment}</p>}

      <div className="post-a-comment">
        <div className="Heading">
          <h3>Post new comment</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="comment-input-field">
            <div className="div-comment-input">
              <textarea
                id="input-comment"
                type="text"
                value={comment1}
                // onChange={(e) => setComment1(e.target.value)}
                onChange={handleInputChange}
                placeholder="Add a comment about this photo"
                rows="10"
                required
              />
            </div>
            <div className="comment-input-button">
              <button id="submit-button" type="submit">
                Add comment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewComment;
