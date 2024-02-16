import { useDispatch} from 'react-redux';
import { deletePhoto } from '../../redux/photos/photoReducer';

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
