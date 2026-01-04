import React from "react";
import { FaStar, FaCalendarAlt, FaFilm } from "react-icons/fa";
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
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card bg-base-100 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden h-full flex flex-col group">
        <figure className="relative h-44 lg:h-52 overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full object-cover"
            src={posterUrl}
            alt={title}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="absolute top-3 right-3">
            <div className="badge bg-linear-to-r from-[#7928CA] to-[#FF0080] text-white border-none shadow-lg px-2.5 py-2 text-xs font-semibold backdrop-blur-sm">
              <FaFilm className="mr-1 text-xs" />
              {genre}
            </div>
          </div>

          <div className="absolute top-3 left-3">
            <div className="badge flex items-center gap-1 bg-linear-to-r from-yellow-400 to-orange-500 text-white border-none shadow-lg px-2.5 py-2 text-xs font-bold">
              <FaStar className="text-yellow-100 text-xs" />
              {rating}
            </div>
          </div>
        </figure>

        <div className="card-body p-4 flex flex-col grow">
          <div className="mb-2">
            <h2 className="text-lg font-bold primary line-clamp-1 mb-1.5 group-hover:text-[#ff512f] transition-colors duration-300">
              {title}
            </h2>

            <div className="flex items-center gap-1.5 text-xs ">
              <FaCalendarAlt className="text-[#FF6B6B] text-xs" />
              <span className="font-medium">{releaseYear}</span>
            </div>
          </div>

          <p className="line-clamp-2 text-[14px]  leading-relaxed mb-3 grow">
            {plotSummary}
          </p>

          <div className="divider my-1"></div>

          <Link
            to={`/movies/${_id}`}
            className="btn btn-sm md:btn-md text-white bg-linear-to-r from-[#ff512f] to-[#dd2476] hover:from-[#ff512f]/90 hover:to-[#dd2476]/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded-full border-0 w-full gap-2 group/btn"
          >
            <span className="text-sm">View Details</span>
            <svg
              className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default AllMoviesCard;
