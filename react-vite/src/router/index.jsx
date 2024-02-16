import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import GetAllPhotos from '../components/Photos/GetAllPhotos';
import AddPhoto from '../components/Photos/addPhoto';
import DeletePhotos from '../components/Photos/deletePhoto';
import UpdatePhoto from '../components/Photos/updatePhoto';
import GetAllComments from "../components/Comments/GetAllComments/GetAllComments";


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
        element: <AddPhoto />,
      },
      {
        path: "/update/:id",
        element: <UpdatePhoto />,
      },
      {
        path: "/delete/:id",
        element: <DeletePhotos />,
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
        path: "/comments/all",
        element: <GetAllComments />,
      },
    ],
  },
]);
