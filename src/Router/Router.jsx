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
import DashboardLayout from "../DashBoard/DashboardLayout";
import Profile from "../DashBoard/Profile";
import Statistics from "../DashBoard/Statistics";
import UpdateProfile from "../DashBoard/UpdateProfile";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";

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
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/movies/:id",
        element: <MovieDetails />,
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
        path: "/movies/update/:id",
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
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,

    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "my-collection",
        element: (
          <PrivateRoute>
            <MyCollections />
          </PrivateRoute>
        ),
      },
      {
        path: "add-movies",
        element: (
          <PrivateRoute>
            <AddMovies />
          </PrivateRoute>
        ),
      },
      {
        path: "watchlist",
        element: (
          <PrivateRoute>
            <AddToWatchList />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "profile/edit",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
