import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { detailedPhotoThunk } from '../../redux/photos';
import { NavLink, useNavigate } from "react-router-dom";
import "./DetailedPhoto.css";

const DetailedPhoto = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const photoId = parseInt(id);

    const sessionUser = useSelector((state) => state.session.user);
    const currentPhoto = useSelector((state) => state.photos.byId[id]);
    const [isLoaded, setisLoaded] = useState(false);

    console.log("&&&&&&&&&&", currentPhoto);

    useEffect(() => {
        const getData = async () => {
            await dispatch(detailedPhotoThunk(photoId))
            setisLoaded(true)
        }
        // if (!currentPhoto) {
        getData();
        // }
    }, [dispatch, photoId]);


    if (!currentPhoto) {
        return "Photo not found"
    }

    console.log("Detailed Photo here");
    return (
        <div>
            {isLoaded ?
                <div>
                    <div style={{ paddingTop: "27px" }} className="pic-detail-image-div">
                        <img className="pic-detail-preview-image" src={currentPhoto.url} alt="previewImage" />
                    </div>
                    <div className="pic-detail-info">
                        <div style={{ fontSize: "20px", fontWeight: "bold" }}> {currentPhoto.title}</div>
                        {currentPhoto.description ?
                            <div style={{ fontSize: "18px" }}>&nbsp;&nbsp;: &nbsp;&nbsp;{currentPhoto.description}</div>
                            : null}
                    </div>
                </div>
                : <span>Loading...</span>}
        </div>
    );
}

export default DetailedPhoto;