import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePhoto } from '../../redux/photos/photoActions';

function DeletePhotos() {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deletePhoto(id));
    // Optionally, you can perform additional actions after deletion, such as fetching updated photos
    // dispatch(fetchPhotos());
  };

  return (
    <div>
      <h1>Delete</h1>
      {/* Example usage: */}
      {/* <button onClick={() => handleDelete(photoId)}>Delete Photo</button> */}
    </div>
  );
}

export default DeletePhotos;
