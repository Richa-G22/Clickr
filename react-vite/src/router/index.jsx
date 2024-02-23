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



// import GetAllComments from "../components/Comments/GetAllComments/GetAllComments";

import CreateNewComment from "../components/Comments/CreateNewComment/CreateNewComment"
import EditComment from '../components/Comments/EditComment/EditCommentModal';
import DeleteComment from '../components/Comments/DeleteComment/DeleteCommentModal';
import ViewAllFavorites from '../components/Favorites/ViewAllFavorites';

import GetPhotoDetails from '../components/Photos/getInfoByPhotoId';

import Layout from './Layout';
import NotFound from '../components/NotFound/NotFound';

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
      {
        path: "/:id/comments/new",
        element: <CreateNewComment />,
      },
      {
        path: "/:id/:id/updateComment",
        element: <EditComment />,
      },
      {
        path:"/:id/:id/commentDelete",
        element: <DeleteComment />,
      },
      {
        path:"/favorites",
        element: <ViewAllFavorites />,
      },
      {
        path:"*",
        element: <NotFound />,
      },
    ],
  },
]);
