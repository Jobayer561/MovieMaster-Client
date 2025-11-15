import React, { useState, useEffect } from "react";
import AllMoviesCard from "./AllMoviesCard";
import LoadingSpinner from "./LoadingSpinner";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const TopRatedMovies = () => {
  const [rating, setRating] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://b12-a10-movie-master-server.vercel.app/top-rated")
      .then((res) => res.json())
      .then((data) => {
        setRating(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="font-semibold md:text-2xl primary">
          Top Rated Movies
        </div>

        {loading ? (
          <div className="mt-8">
            <LoadingSpinner count={6} />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8"
          >
            {rating.map((movie) => (
              <motion.div key={movie._id} variants={cardVariants}>
                <AllMoviesCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TopRatedMovies;
