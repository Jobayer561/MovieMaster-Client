import React, { useState } from "react";
import { useLoaderData } from "react-router";
import AllMoviesCard from "./AllMoviesCard";

const AllMovies = () => {
  const data = useLoaderData();
  const [movies, setMovies] = useState(data);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const filterApplied =
    selectedGenre !== "" || minRating !== "" || maxRating !== "";

  const handleFilter = (e) => {
    e.preventDefault();

    let url = "http://localhost:3000/moviesFilter?";
    if (selectedGenre) url += `genre=${selectedGenre}&`;
    if (minRating) url += `minRating=${minRating}&`;
    if (maxRating) url += `maxRating=${maxRating}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovies(data));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="text-2xl md:text-4xl font-semibold primary">
          AllMovies
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

      {movies.length === 0 && filterApplied ? (
        <div className="w-full flex flex-col items-center justify-center py-20">
          <img
            src="https://i.ibb.co.com/Jz8x8q4/no-data.png"
            alt=""
            className="w-60 opacity-70"
          />
          <p className="text-xl font-semibold mt-4 text-gray-500">
            No movies match your filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {movies.map((movie, idx) => (
            <AllMoviesCard key={idx} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
};

export default AllMovies;
