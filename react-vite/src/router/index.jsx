import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import GetAllPhotos from '../components/Photos/GetAllPhotos';
import AddPhoto from '../components/Photos/addPhoto';
import DeletePhotos from '../components/Photos/deletePhoto';
import UpdatePhoto from '../components/Photos/updatePhoto';
import CurrentUserAlbums from '../components/Albums/GetCurrentUserAlbums';
import NewAlbum from '../components/Albums/CreateNewAlbum';
import DetailedAlbum from '../components/Albums/DetailedAlbum';
import UpdateAlbum from '../components/Albums/UpdateAlbum';


import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <GetAllPhotos />,
      },
      {
        path: "/new",
        element: <AddPhoto />
      },
      {
        path: "/update/:id",
        element: <UpdatePhoto />
      },
      {
        path: "/delete/:id",
        element: <DeletePhotos />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/albums/all",
        element: <CurrentUserAlbums />
      },
      {
        path: "/albums/new",
        element: <NewAlbum />
      },
      {
        path: "/albums/:id",
        element: <DetailedAlbum />
      },
      {
        path: "/albums/update/:id",
        element: <UpdateAlbum />
      },
      
    ],
  },
]);
