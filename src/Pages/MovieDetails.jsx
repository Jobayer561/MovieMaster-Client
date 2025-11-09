import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

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
    <div className="max-w-[1440px] mx-auto px-4 py-8 bg-white text-gray-900 ">
      <div className="w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
        <img
          src={movie?.posterUrl}
          alt={movie?.title}
          className="w-full h-[45vh] sm:h-[55vh] md:h-[70vh] lg:h-[80vh] object-cover object-center"
        />
      </div>
      <div className="w-full max-w-6xl mx-auto mt-8 rounded-2xl p-6 md:p-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center bg-linear-to-r from-[#ff512f] to-[#dd2476] bg-clip-text text-transparent mb-4">
          {movie?.title}
        </h1>

        <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8 leading-relaxed">
          {movie?.plotSummary}
        </p>

        <div className="grid sm:grid-cols-2 gap-6 text-gray-800">
          <p>
            <span className="font-semibold text-pink-600">Genre:</span>{" "}
            {movie?.genre}
          </p>
          <p>
            <span className="font-semibold text-pink-600">Release Year:</span>{" "}
            {movie?.releaseYear}
          </p>
          <p>
            <span className="font-semibold text-pink-600">Director:</span>{" "}
            {movie?.director}
          </p>
          <p>
            <span className="font-semibold text-pink-600">Duration:</span>{" "}
            {movie?.duration} mins
          </p>
          <p>
            <span className="font-semibold text-pink-600">Rating:</span> ⭐{" "}
            {movie?.rating}
          </p>
          <p>
            <span className="font-semibold text-pink-600">Language:</span>{" "}
            {movie?.language}
          </p>
          <p>
            <span className="font-semibold text-pink-600">Country:</span>{" "}
            {movie?.country}
          </p>
          <p className="sm:col-span-2">
            <span className="font-semibold text-pink-600">Cast:</span>{" "}
            {movie?.cast}
          </p>
          <p className="sm:col-span-2 text-sm text-gray-500">
            Added by: {movie?.addedBy}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="my-btn">Edit</button>
          <button className="my-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
