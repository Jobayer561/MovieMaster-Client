import React, { useState } from "react";
import { useLoaderData } from "react-router";
import AllMoviesCard from "./AllMoviesCard";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import notFound from "../assets/movie-not-found.webp";
import {
  FaFilter,
  FaFilm,
  FaStar,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

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
  const [movies, setMovies] = useState(data.movies || []);
  const [currentPage, setCurrentPage] = useState(data.currentPage || 1);
  const [totalPages, setTotalPages] = useState(data.totalPages || 1);
  const [totalMovies, setTotalMovies] = useState(data.totalMovies || 0);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [sortBy, setSortBy] = useState("duration-desc");
  const [loading, setLoading] = useState(false);
  const filterApplied =
    selectedGenre !== "" ||
    minRating !== "" ||
    maxRating !== "" ||
    sortBy !== "duration-desc";

  const fetchMovies = (page = 1) => {
    const [sortField, sortOrder] = sortBy.split("-");
    let url = `https://b12-a10-movie-master-server.vercel.app/movies?page=${page}&limit=8&sortBy=${sortField}&sortOrder=${sortOrder}`;

    if (filterApplied) {
      url = `https://b12-a10-movie-master-server.vercel.app/moviesFilter?page=${page}&limit=8&sortBy=${sortField}&sortOrder=${sortOrder}`;
      if (selectedGenre) url += `&genre=${selectedGenre}`;
      if (minRating) url += `&minRating=${minRating}`;
      if (maxRating) url += `&maxRating=${maxRating}`;
    }

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.movies);
        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setTotalMovies(data.totalMovies);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch(() => setLoading(false));
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchMovies(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchMovies(page);
    }
  };

  const clearFilters = () => {
    setSelectedGenre("");
    setMinRating("");
    setMaxRating("");
    setSortBy("duration-desc");
    fetchMovies(1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`btn btn-sm ${
            currentPage === i
              ? "bg-gradient-to-r from-[#ff512f] to-[#dd2476] text-white border-0"
              : "btn-outline"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#ff512f] to-[#dd2476] p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

          <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FaFilm className="text-4xl text-white" />
                <h1 className="text-3xl md:text-5xl font-extrabold text-white">
                  All Movies
                </h1>
              </div>
              <p className="text-white/90 text-sm md:text-base">
                Discover {totalMovies} amazing movies in our collection
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="bg-base-100 rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-purple-600 text-xl" />
            <h2 className="text-xl font-bold primary">Filter Movies</h2>
          </div>

          <form onSubmit={handleFilter} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaFilm className="text-purple-500" />
                    Genre
                  </span>
                </label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="select select-bordered w-full  focus:border-purple-500 transition-all"
                >
                  <option value="">All Genres</option>
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
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    Min Rating
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                  className="input input-bordered w-full focus:outline-none focus:border-yellow-500 transition-all"
                  placeholder="e.g., 7.0"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaStar className="text-orange-500" />
                    Max Rating
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={maxRating}
                  onChange={(e) => setMaxRating(e.target.value)}
                  className="input input-bordered w-full focus:outline-none focus:border-orange-500 transition-all"
                  placeholder="e.g., 10.0"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaFilter className="text-indigo-500" />
                    Sort By Duration
                  </span>
                </label>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="select select-bordered w-full focus:border-indigo-500 transition-all"
                >
                  <option value="duration-desc">Longest First</option>
                  <option value="duration-asc">Shortest First</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap mt-2 justify-center">
              <button
                type="submit"
                className="btn btn-lg text-white bg-linear-to-r from-[#ff512f] to-[#dd2476] hover:scale-105 border-0 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex-1 md:flex-none min-w-[200px]"
              >
                <FaFilter className="mr-2 text-lg" />
                Apply Filters
              </button>

              {filterApplied && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="btn btn-lg btn-outline border-gray-300 rounded-full hover:bg-gray-100 transition-all duration-300 min-w-[150px]"
                >
                  <FaTimes className="mr-2 text-lg" />
                  Clear All
                </button>
              )}
            </div>
          </form>

          {filterApplied && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-semibold text-gray-600">
                  Active Filters:
                </span>
                {selectedGenre && (
                  <span className="badge badge-lg bg-purple-100 text-purple-700 border-purple-300 gap-2">
                    <FaFilm />
                    {selectedGenre}
                  </span>
                )}
                {minRating && (
                  <span className="badge badge-lg bg-yellow-100 text-yellow-700 border-yellow-300 gap-2">
                    <FaStar />
                    Min: {minRating}
                  </span>
                )}
                {maxRating && (
                  <span className="badge badge-lg bg-orange-100 text-orange-700 border-orange-300 gap-2">
                    <FaStar />
                    Max: {maxRating}
                  </span>
                )}
                {sortBy !== "duration-desc" && (
                  <span className="badge badge-lg bg-indigo-100 text-indigo-700 border-indigo-300 gap-2">
                    <FaFilter />
                    {sortBy === "duration-asc"
                      ? "Shortest First"
                      : "Longest First"}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {loading ? (
        <div className="w-full py-20">
          <LoadingSpinner />
        </div>
      ) : movies.length === 0 && filterApplied ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center py-20 bg-base-100 rounded-2xl shadow-lg"
        >
          <img
            src={notFound}
            alt="No movies found"
            className="w-40 md:w-72 h-40 md:h-72 mb-6 opacity-80"
          />
          <h3 className="text-2xl md:text-4xl font-bold text-gray-700 mb-2">
            No Movies Found
          </h3>
          <p className="text-gray-500 text-base md:text-xl mb-6">
            No movies match your current filters
          </p>
          <button
            onClick={clearFilters}
            className="btn btn-lg text-white bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 rounded-full shadow-lg"
          >
            Clear Filters
          </button>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {movies.map((movie) => (
            <AllMoviesCard key={movie._id} movie={movie} />
          ))}
        </motion.div>
      )}

      {!loading && movies.length > 0 && totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-outline rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft />
              Previous
            </button>

            <div className="flex gap-2">
              {currentPage > 3 && (
                <>
                  <button
                    onClick={() => handlePageChange(1)}
                    className="btn btn-sm btn-outline"
                  >
                    1
                  </button>
                  {currentPage > 4 && (
                    <span className="flex items-center px-2">...</span>
                  )}
                </>
              )}

              {renderPageNumbers()}

              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && (
                    <span className="flex items-center px-2">...</span>
                  )}
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="btn btn-sm btn-outline"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-outline rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <FaChevronRight />
            </button>
          </div>

          <p className="text-gray-500 text-sm">
            Page {currentPage} of {totalPages} ({totalMovies} total movies)
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default AllMovies;
