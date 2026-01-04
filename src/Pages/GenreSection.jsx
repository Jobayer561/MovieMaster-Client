import React from "react";
import { MdLocalMovies } from "react-icons/md";
import { motion } from "framer-motion";

const GenreSection = () => {
  const genres = [
    { name: "Action", from: "from-pink-500", to: "to-red-500" },
    { name: "Drama", from: "from-purple-500", to: "to-indigo-500" },
    { name: "Comedy", from: "from-yellow-400", to: "to-orange-500" },
    { name: "Thriller", from: "from-green-400", to: "to-emerald-500" },
    { name: "Romance", from: "from-blue-400", to: "to-cyan-500" },
    { name: "Sci-Fi", from: "from-rose-400", to: "to-pink-500" },
    { name: "Horror", from: "from-indigo-400", to: "to-purple-500" },
    { name: "Adventure", from: "from-teal-400", to: "to-green-500" },
    { name: "Fantasy", from: "from-fuchsia-500", to: "to-pink-600" },
    { name: "Mystery", from: "from-sky-400", to: "to-blue-500" },
    { name: "Documentary", from: "from-lime-400", to: "to-green-500" },
  ];

  return (
    <div className="py-12 bg-linear-to-b from-base-100 to-base-200/50">
      <div className="max-w-[1440px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <MdLocalMovies className="text-[#ff512f] text-4xl md:text-5xl" />
            <h2 className="text-2xl md:text-4xl font-bold primary">
              Browse by Genre
            </h2>
          </div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore movies from your favorite genres
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {genres.map((genre, index) => (
            <motion.span
              key={genre.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className={`px-6 py-3 rounded-full bg-linear-to-r ${genre.from} ${genre.to} text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
            >
              {genre.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default GenreSection;
