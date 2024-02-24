import { useDispatch, useSelector } from "react-redux";
import "./createNewComment.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { add_comment_thunk } from "../../../redux/comments";

const CreateNewComment = ({ photo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  // const comment = useSelector(state=> state.comment.comment)
  const [comment1, setComment1] = useState("");
  const userId = useSelector((state) => state.session.user.id);
  const [errors, setErrors] = useState({});

  const user = useSelector((state) => state.session.user);
  if (!user) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //
    // Empty Comment Validation
    if (!comment1.trim()) {
      setErrors({ comment: "Comment cannot be empty" });
      return;
    }

    

    // // Special Characters Validation
    // const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
    // if (specialCharsRegex.test(comment1)) {
    //   setErrors({
    //     comment: "Sorry!! special characters are not allowed",
    //   });
    //   return;
    // }

    try {
      await dispatch(add_comment_thunk(comment1, photo));
      setComment1("");
      setErrors({});
    } catch (error) {
      console.log(error);
    }
    //

    // await dispatch(add_comment_thunk(comment1, photo));

    // setComment1("")

    // try {
    //   await dispatch(add_comment_thunk(id, comment1));
    //   setComment1("");
    //   // navigate("/:id/comments");
    // } catch (e) {
    //   return e;
    // }
  };

  return (
    <div>
      {errors.comment && <p className="error-message">{errors.comment}</p>}

      <div className="post-a-comment">
        <div className="Heading">
          <h2>Post new comment</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="comment-input-field">
            <div className="div-comment-input">
              <textarea
                id="input-comment"
                type="text"
                value={comment1}
                onChange={(e) => setComment1(e.target.value)}
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
