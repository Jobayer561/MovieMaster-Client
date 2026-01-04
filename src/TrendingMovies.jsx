import React, { useState, useEffect } from "react";
import AllMoviesCard from "./Pages/AllMoviesCard";
import LoadingSpinner from "./Pages/LoadingSpinner";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";

const TrendingMovies = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://b12-a10-movie-master-server.vercel.app/top-rated")
      .then((res) => res.json())
      .then((data) => {
        setTrending(data.slice(0, 8));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="py-12 bg-linear-to-b from-base-100 to-base-200/30">
      <div className="max-w-[1440px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <FaFire className="text-[#ff512f] text-3xl animate-pulse" />
            <h2 className="text-2xl md:text-3xl font-bold primary">
              Trending This Week
            </h2>
          </div>
          <div className="h-1 w-24 bg-linear-to-r from-[#ff512f] to-[#dd2476] rounded-full mb-3"></div>
          <p className="text-gray-500 text-sm">Most popular movies right now</p>
        </motion.div>

        {loading ? (
          <LoadingSpinner count={8} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trending.map((movie, index) => (
              <motion.div
                key={movie._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <AllMoviesCard movie={movie} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingMovies;
