import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const AllMoviesCard = ({ movie }) => {
  

  const { posterUrl, title, genre, releaseYear, rating, plotSummary, _id } =
    movie;
  return (
    <div>
      <div className="card border border-gray-200 hover:scale-105 transition-transform shadow-md">
        <figure className="h-50 overflow-hidden   rounded-t-md">
          <img
            className="w-full h-50 lg:h-64 object-cover rounded-t-md hover:scale-105"
            src={posterUrl}
            alt="PosterUrl"
          />
        </figure>
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title primary line-clamp-1">{title}</h2>
            <div className="badge bg-linear-to-r from-[#7928CA] to-[#FF0080] text-white border-none shadow-md px-3 py-2 font-medium tracking-wide">
              {genre}
            </div>
          </div>{" "}
          <p className="line-clamp-2 text-sm text-gray-500">{plotSummary}</p>
          <div className="card-actions justify-end mt-auto">
            <div className="badge bg-linear-to-r from-indigo-500 to-purple-500 text-white border-none">
              {releaseYear}
            </div>
            <div className="badge flex items-center gap-1 bg-linear-to-r from-yellow-400 to-orange-400 text-white  border-none">
              <FaStar className="text-yellow-700" />
              {rating}
            </div>
          </div>
          <Link
            to={`/movie-details/${_id}`}
            className="btn text-white bg-linear-to-r from-[#ff512f] to-[#dd2476] hover:scale-105 transition-transform rounded-full mt-5"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllMoviesCard;
