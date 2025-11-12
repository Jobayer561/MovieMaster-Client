import React from "react";
import Carousel from "./Carousel";
import { useEffect } from "react";
import { useState } from "react";
import { FaFilm, FaUsers } from "react-icons/fa6";
import TopRatedMovies from "./TopRatedMovies";
import LatestMovies from "./LatestMovies";
import GenreSection from "./GenreSection";
import AboutPlatform from "./AboutPlatform";

const Home = () => {
  const [stats, setStats] = useState({ totalMovies: 0, totalUsers: 0 });
  useEffect(() => {
    fetch("http://localhost:3000/stats")
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
    <div className="bg-[#170F29]">
      <div>
        <Carousel />
      </div>
      <div className="">
        <div className=" text-white p-6 rounded-lg flex flex-col md:flex-row gap-6 justify-center items-center">
          <div className="bg-[#170F29] flex items-center gap-4 p-6 rounded-md w-64 shadow-md border border-violet-900/80 hover:scale-105 transition-transform">
            <div className="bg-[#2c2c2c] p-3 rounded-md">
              <FaFilm className="text-yellow-400 text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Movies</p>
              <h2 className="text-3xl font-bold">{stats.totalMovies}</h2>
            </div>
          </div>

          <div className="bg-[#170F29] flex items-center gap-4 p-6 rounded-md w-64 border border-violet-900/80 shadow-md hover:scale-105 transition-transform">
            <div className="bg-[#2c2c2c] p-3 rounded-md">
              <FaUsers className="text-blue-400 text-2xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Users</p>
              <h2 className="text-3xl font-bold">{stats.totalUsers}</h2>
            </div>
          </div>
        </div>
      </div>
      <TopRatedMovies />
      <LatestMovies />
      <div>
        <GenreSection />
      </div>
      <div>
        <AboutPlatform />
      </div>
    </div>
  );
};

export default Home;
