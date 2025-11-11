import React from "react";
import { MdLocalMovies } from "react-icons/md";

const GenreSection = () => {
  return (
    <div className="bg-[#170F29] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
          <div className="flex items-center text-center justify-center gap-1">
            <span className="text-[#ff512f]">
              <MdLocalMovies size={40} />
            </span>

            <span className="primary">Browse by Genre</span>
          </div>
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="px-5 py-2 rounded-full bg-linear-to-r from-pink-500 to-red-500 text-white text-sm font-medium shadow-md hover:scale-105 transition-transform duration-300 cursor-default">
            Action
          </span>
          <span className="px-5 py-2 rounded-full bg-linear-to-r from-purple-500 to-indigo-500 text-white text-sm font-medium shadow-md hover:scale-105 transition-transform duration-300 cursor-default">
            Drama
          </span>
          <span className="px-5 py-2 rounded-full bg-linear-to-r from-yellow-400 to-orange-500 text-white text-sm font-medium shadow-md hover:scale-105 transition-transform duration-300 cursor-default">
            Comedy
          </span>
          <span className="px-5 py-2 rounded-full bg-linear-to-r from-green-400 to-emerald-500 text-white text-sm font-medium shadow-md hover:scale-105 transition-transform duration-300 cursor-default">
            Thriller
          </span>
          <span className="px-5 py-2 rounded-full bg-linear-to-r from-blue-400 to-cyan-500 text-white text-sm font-medium shadow-md hover:scale-105 transition-transform duration-300 cursor-default">
            Romance
          </span>
          <span className="px-5 py-2 rounded-full bg-linear-to-r from-rose-400 to-pink-500 text-white text-sm font-medium shadow-md hover:scale-105 transition-transform duration-300 cursor-default">
            Sci-Fi
          </span>
          <span className="px-5 py-2 rounded-full bg-linear-to-r from-indigo-400 to-purple-500 text-white text-sm font-medium shadow-md hover:scale-105 transition-transform duration-300 cursor-default">
            Horror
          </span>
          <span className="px-5 py-2 rounded-full bg-linear-to-r from-teal-400 to-green-500 text-white text-sm font-medium shadow-md hover:scale-105 transition-transform duration-300 cursor-default">
            Adventure
          </span>
          <span className="px-5 py-2 rounded-full bg-linear-to-r from-fuchsia-500 to-pink-600 text-white text-sm font-medium shadow-md hover:scale-105 transition-transform duration-300 cursor-default">
            Fantasy
          </span>
          <span className="px-5 py-2 rounded-full bg-linear-to-r from-sky-400 to-blue-500 text-white text-sm font-medium shadow-md hover:scale-105 transition-transform duration-300 cursor-default">
            Mystery
          </span>
          <span className="px-5 py-2 rounded-full bg-linear-to-r from-lime-400 to-green-500 text-white text-sm font-medium shadow-md hover:scale-105 transition-transform duration-300 cursor-default">
            Documentary
          </span>
          <MdLocalMovies size={32} className="text-" />
        </div>
      </div>
    </div>
  );
};

export default GenreSection;
