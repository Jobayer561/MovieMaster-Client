import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { LiaEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.result);
      });
  }, [id]);
  return (
    <div className="bg-[#170F29]">
      <div className="max-w-[1440px]  mx-auto px-4 py-8  text-gray-900 ">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 rounded-2xl p-2 overflow-hidden shadow-2xl">
          <div className="lg:w-1/2">
            <img
              src={movie?.posterUrl}
              alt={movie?.title}
              className="w-full h-[45vh] sm:h-[55vh] md:h-[70vh] lg:h-[80vh] object-cover object-center rounded-2xl"
            />
          </div>

          <div className="lg:w-1/2 mt-8 lg:mt-0 rounded-2xl p-6 md:p-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center primary mb-4">
              {movie?.title}
            </h1>

            <p className="text-[#64748B] text-center text-xl font-semibold max-w-3xl mx-auto mb-8">
              {movie?.plotSummary}
            </p>

            <div className="grid sm:grid-cols-2 gap-6 font-semibold text-[#06B6D4]">
              <p>
                <span className="font-bold text-pink-600">Genre :</span>{" "}
                {movie?.genre}
              </p>
              <p>
                <span className="font-bold text-pink-600">Release Year : </span>{" "}
                {movie?.releaseYear}
              </p>
              <p>
                <span className="font-bold text-pink-600">Director : </span>{" "}
                {movie?.director}
              </p>
              <p>
                <span className="font-bold text-pink-600">Duration : </span>{" "}
                {movie?.duration} mins
              </p>
              <p>
                <span className="font-bold text-pink-600">Rating : </span> ⭐{" "}
                {movie?.rating}
              </p>
              <p>
                <span className="font-bold text-pink-600">Language : </span>{" "}
                {movie?.language}
              </p>
              <p>
                <span className="font-bold text-pink-600">Country : </span>{" "}
                {movie?.country}
              </p>
              <p className="sm:col-span-2">
                <span className="font-bold text-pink-600">Cast : </span>{" "}
                {movie?.cast}
              </p>
              <p className="sm:col-span-2 font-semibold">
                <span className="font-bold text-pink-600">Added by : </span>{" "}
                {movie?.addedBy}
              </p>
            </div>

            <div className="mt-10 flex justify-center gap-4">
              <button className="my-btn">
                <LiaEditSolid className="text-xl" />
                Edit
              </button>
              <button className="my-btn">
                <MdDelete className="text-xl" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
