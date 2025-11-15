import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import AllMovies from "../Pages/AllMovies";
import MyCollections from "../Pages/MyCollections";
import MovieDetails from "../Pages/MovieDetails";
import Registration from "../Pages/Registration";
import Login from "../Pages/Login";
import PrivateRoute from "./PrivateRoute";
import AddMovies from "../Pages/AddMovies";
import UpdatePage from "../Pages/UpdatePage";
import AddToWatchList from "../Pages/AddToWatchList";
import ErrorPage from "../Pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <AllMovies />,
        loader: () =>
          fetch("https://b12-a10-movie-master-server.vercel.app/movies"),
      },
      {
        path: "/movies/:id",
        element: (
          <PrivateRoute>
            <MovieDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-collection",
        element: (
          <PrivateRoute>
            <MyCollections />
          </PrivateRoute>
        ),
      },
      {
        path: "/add",
        element: (
          <PrivateRoute>
            <AddMovies />
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdatePage />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://b12-a10-movie-master-server.vercel.app/movies/${params.id}`
          ),
      },
      {
        path: "/myWatchList",
        element: (
          <PrivateRoute>
            <AddToWatchList />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
