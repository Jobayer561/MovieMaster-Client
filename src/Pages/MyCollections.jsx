import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import AllMoviesCard from "./AllMoviesCard";
import LoadingSpinner from "./LoadingSpinner";
import { motion } from "framer-motion";
import { FaHeart, FaFilm, FaPlus, FaBookmark } from "react-icons/fa";
import { Link } from "react-router";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

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
    <section className="min-h-screen bg-linear-to-b from-base-100 to-base-200/50 mt-4 md:mt-0">
      <div className="max-w-[1440px] mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#ff512f] to-[#dd2476] p-8 md:p-12 shadow-2xl">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                  <FaBookmark className="text-3xl text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                    My Collection
                  </h1>
                  <p className="text-white/90 text-sm md:text-base mt-1">
                    Your personal movie library
                  </p>
                </div>
              </div>

              {!loading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-4 mt-6"
                >
                  <div className="bg-white/20 backdrop-blur-md rounded-xl px-5 py-3 flex items-center gap-3">
                    <FaFilm className="text-2xl text-white" />
                    <div>
                      <div className="text-3xl font-bold text-white">
                        {movies.length}
                      </div>
                      <div className="text-xs text-white/80">Movies</div>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-md rounded-xl px-5 py-3 flex items-center gap-3">
                    <FaHeart className="text-2xl text-white" />
                    <div>
                      <div className="text-xs text-white/80">Curated by</div>
                      <div className="text-sm font-semibold text-white">
                        {user?.displayName || "You"}
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
            <div className="flex flex-col items-center py-16 px-6">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-linear-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                  alt="Empty collection"
                  className="w-40 md:w-64 h-40 md:h-64 relative z-10 opacity-80"
                />
              </div>

              <h2 className="text-2xl md:text-4xl font-bold bg-linear-to-r from-rose-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                Your Collection is Empty
              </h2>

              <p className="text-gray-500 text-center md:text-xl text-base max-w-md mb-8">
                Start building your personal movie library by adding your
                favorite films
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/all-movies"
                  className="btn btn-lg text-white bg-linear-to-r from-[#ff512f] to-[#dd2476] border-0 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <FaFilm className="text-xl" />
                  Browse Movies
                </Link>

                <Link
                  to="/add-movie"
                  className="btn btn-lg btn-outline border-2 border-blue-500 text-indigo-600 hover:bg-blue-500 hover:text-white hover:border-indigo-500 rounded-full transition-all duration-300"
                >
                  <FaPlus className="text-xl" />
                  Add New Movie
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <AllMoviesCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyCollections;
