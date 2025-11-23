import React from "react";

import { Link } from "react-router";
import error from "../assets/Movie-Error.jpg";

const MovieError = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-center py-12 px-4">
        <img className="h-[300px]" src={error} alt="" />
        <h1 className="text-3xl md:text-5xl font-semibold mb-3 mt-8">
          Oops, Movie not found!
        </h1>
        <p className="text-gray-500 mb-3">
          The Movie you are looking for is not available.
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

export default MovieError;
