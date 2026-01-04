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
      <div className="max-w-[1440px] mx-auto px-4 py-6">
        <h2 className="text-2xl md:text-3xl font-bold primary mb-2">
          Latest Movies
        </h2>
        <div className="h-1 w-24 bg-linear-to-r from-[#ff512f] to-[#dd2476] rounded-full mb-6"></div>

        {loading ? (
          <div className="mt-8">
            <LoadingSpinner count={6} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {latestMovies.map((movie) => (
              <AllMoviesCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestMovies;
