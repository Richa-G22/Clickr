import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { detailedPhotoThunk } from "../../redux/photos";
import { NavLink, useNavigate } from "react-router-dom";
import "./DetailedPhoto.css";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteImageModal from "./DeleteImageModal";
// ka
import { get_comments_thunk } from "../../redux/comments";
import CreateNewComment from "../Comments/CreateNewComment/CreateNewComment";
import EditComment from "../Comments/EditComment/EditCommentModal";
import DeleteComment from "../Comments/DeleteComment/DeleteCommentModal";

export const Modal = ({ src, alt, title, onClose }) => {
  return (
    <div className="modal">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <img className="modal-content" src={src} alt={alt} />
      <div className="caption">{title}</div>
    </div>
  )
}

const DetailedPhoto = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const photoId = parseInt(id);

  const sessionUser = useSelector((state) => state.session.user);
  const currentPhoto = useSelector((state) => state.photos.byId[id]);
  const [isLoaded, setisLoaded] = useState(false);
  // Ka
  const allComments = useSelector((state) => state.comments.allComments);
  // ka
  const [isOpen, setIsOpen] = useState(false)
  const showModal = () => setIsOpen(true)

  

  useEffect(() => {

    const getData = async () => {
      await dispatch(detailedPhotoThunk(photoId));
      setisLoaded(true);
    };
    // if (!currentPhoto) {
    getData();
    // }
  }, [dispatch, photoId]);

  // Ka
  useEffect(() => {
    dispatch(get_comments_thunk(photoId));
  }, [dispatch, photoId]);
  //  ka

  if (!currentPhoto) {
    return "Photo not found";
  }

  
  return (
    <div>
      <div>
        {isLoaded ? (
          <div>
            <div>
              {currentPhoto ? (
                <div>
                  {/* <div className='menu'>

                            <div>
                                <OpenModalButton
                                    buttonText="Delete Photo"
                                    modalComponent={
                                        <DeleteImageModal photoId={photoId} />
                                    }
                                />
                            </div> &nbsp;

                            <button style={{
                                backgroundColor: "grey", color: "white",
                                boxShadow: "5px 5px 5px black", height: "30px", cursor: "pointer"
                            }}
                                onClick={() => navigate(`/photos/update/${photoId}`)}>Edit Photo
                            </button> &nbsp;

                        </div> */}
                </div>
              ) : (
                <h2> 404 : Requested photo does not exist</h2>
              )}
            </div>
            <div className="pic-detail-info">
              {/* <div style={{ fontSize: "20px", fontWeight: "bold" }}> */}
              <div>
                {" "}
                <h2 style={{ textTransform: "uppercase", paddingBottom: "0", borderBottom: "0", marginBottom: "0px" }}>{currentPhoto.title}</h2>
              </div>
              {currentPhoto.description ? (
                <div style={{ paddingTop: "0", fontStyle: "italic", fontSize: "1.15rem" }}>
                  <h4>{currentPhoto.description}</h4>
                </div>
              ) : null}
            </div>

            <div className="pic-detail-image-div">
              <img
                className="pic-detail-preview-image"
                onClick={showModal}
                src={currentPhoto.url}
                alt="previewImage"
              />
              {isOpen && (
                <Modal
                  src={currentPhoto.url}
                  alt="previewImage"
                  title={currentPhoto.title}
                  onClose={() => setIsOpen(false)}
                />
              )}
            </div>
            {/* <div className="pic-detail-info">
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                {" "}
                {currentPhoto.title}
              </div>
              {currentPhoto.description ? (
                <div style={{ fontSize: "18px" }}>
                  &nbsp;&nbsp;: &nbsp;&nbsp;{currentPhoto.description}
                </div>
              ) : null}
            </div> */}
          </div>
        ) : (
          <span>Loading...</span>
        )}
      </div>
      {/* // ka */}
      <div>
        <h2
          style={{ paddingLeft: "1rem", marginTop: "30px", fontSize: "1.5rem" }}
        >
          <i className="fa-solid fa-comment"></i>
          {" "} Comments:{" "}
        </h2>
        <div>
          {allComments.length === 0 &&
            sessionUser &&
            sessionUser.id !== currentPhoto.userId && (
              <span className="">
                <div>
                  <h3 style={{ paddingLeft: "1rem" }}>
                    Be the first person to comment
                  </h3>
                </div>
              </span>
            )}
        </div>
        <div style={{ paddingLeft: "1rem", paddingBottom: "1rem" }}>
          {sessionUser &&
            currentPhoto &&
            sessionUser.id !== currentPhoto.userId && (
              <div>
                <CreateNewComment photo={currentPhoto} />
              </div>
            )}
        </div>
        <div style={{ paddingLeft: "1rem", paddingBottom: "2rem" }}>
          {allComments.map((comment) => (
            <div key={comment.id} style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontWeight: "normal",
                  fontSize: "16px",
                  marginTop: "20px",
                  marginBottom: "3px",
                  fontSize: "23px",
                  paddingBottom: "0.5rem",
                }}
              >
                {/* {comment.userName } : "{comment.comment}" */}
                <span style={{ textDecoration: "underline", fontWeight:"bold" }}>
                  {comment.userName}
                </span>{" "}
                : "{comment.comment}"
              </div>

              {sessionUser && sessionUser.id == comment.userId && (
                // <span>
                //   <OpenModalButton
                //     buttonText={"Edit Comment"}
                //     modalComponent={
                //       <EditComment props={{ comment: comment, photoId: id }} />
                //     }
                //   />

                //   <OpenModalButton
                //     buttonText={"Delete Comment"}
                //     modalComponent={<DeleteComment comment={comment} />}
                //   />
                // </span>
                <div>
                  <div style={{ display: "inline-block", marginRight: "10px" }}>
                    <OpenModalButton
                      buttonText={
                        <span
                          style={{
                            display: "inline-block",
                            width: "100px",
                            marginRight: "10px",
                          }}
                        >
                          <i
                            className="fa-solid fa-pen-to-square"
                            style={{ color: "blue", marginRight: "5px" }}
                          ></i>
                          <span style={{ color: "black", fontSize: "18px" }}>
                            Edit
                          </span>
                        </span>
                      }
                      modalComponent={
                        <EditComment
                          props={{ comment: comment, photoId: id }}
                        />
                      }
                    />
                  </div>
                  <div style={{ display: "inline-block", marginLeft: "10px" }}>
                    <OpenModalButton
                      buttonText={
                        <span
                          style={{
                            display: "inline-block",
                            width: "100px",
                            marginLeft: "10px",
                          }}
                        >
                          <i
                            className="fa-solid fa-trash"
                            style={{ color: "red", marginRight: "5px" }}
                          ></i>
                          <span style={{ color: "black", fontSize: "18px" }}>
                            Delete
                          </span>
                        </span>
                      }
                      modalComponent={<DeleteComment comment={comment} />}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* // ka */}
    </div>
  );
};



export default DetailedPhoto;
