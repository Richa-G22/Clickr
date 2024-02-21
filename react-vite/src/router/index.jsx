import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import GetAllPhotos from '../components/Photos/GetAllPhotos';
import AddPhoto from '../components/Photos/addPhoto';
import DeletePhotos from '../components/Photos/deletePhoto';
import UpdatePhoto from '../components/Photos/updatePhoto';
// import GetAllComments from "../components/Comments/GetAllComments/GetAllComments";
import CreateNewComment from "../components/Comments/CreateNewComment/CreateNewComment"
import EditComment from '../components/Comments/EditComment/EditCommentModal';
import DeleteComment from '../components/Comments/DeleteComment/DeleteCommentModal';

import GetPhotoDetails from '../components/Photos/getInfoByPhotoId';

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
        path: "/:id",
        element: <GetPhotoDetails />,
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
      // {
      //   path: "/:id/comments",
      //   // path: "/comments/all",
      //   element: <GetAllComments />,
      // },
      {
        path: "/:id/postComments",
        element: <CreateNewComment />,
      },
      {
        // path: "/comments/:id/update",
        path: "/:id/:id/updateComment",
        element: <EditComment />,
      },
      {
        // path: "/comments/:id/delete",
        path:"/:id/:id/commentDelete",
        element: <DeleteComment />,
      },
    ],
  },
]);
