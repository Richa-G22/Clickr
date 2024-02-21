
import { useDispatch, useSelector} from "react-redux";
import "./createNewComment.css";
import { useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";

import { add_comment_thunk } from "../../../redux/comments";


const CreateNewComment = ({photo}) => {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const { id } = useParams();
  // const comment = useSelector(state=> state.comment.comment)
  const [comment1, setComment1] = useState("");
  const userId = useSelector(state => state.session.user.id);
  const [formErrors, setFormErrors] = useState({});


  const user = useSelector((state) => state.session.user);
  if (!user) {
    navigate('/');
  }

  


  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(add_comment_thunk(comment1, photo))
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
      {formErrors && (
        <p>{formErrors.comment}</p>
      )}
      <div className="post-a-comment">
        <div className="Heading">
            <h2>Post new comment</h2>
          </div>
        <form onSubmit={handleSubmit}>
          <div className="errors">{formErrors.comment}</div>
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
}

export default CreateNewComment
