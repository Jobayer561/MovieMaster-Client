import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const AllMoviesCard = ({ movie }) => {
  const { posterUrl, title, genre, releaseYear, rating, plotSummary, _id } =
    movie;

  return (
    <motion.div variants={cardVariants}>
      <div className="card border border-gray-200 hover:scale-105 transition-transform shadow-md rounded-md overflow-hidden">
        <figure className="h-50 overflow-hidden rounded-t-md">
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
            className="w-full h-50 lg:h-64 object-cover"
            src={posterUrl}
            alt={title}
          />
        </figure>

        <div className="card-body">
          <div className="flex justify-between items-start">
            <h2 className="card-title primary line-clamp-1">{title}</h2>

            <div className="badge bg-linear-to-r from-[#7928CA] to-[#FF0080] text-white border-none shadow-md px-3 py-2 font-medium">
              {genre}
            </div>
          </div>

          <p className="line-clamp-2 text-sm text-gray-500">{plotSummary}</p>

          <div className="card-actions justify-end mt-auto flex gap-2">
            <div className="badge bg-linear-to-r from-indigo-500 to-purple-500 text-white border-none">
              {releaseYear}
            </div>

            <div className="badge flex items-center gap-1 bg-linear-to-r from-yellow-400 to-orange-400 text-white border-none">
              <FaStar className="text-yellow-700" />
              {rating}
            </div>
          </div>

          <Link
            to={`/movie-details/${_id}`}
            className="btn text-white bg-linear-to-r from-[#ff512f] to-[#dd2476] hover:scale-105 transition-transform rounded-full mt-5"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default AllMoviesCard;
