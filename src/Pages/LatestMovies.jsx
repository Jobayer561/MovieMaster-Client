import React, { useEffect, useState } from "react";
import AllMoviesCard from "./AllMoviesCard";

const LatestMovies = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/latestMovies")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLatestMovies(data);
      });
  }, []);
  return (
    <div>
      {" "}
      <div className="bg-[#170F29]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center font-semibold md:text-5xl text-2xl  primary">
            Latest Movies
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8">
            {latestMovies.map((movie, idx) => (
              <AllMoviesCard key={idx} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestMovies;
