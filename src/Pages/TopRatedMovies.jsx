import React, { useState } from 'react'
import { useEffect } from 'react';
import AllMoviesCard from './AllMoviesCard';

const TopRatedMovies = () => {
      const [rating, setRating] = useState([]);
      useEffect(() => {
        fetch("http://localhost:3000/top-rated")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setRating(data);
          });
      }, []);
  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className=" font-semibold md:text-2xl  text-orange-400">
          Top Rated Movies
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8">
          {rating.map((movie, idx) => (
            <AllMoviesCard key={idx} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopRatedMovies;