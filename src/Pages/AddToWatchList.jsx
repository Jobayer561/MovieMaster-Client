import React, { use, useEffect, useState } from "react";
import WatchListCard from "./WatchListCard";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";
import LoadingSpinner from "./LoadingSpinner";
import { motion } from "framer-motion";
import { FaEye, FaFilm, FaArrowRight } from "react-icons/fa";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

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
    <section className="min-h-screen bg-linear-to-b from-base-100 to-base-200/50 mt-4 md:mt-0">
      <div className="max-w-[1440px] mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#ff512f] to-[#dd2476] p-8 md:p-12 shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                  <FaEye className="text-3xl text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                    My WatchList
                  </h1>
                  <p className="text-white/90 text-sm md:text-base mt-1">
                    Movies you want to watch
                  </p>
                </div>
              </div>

              {!loading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6"
                >
                  <div className="bg-white/20 backdrop-blur-md rounded-xl px-5 py-3 inline-flex items-center gap-3">
                    <FaFilm className="text-2xl text-white" />
                    <div>
                      <div className="text-3xl font-bold text-white">
                        {movies.length}
                      </div>
                      <div className="text-xs text-white/80">
                        Movies in watchList
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <LoadingSpinner count={4} />
          </motion.div>
        ) : movies.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-base-100 rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden"
          >
            <div className="flex flex-col items-center py-20 px-6">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-linear-to-br from-[#ff512f]/20 to-[#dd2476]/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                  alt="Empty watchlist"
                  className="w-40 md:w-72 h-40 md:h-72 relative z-10 opacity-80"
                />
              </div>

              <h2 className="text-2xl md:text-4xl font-bold bg-linear-to-r from-[#ff512f] to-[#dd2476] bg-clip-text text-transparent mb-3">
                Your WatchList is Empty
              </h2>

              <p className="text-gray-500 text-center md:text-xl text-base max-w-md mb-8">
                Start adding movies to your watchlist to keep track of films you
                want to watch
              </p>

              <Link
                to="/movies"
                className="btn btn-lg text-white bg-linear-to-r from-[#ff512f] to-[#dd2476] hover:shadow-lg hover:-translate-y-0.5 border-0 rounded-full shadow-lg transition-all duration-300 gap-2"
              >
                <FaFilm className="text-xl" />
                Browse Movies
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </section>
  );
};

export default AddToWatchList;
