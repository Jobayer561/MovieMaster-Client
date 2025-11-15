import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { FaFilm, FaUsers } from "react-icons/fa6";
import TopRatedMovies from "./TopRatedMovies";
import LatestMovies from "./LatestMovies";
import GenreSection from "./GenreSection";
import AboutPlatform from "./AboutPlatform";
import { motion } from "framer-motion";

const Home = () => {
  const [stats, setStats] = useState({ totalMovies: 0, totalUsers: 0 });

  useEffect(() => {
    fetch("https://b12-a10-movie-master-server.vercel.app/stats")
      .then((res) => res.json())
      .then((data) => {
        console.log("Stats response:", data);
        setStats({
          totalMovies: data.totalMovies,
          totalUsers: data.totalUsers,
        });
      });
  }, []);

  return (
    <div className="">
      <Carousel />

      <motion.div
        className="text-white p-6 rounded-lg flex flex-col sm:flex-row gap-6 justify-center items-center mt-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="bg-[#170F29] flex items-center gap-4 p-6 rounded-md w-64 shadow-md border border-violet-900/80 hover:scale-105 transition-transform"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-[#2c2c2c] p-3 rounded-md">
            <FaFilm className="text-yellow-400 text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Movies</p>
            <h2 className="text-3xl font-bold">{stats.totalMovies}</h2>
          </div>
        </motion.div>

        <motion.div
          className="bg-[#170F29] flex items-center gap-4 p-6 rounded-md w-64 border border-violet-900/80 shadow-md hover:scale-105 transition-transform"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-[#2c2c2c] p-3 rounded-md">
            <FaUsers className="text-blue-400 text-2xl" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Users</p>
            <h2 className="text-3xl font-bold">{stats.totalUsers}</h2>
          </div>
        </motion.div>
      </motion.div>

      <div>
        <TopRatedMovies />
      </div>

      <div>
        <LatestMovies />
      </div>

      <GenreSection />

      <AboutPlatform />
    </div>
  );
};

export default Home;
