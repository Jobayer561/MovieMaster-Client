import React, { useEffect, useState } from "react";
import AllMoviesCard from "./AllMoviesCard";
import LoadingSpinner from "./LoadingSpinner";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const LatestMovies = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://b12-a10-movie-master-server.vercel.app/latestMovies")
      .then((res) => res.json())
      .then((data) => {
        setLatestMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="font-bold text-2xl md:text-3xl  primary">Latest Movies</div>

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
            {latestMovies.map((movie) => (
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

export default LatestMovies;
