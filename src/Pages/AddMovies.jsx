import React, { use } from "react";
import toast from "react-hot-toast";
import { RiMovie2AiFill } from "react-icons/ri";
import {
  FaFilm,
  FaUser,
  FaCalendarAlt,
  FaStar,
  FaClock,
  FaGlobe,
  FaFlag,
  FaImage,
  FaTheaterMasks,
  FaFileAlt,
} from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { motion } from "framer-motion";

const AddMovieForm = () => {
  const { user } = use(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: e.target.title.value,
      genre: e.target.genre.value,
      releaseYear: Number(e.target.releaseYear.value),
      director: e.target.director.value,
      cast: e.target.cast.value,
      rating: Number(e.target.rating.value),
      duration: Number(e.target.duration.value),
      plotSummary: e.target.summary.value,
      posterUrl: e.target.posterUrl.value,
      language: e.target.language.value,
      country: e.target.country.value,
      addedBy: user?.email,
    };
    fetch("https://b12-a10-movie-master-server.vercel.app/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Successfully added the Movie!");
        e.target.reset();
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-[#ff512f] to-[#dd2476] rounded-2xl shadow-2xl mb-6 animate-pulse">
            <RiMovie2AiFill className="text-5xl text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold primary mb-3">
            Add New Movie
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Fill in the details below to add a new movie to your collection
          </p>
        </motion.div>

        <motion.div
          className="bg-base-100 rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-200/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaFilm className="text-[#FF6B6B]" />
                    Movie Title
                  </span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Enter movie title"
                  className="input input-bordered w-full focus:outline-none focus:border-[#FF6B6B] transition-colors duration-300"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaTheaterMasks className="text-purple-500" />
                    Director
                  </span>
                </label>
                <input
                  type="text"
                  name="director"
                  required
                  placeholder="Enter director name"
                  className="input input-bordered w-full focus:outline-none focus:border-purple-500 transition-colors duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaFilm className="text-pink-500" />
                    Genre
                  </span>
                </label>
                <select
                  defaultValue=""
                  name="genre"
                  required
                  className="select select-bordered w-full focus:outline-none focus:border-pink-500 transition-colors duration-300"
                >
                  <option value="" disabled>
                    Select a genre
                  </option>
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
                    <FaCalendarAlt className="text-blue-500" />
                    Release Year
                  </span>
                </label>
                <input
                  type="number"
                  name="releaseYear"
                  required
                  placeholder="e.g., 2024"
                  className="input input-bordered w-full focus:outline-none focus:border-blue-500 transition-colors duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    Rating (0–10)
                  </span>
                </label>
                <input
                  type="number"
                  name="rating"
                  min="0"
                  max="10"
                  step="0.1"
                  required
                  placeholder="e.g., 8.5"
                  className="input input-bordered w-full focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaClock className="text-indigo-500" />
                    Duration (minutes)
                  </span>
                </label>
                <input
                  type="number"
                  name="duration"
                  required
                  placeholder="e.g., 120"
                  className="input input-bordered w-full focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaGlobe className="text-green-500" />
                    Language
                  </span>
                </label>
                <select
                  defaultValue=""
                  name="language"
                  required
                  className="select select-bordered w-full focus:outline-none focus:border-green-500 transition-colors duration-300"
                >
                  <option value="" disabled>
                    Select language
                  </option>
                  <option>English</option>
                  <option>Bangla</option>
                  <option>Hindi</option>
                  <option>Telegu</option>
                  <option>Marathi</option>
                  <option>Chinese</option>
                  <option>Korean</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaFlag className="text-red-500" />
                    Country
                  </span>
                </label>
                <input
                  type="text"
                  name="country"
                  required
                  placeholder="e.g., USA"
                  className="input input-bordered w-full focus:outline-none focus:border-red-500 transition-colors duration-300"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaUser className="text-orange-500" />
                  Cast (comma separated)
                </span>
              </label>
              <input
                type="text"
                name="cast"
                required
                placeholder="Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page"
                className="input input-bordered w-full focus:outline-none focus:border-orange-500 transition-colors duration-300"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaImage className="text-cyan-500" />
                  Poster URL
                </span>
              </label>
              <input
                type="url"
                name="posterUrl"
                required
                placeholder="https://example.com/poster.jpg"
                className="input input-bordered w-full focus:outline-none focus:border-cyan-500 transition-colors duration-300"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaFileAlt className="text-teal-500" />
                  Plot Summary
                </span>
              </label>
              <textarea
                rows="5"
                name="summary"
                required
                placeholder="Enter a brief plot summary..."
                className="textarea textarea-bordered w-full resize-none focus:outline-none focus:border-teal-500 transition-colors duration-300 leading-relaxed"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-linear-to-r from-[#ff512f] to-[#dd2476] text-white font-bold text-lg py-3 rounded-full shadow-lg  hover:scale-105 transition-all  flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RiMovie2AiFill className="text-2xl" />
              Add Movie
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddMovieForm;
