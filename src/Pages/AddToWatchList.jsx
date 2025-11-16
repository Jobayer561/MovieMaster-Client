import React, { use, useEffect, useState } from "react";
import WatchListCard from "./WatchListCard";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";
import LoadingSpinner from "./LoadingSpinner";

const AddToWatchList = () => {
  const { user } = use(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    fetch(
      `https://b12-a10-movie-master-server.vercel.app/watchList?email=${user.email}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setMovies(data.data);
        setLoading(false);
      });
  }, [user, refetch]);
  const removeMovie = (id) => {
    fetch(`https://b12-a10-movie-master-server.vercel.app/watchList/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => setRefetch(!refetch));
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h3 className="text-3xl font-bold primary text-center mb-4">
        My WatchList
      </h3>

      {loading ? (
        <LoadingSpinner count={4} className="my-4" />
      ) : movies.length === 0 ? (
        <div className="flex flex-col items-center py-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="Empty"
            className="w-32 md:w-60 h-32 md:h-60 "
          />
          <p className="mt-4 text-gray-600 text-xl md:text-3xl">
            Your watchList is empty.
          </p>

          <Link
            to="/movies"
            className="btn text-white bg-linear-to-r from-[#ff512f] to-[#dd2476] hover:scale-105 transition-transform mt-4 rounded-full"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {movies.map((movie) => (
            <WatchListCard
              key={movie._id}
              movie={movie}
              removeMovie={removeMovie}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AddToWatchList;
