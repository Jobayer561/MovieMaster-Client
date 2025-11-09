import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import AllMovies from "../Pages/AllMovies";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/allMovies',
                element: <AllMovies/>
            }
        ]
    }
])