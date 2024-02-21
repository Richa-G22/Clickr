// import { useEffect} from "react";
// import { useDispatch, useSelector } from "react-redux";
// import "./getAllComments.css";
// import { useParams } from "react-router-dom";
// import { get_comments_thunk } from "../../../redux/comments";

// const GetAllComments = () => {
//   const dispatch = useDispatch();

//   const { id } = useParams();
//   const allComments = (useSelector((state) => state.comments.allComments));

//   // const user = useSelector((state) => state.session.user.id);

//   useEffect(() => {
//     dispatch(get_comments_thunk(id));
//   }, [dispatch, id]);

//   if (!allComments || allComments.length === 0) {
//     return <div>Be the first to post a comment</div>;
//   }



//   return (
//     <div>
//       <h3>Comments</h3>
//       <div>
//         {allComments.map((comment) => (
//           <div key={comment.id}>
//             <div>{comment.comment}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GetAllComments;
