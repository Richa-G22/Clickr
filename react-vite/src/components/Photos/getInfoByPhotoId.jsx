import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_comments_thunk } from "../../redux/comments";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateNewComment from "../Comments/CreateNewComment/CreateNewComment";
import EditComment from "../Comments/EditComment/EditCommentModal";
import DeleteComment from "../Comments/DeleteComment/DeleteCommentModal";
import { fetchPhotoDetails } from "../../redux/photoReducer";

function GetPhotoDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const photoDetails = useSelector((state) => state.photo.photoDetails);
  const allComments = useSelector((state) => state.comments.allComments);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchPhotoDetails(id));
    dispatch(get_comments_thunk(id));
  }, [dispatch, id]);

  return (
    <div>
        lots of bugs below, need to fix
    </div>
  )

}

//   return (
//     <div>
//       {photoDetails ? (
//         <div>
//           <div>
//             <h1>Photo Details</h1>
//             <div>
//               <p>Title: {photoDetails.title}</p>
//               <p>Description: {photoDetails.description}</p>
//               <img src={photoDetails.url} alt={photoDetails.title} />
//             </div>
//           </div>

// {/* // <<<<<<< AD/frontend
// //           <div>
// //             <h1>Comments</h1>
// //             {allComments.length === 0 ? (
// //               <div>
// //                 <p>Be the first to comment!</p>
// //               </div>
// //             ) : (
// //               allComments.map((comment) => (
// //                 <div key={comment.id}>
// //                   <div>
// //                     {comment.userName} : {comment.comment}
// //                   </div>
// //                   {currentUser && currentUser.id === comment.userId && (
// //                     <span>
// //                       <OpenModalButton
// //                         buttonText={"Edit Comment"}
// //                         modalComponent={
// //                           <EditComment props={{ comment: comment, photoId: id }} />
// //                         }
// //                       />
// //                       <OpenModalButton
// //                         buttonText={"Delete Comment"}
// //                         modalComponent={<DeleteComment comment={comment} />}
// //                       />
// //                     </span>
// //                   )}
// //                 </div>
// //               ))
// //             )}
// //           </div>
// //           <div>
// //             {currentUser &&
// //               photoDetails &&
// //               currentUser.id !== photoDetails.userId && (
// //                 <div>
// //                   <CreateNewComment photo={photoDetails} />
// //                 </div>
// //               )}
// //           </div>
// //         </div>
//       ) : (
//         <div>
//           <h1>404 - Not Found</h1>
//           <p>The photo you're looking for does not exist.</p>
//         </div>
//       )}
// //======= */}
//       <div>
//         <h3>comments</h3>
//         <div>
//           {allComments.length === 0 && (
//             <span className="">
//               <div>
//                 <h3>Be the first person to comment</h3>
//               </div>
//             </span>
//           )}
//         </div>
//         <div>
//           {currentUser && photoDetails && currentUser.id !== photoDetails.userId &&
//         (
//         <div>
//           <CreateNewComment photo={photoDetails} />
//         </div>
//         )}
//       </div>
//       <div>
//         {allComments.map((comment) => (
//           <div key={comment.id}>
//             <div>
//               {comment.userName} : {comment.comment}
//             </div>

//             {currentUser && currentUser.id == comment.userId && (
//               <span>
//                 <OpenModalButton
//                   buttonText={"Edit Comment"}
//                   modalComponent={
//                     <EditComment props={{ comment: comment, photoId: id }} />
//                   }
//                 />

//                 <OpenModalButton
//                   buttonText={"Delete Comment"}
//                   modalComponent={<DeleteComment comment={comment} />}
//                 />
//               </span>
//             )}
//           </div>
//         ))}


//       </div>
//       </div>
// {/* //>>>>>>> staging */}
//     </div>
//   )
// }





export default GetPhotoDetails;
