import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import AllMovies from "../Pages/AllMovies";
import MyCollections from "../Pages/MyCollections";
import MovieDetails from "../Pages/MovieDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allMovies",
        element: <AllMovies />,
        loader: () => fetch("http://localhost:3000/movies"),
      },
      {
           path:'/movie-details/:id',
           element:<MovieDetails/>
      },
      {
        path: "/myCollection",
        element: <MyCollections />,
      },

    ],
  },
]);
