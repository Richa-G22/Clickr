import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotoDetails } from '../../redux/photos/photoReducer';

function GetPhotoDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const photoDetails = useSelector(state => state.photo.photoDetails);
    console.log(photoDetails, "!!!!!!!!!")
    useEffect(() => {
        dispatch(fetchPhotoDetails(id));
    }, [dispatch, id]);

    return (
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
    );
}

export default GetPhotoDetails;
