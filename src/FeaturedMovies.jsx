import React from "react";
import { motion } from "framer-motion";
import {
  FaClock,
  FaGlobe,
  FaCalendarAlt,
  FaPlay,
  FaChevronDown,
} from "react-icons/fa";
import { Link } from "react-router";

const FeaturedMovies = ({ movie }) => {
  const { title, duration, plotSummary, releaseYear, language, posterUrl } =
    movie;
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden group">
      <div className="relative w-full h-[70vh] max-h-[70vh]">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/30"></div>
        <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/40"></div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 sm:px-6 md:px-8 text-center max-w-5xl mx-auto"
      >
        <motion.div
          variants={item}
          className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#ff512f] to-[#dd2476] rounded-full shadow-lg backdrop-blur-sm"
        >
          <FaPlay className="text-sm" />
          <Link to={"/movies"} className="text-sm font-bold tracking-wider">
            ALL MOVIES
          </Link>
        </motion.div>

        <motion.h2
          variants={item}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-2xl tracking-tight leading-tight"
          style={{
            textShadow: "0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          {title}
        </motion.h2>

        <motion.p
          variants={item}
          className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mb-6 leading-relaxed text-gray-100 drop-shadow-lg line-clamp-3"
          style={{
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          {plotSummary}
        </motion.p>

        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-md px-4 sm:px-6 py-3 rounded-full border border-white/20 shadow-2xl"
        >
          <div className="flex items-center gap-2 text-yellow-400">
            <FaCalendarAlt className="text-sm sm:text-base" />
            <span className="font-bold text-white text-sm sm:text-base">
              {releaseYear}
            </span>
          </div>

          <div className="h-5 w-px bg-white/30"></div>

          <div className="flex items-center gap-2 text-blue-400">
            <FaGlobe className="text-sm sm:text-base" />
            <span className="font-bold text-white text-sm sm:text-base">
              {language}
            </span>
          </div>

          <div className="h-5 w-px bg-white/30"></div>

          <div className="flex items-center gap-2 text-purple-400">
            <FaClock className="text-sm sm:text-base" />
            <span className="font-bold text-white text-sm sm:text-base">
              {duration} mins
            </span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() =>
          window.scrollBy({ top: window.innerHeight * 0.7, behavior: "smooth" })
        }
      >
        <span className="text-white text-sm font-semibold tracking-wider drop-shadow-lg">
          SCROLL DOWN
        </span>
        <FaChevronDown className="text-white text-2xl drop-shadow-lg" />
      </motion.div>
    </div>
  );
};

export default FeaturedMovies;
