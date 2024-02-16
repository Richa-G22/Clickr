import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./createNewComment.css";
import { useParams} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { add_comment_thunk } from "../../redux/comments";


const CreateNewComment = ({photoId}) => {
    const dispatch = useDispatch();
    const navigate= useNavigate()
    const { photoId } = useParams();
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState({});

    const user = useSelector((state) => state.session.user);
    if(!user) {navigate('/') }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newComment = { comment: commentText}
    }




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
          <button type="submit">Add comment</button>
        </form>
      </div>
    );
}

export default CreateNewComment
