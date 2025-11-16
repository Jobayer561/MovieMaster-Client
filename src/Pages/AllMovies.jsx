import React, { useState } from "react";
import { useLoaderData } from "react-router";
import AllMoviesCard from "./AllMoviesCard";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import notFound from "../assets/movie-not-found.webp";
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const AllMovies = () => {
  const data = useLoaderData();
  const [movies, setMovies] = useState(data);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [loading, setLoading] = useState(false);
  const filterApplied =
    selectedGenre !== "" || minRating !== "" || maxRating !== "";

  const handleFilter = (e) => {
    e.preventDefault();

    let url = "https://b12-a10-movie-master-server.vercel.app/moviesFilter?";
    if (selectedGenre) url += `genre=${selectedGenre}&`;
    if (minRating) url += `minRating=${minRating}&`;
    if (maxRating) url += `maxRating=${maxRating}`;
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="text-2xl md:text-3xl font-bold primary">
          All Movies
        </div>

        <form
          onSubmit={handleFilter}
          className="flex items-center gap-3 flex-wrap md:flex-nowrap"
        >
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="select select-info w-40"
          >
            <option value="">Select a Genre</option>
            <option>Action</option>
            <option>Comedy</option>
            <option>Drama</option>
            <option>Horror</option>
            <option>Sci-Fi</option>
            <option>Adventure</option>
            <option>Biography</option>
            <option>Crime</option>
            <option>Family</option>
            <option>Romance</option>
            <option>Thriller</option>
            <option>Other</option>
          </select>

          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="input input-info w-28"
            placeholder="Min Rating"
          />

          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={maxRating}
            onChange={(e) => setMaxRating(e.target.value)}
            className="input input-info w-28"
            placeholder="Max Rating"
          />

          <button className=" btn text-white bg-linear-to-r from-[#ff512f] to-[#dd2476] hover:scale-105 transition-transform rounded-full">
            Apply Filter
          </button>
        </form>
      </div>
      {loading ? (
        <div className="w-full">
          <LoadingSpinner />
        </div>
      ) : movies.length === 0 && filterApplied ? (
        <div className="flex flex-col items-center py-20">
          <img
            src={notFound}
            alt="Empty"
            className="w-32 md:w-60 h-32 md:h-60 "
          />
          <p className="text-gray-600 text-xl md:text-3xl">
            No Movies Matches your Filter
          </p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {movies.map((movie) => (
            <AllMoviesCard key={movie._id} movie={movie} />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default AllMovies;
