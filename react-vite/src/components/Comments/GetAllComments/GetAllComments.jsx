import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./getAllComments.css";
import { get_comments_thunk } from "../../../redux/comments";

const GetAllComments = (photoId) => {


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_comments_thunk(photoId));
  }, [dispatch, photoId]);

  const allComments = useSelector((state) => state.comments);


  if (allComments.length === 0) {
      return <div>Be the first to post a comment</div>;
  }

  return (
    <div>
      <h3>Comment</h3>
      <div>
        {allComments.map((comment) => (
          <div key={comment.id}>
            <div>{comment.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllComments;
