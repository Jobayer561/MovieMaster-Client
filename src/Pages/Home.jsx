import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { FaFilm, FaUsers } from "react-icons/fa6";
import TopRatedMovies from "./TopRatedMovies";
import LatestMovies from "./LatestMovies";
import GenreSection from "./GenreSection";
import AboutPlatform from "./AboutPlatform";
import { motion } from "framer-motion";
import Trending from "./Trending";
import Testimonials from "../Testimonials";
import Newsletter from "../Newsletter";

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
    <div className="min-h-screen">
      <Carousel />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 mt-12 mb-16 max-w-[1440px] mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="relative group overflow-hidden rounded-2xl bg-linear-to-br from-[#FF6B6B]/10 to-[#ff512f]/10 backdrop-blur-sm border border-[#FF6B6B]/20 hover:border-[#FF6B6B]/50 transition-all duration-500 shadow-xl hover:shadow-2xl"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ y: -8 }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-[#ff512f]/20 to-[#dd2476]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative flex items-center gap-6 p-8">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-yellow-400 to-orange-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-linear-to-br from-yellow-400 to-orange-500 p-5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                <FaFilm className="text-white text-5xl" />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">
                Total Movies
              </p>
              <h2 className="text-5xl font-extrabold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-500 inline-block">
                {stats.totalMovies}
              </h2>
              <div className="mt-2 h-1 w-16 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full group-hover:w-24 transition-all duration-500"></div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-yellow-400/10 to-transparent rounded-bl-full"></div>
        </motion.div>

        <motion.div
          className="relative group overflow-hidden rounded-2xl bg-linear-to-br from-blue-500/10 to-indigo-600/10 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ y: -8 }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative flex items-center gap-6 p-8">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative bg-linear-to-br from-blue-500 to-indigo-600 p-5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                <FaUsers className="text-white text-5xl" />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">
                Total Users
              </p>
              <h2 className="text-5xl font-extrabold bg-linear-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-500 inline-block">
                {stats.totalUsers}
              </h2>
              <div className="mt-2 h-1 w-16 bg-linear-to-r from-blue-500 to-indigo-600 rounded-full group-hover:w-24 transition-all duration-500"></div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-blue-500/10 to-transparent rounded-bl-full"></div>
        </motion.div>
      </motion.div>

      <section className="py-8">
        <TopRatedMovies />
      </section>

      <section className="py-8">
        <LatestMovies />
      </section>

      <section className="">
        <GenreSection />
      </section>

      <section className="">
        <AboutPlatform />
      </section>

      <section className="">
        <Testimonials />
      </section>

      <section className="">
        <Newsletter />
      </section>
    </div>
  );
};

export default Home;
