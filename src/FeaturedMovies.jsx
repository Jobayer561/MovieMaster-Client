import React from "react";
import { motion } from "framer-motion";

const FeaturedMovies = ({ movie }) => {
  const { title, duration, plotSummary, releaseYear, language, posterUrl } =
    movie;
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div className="relative w-full flex items-center justify-center">
      <img
        src={posterUrl}
        className="w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h-[670px] object-cover shadow-lg"
      />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center"
      >
        <motion.h2
          variants={item}
          className="text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px] font-bold drop-shadow-md"
        >
          {title}
        </motion.h2>

        <motion.p
          variants={item}
          className="text-[16px] sm:text-2xl text-shadow-gray-50 md:text-4xl"
        >
          {plotSummary}
        </motion.p>
        <motion.p
          variants={item}
          className="mt-6 text-[12px] sm:text-[14px] flex gap-2 justify-center"
        >
          <span className="badge border-none bg-linear-to-r from-yellow-300 to-amber-500 font-semibold text-white">
            {releaseYear}
          </span>

          <span className="badge border-none bg-linear-to-r from-blue-300 to-indigo-500 text-white">
            {language}
          </span>

          <span className="badge border-none bg-linear-to-r from-violet-400 to-purple-500 text-white">
            {duration} mins
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FeaturedMovies;
