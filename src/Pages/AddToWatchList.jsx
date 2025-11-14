import React, { use, useEffect, useState } from "react";
import WatchListCard from "./WatchListCard";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";

const AddToWatchList = () => {
  const { user } = use(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:3000/watchList?email=${user.email}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setMovies(data.data);
        setLoading(false);
      });
  }, [user, refetch]);
  const removeMovie = (id) => {
    fetch(`http://localhost:3000/watchList/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => setRefetch(!refetch)); 
  };

  if (loading) {
    return <div> Please wait ... Loading...</div>;
  }
  return (
    <div className="max-w-[1440px] mx-auto px-4 py-6">
      {movies.length === 0 ? (
        <div className="flex flex-col items-center py-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="Empty"
            className="w-32 md:w-60 h-32 md:h-60 "
          />
          <p className="mt-4 text-gray-600 text-xl md:text-3xl">Your watchlist is empty.</p>

          <Link
            to="/allMovies"
            className="btn text-white bg-linear-to-r from-[#ff512f] to-[#dd2476] hover:scale-105 transition-transform  mt-4 rounded-full"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
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
