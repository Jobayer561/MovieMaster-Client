import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import AllMoviesCard from "./AllMoviesCard";

const MyCollections = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);
  useEffect(() => {
    console.log(user.email);
    fetch(`http://localhost:3000/myCollection?email=${user.email}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
        setLoading(false);
      });
  }, [user]);
  if (loading) {
    return <div> Please wait ... Loading...</div>;
  }

  return (
    <div className="bg-[#170F29] min-h-screen">
      {" "}
      <div className="max-w-7xl mx-auto py-4 px-4">
        {" "}
        <h3 className="text-3xl font-bold primary text-center mb-4">
          My Collection
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {movies.map((movie) => (
            <AllMoviesCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCollections;
