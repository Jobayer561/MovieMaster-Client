import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { LiaEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import {
  FaStar,
  FaClock,
  FaGlobe,
  FaCalendarAlt,
  FaFilm,
  FaUser,
  FaTheaterMasks,
  FaFlag,
  FaHeart,
} from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { CircleLoader } from "react-spinners";
import MovieError from "./MovieError";
import { motion } from "framer-motion";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = use(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://b12-a10-movie-master-server.vercel.app/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.result) {
          setMovie(null);
        } else {
          setMovie(data.result);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setMovie(null);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://b12-a10-movie-master-server.vercel.app/movies/${movie._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            navigate("/movies");

            Swal.fire({
              title: "Deleted!",
              text: "Movie has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const handleAddToWatchList = () => {
    const watchListData = {
      title: movie.title,
      genre: movie.genre,
      releaseYear: Number(movie.releaseYear),
      director: movie.director,
      cast: movie.cast,
      rating: Number(movie.rating),
      duration: Number(movie.duration),
      plotSummary: movie.plotSummary,
      posterUrl: movie.posterUrl,
      language: movie.language,
      country: movie.country,
      watchListBy: user?.email,
    };

    fetch(
      `https://b12-a10-movie-master-server.vercel.app/watchList/${movie._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(watchListData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.success) {
          return toast.error("Already added to your WatchList!");
        }
        toast.success("Successfully Added To My WatchList!");
      });
  };
  if (loading) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <CircleLoader color="#FF6B6B" />
      </div>
    );
  }
  if (!loading && !movie) {
    return <MovieError />;
  }
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          className="bg-base-100 rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-[500px] lg:h-full overflow-hidden">
                <img
                  src={movie?.posterUrl}
                  alt={movie?.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-black/10 lg:to-black/50"></div>

                <div className="absolute top-6 left-6">
                  <div className="flex items-center gap-2 bg-linear-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full shadow-xl font-bold">
                    <FaStar className="text-xl" />
                    <span className="text-lg">{movie?.rating}</span>
                  </div>
                </div>

                <div className="absolute top-6 right-6">
                  <div className="flex items-center gap-2 bg-linear-to-r from-[#7928CA] to-[#FF0080] text-white px-6 py-3 rounded-full shadow-xl font-bold">
                    <FaFilm />
                    <span>{movie?.genre}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="p-8 lg:p-12 flex flex-col justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 primary leading-tight">
                {movie?.title}
              </h1>

              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                {movie?.plotSummary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <FaCalendarAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Year
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {movie?.releaseYear}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <FaClock className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Duration
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {movie?.duration} mins
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-linear-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <FaGlobe className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Language
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {movie?.language}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-linear-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl">
                  <div className="p-2 bg-red-500 rounded-lg">
                    <FaFlag className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Country
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {movie?.country}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3 p-4 bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl">
                  <FaTheaterMasks className="text-indigo-500 text-xl mt-1" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                      Director
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {movie?.director}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-linear-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl">
                  <FaUser className="text-pink-500 text-xl mt-1" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                      Cast
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {movie?.cast}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-linear-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-xl">
                  <FaUser className="text-gray-500 text-xl mt-1" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                      Added By
                    </p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {movie?.addedBy}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {user && (
                  <motion.button
                    onClick={handleAddToWatchList}
                    className="w-full py-3 px-4 text-white font-bold text-lg bg-linear-to-r from-[#ff512f] to-[#dd2476] rounded-full shadow-lg  transition-all duration-300 flex items-center justify-center gap-3 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaHeart className="text-xl group-hover:scale-125 transition-transform duration-300" />
                    Add To WatchList
                  </motion.button>
                )}

                {user?.email === movie?.addedBy && (
                  <div className="flex gap-4">
                    <Link
                      to={`/movies/update/${movie._id}`}
                      className="flex-1 btn text-white bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-0 rounded-full shadow-lg hover:scale-105 transition-all duration-300 gap-2"
                    >
                      <LiaEditSolid className="text-xl" />
                      Edit Movie
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="flex-1 btn text-white bg-linear-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 border-0 rounded-full shadow-lg hover:scale-105 transition-all duration-300 gap-2"
                    >
                      <MdDelete className="text-xl" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MovieDetails;
