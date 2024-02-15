import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import GetAllPhotos from '../components/Photos/GetAllPhotos';
import AddPhoto from '../components/Photos/addPhoto';

import UpdatePhoto from '../components/Photos/updatePhoto';


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
        path: "/update/:photoId",
        element: <UpdatePhoto />

      },


      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
