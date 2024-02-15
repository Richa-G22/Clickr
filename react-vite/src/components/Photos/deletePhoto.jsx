import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePhoto } from '../../redux/photos/photoActions';

function DeletePhotos() {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deletePhoto(id));
  };

  return (
    <div>
      <h1>Delete</h1>
    </div>
  );
}

export default DeletePhotos;
