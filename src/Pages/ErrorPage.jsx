import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import error from "../assets/ErrorPage.png";
import { Link } from "react-router";
const ErrorPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center h-[97vh] items-center text-center py-12 px-4">
        <img className="h-[300px]" src={error} alt="" />
        <h1 className="text-3xl md:text-5xl font-semibold mb-3 mt-8">
          Oops, page not found!
        </h1>
        <p className="text-gray-500 mb-3">
          The page you are looking for is not available.
        </p>
        <Link
          to="/"
          className="btn  my-btn text-white hover:scale-105 transition-transform"
        >
          Go Back
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
