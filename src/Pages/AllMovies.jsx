import React from "react";
import { useLoaderData } from "react-router";
import AllMoviesCard from "./AllMoviesCard";

const AllMovies = () => {
  const movies = useLoaderData();
  return (
    <section className="bg-[#170F29] ">
      <div className="max-w-[1440px] mx-auto px-4 py-6">
        <div className="text-center font-semibold md:text-5xl text-2xl  primary">
          AllMovies
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8">
          {movies.map((movie, idx) => (
            <AllMoviesCard key={idx} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default AllMovies;
