import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import AllMoviesCard from "./AllMoviesCard";
import LoadingSpinner from "./LoadingSpinner";
const MyCollections = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(
      `https://b12-a10-movie-master-server.vercel.app/myCollection?email=${user.email}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="">
      <div className="max-w-7xl mx-auto py-4 px-4">
        <h3 className="text-3xl font-bold primary text-center mb-4">
          My Collection
        </h3>

        {loading ? (
          <div className="mt-8">
            <LoadingSpinner count={4} />
          </div>
        ) : movies.length === 0 ? (
          <div className="flex flex-col items-center py-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt=""
              className="w-32 md:w-52 h-32 md:h-52"
            />
            <h2 className="mt-6 text-[16px] md:text-2xl font-semibold text-gray-700">
              Your collection is empty
            </h2>
            <p className="mt-4 text-gray-500 text-center md:text-xl text-sm max-w-md">
              You haven't added any movies yet. Add a movie to see it appear
              here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {movies.map((movie) => (
              <AllMoviesCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCollections;
