import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotoDetails } from '../../redux/photos/photoReducer';
// import { get_comments_thunk } from '../../redux/comments';

function GetPhotoDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const photoDetails = useSelector(state => state.photo.photoDetails);
    console.log(photoDetails, "!!!!!!!!!")
    useEffect(() => {
        dispatch(fetchPhotoDetails(id));
    }, [dispatch, id]);

    // const allComments = useSelector((state) => state.comments.allComments);

    // // const user = useSelector((state) => state.session.user.id);

    // useEffect(() => {
    //   dispatch(get_comments_thunk(id));
    // }, [dispatch, id]);

    // if (!allComments || allComments.length === 0) {
    //   return <div>Be the first to post a comment</div>;
    // }

    return (
      <div>
        <div>
          <h1>Photo Details</h1>
          {photoDetails && (
            <div>
              <p>Title: {photoDetails.title}</p>
              <p>Description: {photoDetails.description}</p>

              <img src={photoDetails.url} alt={photoDetails.title} />
            </div>
          )}
        </div>
        {/* <div>
          <h3>Comments</h3>
          <div>
            {allComments.map((comment) => (
              <div key={comment.id}>
                <div>{comment.comment}</div>
              </div>
            ))}
          </div> */}
        </div>

    );
}

export default GetPhotoDetails;
