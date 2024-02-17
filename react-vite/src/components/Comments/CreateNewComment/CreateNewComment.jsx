import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./createNewComment.css";
import { useParams} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { add_comment_thunk } from "../../../redux/comments";


const CreateNewComment = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate()
    const { id } = useParams();
    const [comment, setComment] = useState("");
    // const [validationErrors, setValidationErrors] = useState({});
    const currentUser = useSelector((state) => state.session.user.id)
    // console.log("^^^^^^^", currentUser)


    // // if(!currentUser) {navigate('/') }
    //    const newComment = {
    //      comment: comment,
    //      userId: currentUser,
    //      photoId: id,
    //    };
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("^^^^^^^^^^id", id, comment)
      const newComment = await dispatch(add_comment_thunk( id, comment ));


        // navigate("/:id/comments");

    } catch (e) {
        return e
    };

};

return (
      <div>
        <h2>Post new comment</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment about this photo"
            required
          ></textarea>
          <button  type="submit">Add comment</button>
        </form>
      </div>
    );
}

export default CreateNewComment
