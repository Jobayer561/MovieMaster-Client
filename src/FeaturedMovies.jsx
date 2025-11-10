import React from "react";

const FeaturedMovies = ({ movie }) => {
  const { title, duration, plotSummary, releaseYear, language, posterUrl } =
    movie;

  return (
    <div className="relative w-full flex items-center justify-center">
      <img
        src={posterUrl}
        className="
          w-full h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] object-cover rounded-md shadow-lg"
      />

      <div
        className="absolute bottom-20 left-4 sm:bottom-6 sm:left-20 md:bottom-4 md:left-8 text-white p-3 sm:p-4 md:p-5 rounded-md max-w-[300px] sm:max-w-[450px] md:max-w-[600px]
        "
      >
        <h2 className="text-[20px] sm:text-[24px] md:text-[30px] text-white drop-shadow-md lg:text-[36px] font-bold">
          {title}
        </h2>

        <p className="text-[12px] sm:text-[14px] flex gap-2">
          <span className="badge border-none bg-linear-to-r from-yellow-300 to-amber-500 text-white">
            {releaseYear}
          </span>

          <span className="badge border-none bg-linear-to-r from-blue-300 to-indigo-500 text-white">
            {language}
          </span>

          <span className="badge border-none bg-linear-to-r from-violet-400 to-purple-500 text-white">
            {duration} mins
          </span>
        </p>

        <p className="mt-2 text-[12px] sm:text-[14px] md:text-[16px] ">
          {plotSummary}
        </p>
      </div>
    </div>
  );
};

export default FeaturedMovies;
