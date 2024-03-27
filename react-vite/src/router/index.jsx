import { createBrowserRouter } from 'react-router-dom';
// Login, SignUp Components
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
// Photos Components
import AllPhotos from '../components/Photos/AllPhotos';
import DetailedPhoto from '../components/Photos/DetailedPhoto';
import CreateNewPhoto from '../components/Photos/CreateNewPhoto';
import EditPhotos from '../components/Photos/EditPhotos';
import GetCurrentUserGallery from '../components/Photos/GetCurrentUserGallery';
// Albums Components
import CurrentUserAlbums from '../components/Albums/GetCurrentUserAlbums';
import NewAlbum from '../components/Albums/CreateNewAlbum';
import DetailedAlbum from '../components/Albums/DetailedAlbum';
import UpdateAlbum from '../components/Albums/UpdateAlbum';
// Comment Components
// import GetAllComments from "../components/Comments/GetAllComments/GetAllComments";
import CreateNewComment from "../components/Comments/CreateNewComment/CreateNewComment"
import EditComment from '../components/Comments/EditComment/EditCommentModal';
import DeleteComment from '../components/Comments/DeleteComment/DeleteCommentModal';
// Favorite Components
import ViewAllFavorites from '../components/Favorites/ViewAllFavorites';

import Layout from './Layout';
import NotFound from '../components/NotFound/NotFound';
import AboutPage from '../components/About/AboutPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AllPhotos />,
        // element: <AboutPage />,
      },
      {
        path: "/about/",
        element: <AboutPage />,
      },
      {
        path: "/photos/",
        element: <AllPhotos />,
      },
      {
        path: "/photos/:id",
        element: <DetailedPhoto />,
      },
      {
        path: "/photos/new",
        element: <CreateNewPhoto />
      },
      {
        path: "/photos/current",
        element: <GetCurrentUserGallery />
      },
      {
        path: "/photos/update/:id",
        element: <EditPhotos />
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
