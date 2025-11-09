import React from "react";
import { useLoaderData } from "react-router";
import AllMoviesCard from "./AllMoviesCard";

const AllMovies = () => {
  const movies = useLoaderData();
  console.log(movies._id);
  return (
    <section className="max-w-[1440px] mx-auto px-4">
      <div className="text-center font-semibold md:text-5xl text-2xl my-8">
        AllMovies
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8">
        {movies.map((movie) => (
          <AllMoviesCard
            key={movie._id}
            movie={movie}
          />
        ))}
      </div>
    </section>
  );
};

export default AllMovies;
