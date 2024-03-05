import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
// import { createPhoto } from '../../redux/photoReducer';

// // Function to check if the URL leads to an image
// const checkImageUrl = async (imageUrl) => {
//     const supportedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
//     const urlParts = imageUrl.split('.');
//     const extension = urlParts[urlParts.length - 1].toLowerCase();

    
//     if (supportedExtensions.includes(extension)) {
//         return true;
//     }


//     try {
//         const response = await fetch(imageUrl);
//         if (response.ok) {
//             const contentType = response.headers.get('content-type');
//             return contentType.startsWith('image/');
//         } else {
//             return false;
//         }
//     } catch (error) {
//         console.error('Error checking image URL:', error);
//         return false;
//     }
// };

function AddPhotos() {
    const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const errors = useSelector(state => state.photo.error);
//     const [photoData, setPhotoData] = useState({
//         title: '',
//         description: '',
//         url: ''
//     });
//     const [formErrors, setFormErrors] = useState({});

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPhotoData(prevData => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const validate = async () => {
//         let errors = {};

//         if (!photoData.title.trim()) {
//             errors.title = 'Title is required';
//         }

//         if (!photoData.description.trim()) {
//             errors.description = 'Description is required';
//         }

//         if (!photoData.url.trim()) {
//             errors.url = 'URL is required';
//         } else if (!/^http(s)?:\/\/.+\..+$/.test(photoData.url.trim())) {
//             errors.url = 'Enter a valid URL';
//         } else {

//             const isImage = await checkImageUrl(photoData.url.trim());
//             if (!isImage) {
//                 errors.url = 'URL must lead to an image (JPEG, JPG, GIF, or PNG)';
//             }
//         }

//         setFormErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const isValid = await validate();
//         if (isValid) {
//             try {
//                 await dispatch(createPhoto(photoData));
//                 navigate('/');
//             } catch (error) {
//                 console.error('Error creating photo:', error.message);
//             }
//         } else {
//             console.log('Form has errors:', formErrors);
//         }
//     };

//     return (
//         <div>
//             <h2>Add Photo</h2>
//             {errors && errors.message && <p className="error">{errors.message}</p>}
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Title</label>
//                     <input type="text" name="title" value={photoData.title} onChange={handleChange} />
//                     {formErrors && formErrors.title && <p className="error">{formErrors.title}</p>}
//                 </div>
//                 <div>
//                     <label>Description</label>
//                     <input type="text" name="description" value={photoData.description} onChange={handleChange} />
//                     {formErrors && formErrors.description && <p className="error">{formErrors.description}</p>}
//                 </div>
//                 <div>
//                     <label>URL</label>
//                     <input type="text" name="url" value={photoData.url} onChange={handleChange} />
//                     {formErrors && formErrors.url && <p className="error">{formErrors.url}</p>}
//                 </div>
//                 <div>
//                     <button type="submit">Submit</button>
//                 </div>
//             </form>
//         </div>
//     );
 }

export default AddPhotos;
