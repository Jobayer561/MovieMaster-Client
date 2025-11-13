import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { LiaEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3000/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.result);
      });
  }, [id]);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/movies/${movie._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            navigate("/allMovies");

            Swal.fire({
              title: "Deleted!",
              text: "Movie has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  return (
    <div className="bg-[#170F29]">
      <div className="max-w-[1440px]  mx-auto px-4 py-8  text-gray-900 ">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 rounded-2xl p-2 overflow-hidden shadow-2xl">
          <div className="lg:w-1/2">
            <img
              src={movie?.posterUrl}
              alt={movie?.title}
              className="w-full h-[45vh] sm:h-[55vh] md:h-[70vh] lg:h-[80vh] object-cover object-center rounded-2xl"
            />
          </div>

          <div className="lg:w-1/2 mt-8 lg:mt-0 rounded-2xl p-6 md:p-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center primary mb-4">
              {movie?.title}
            </h1>

            <p className="text-[#64748B] text-center text-xl font-semibold max-w-3xl mx-auto mb-8">
              {movie?.plotSummary}
            </p>

            <div className="grid sm:grid-cols-2 gap-6 font-semibold text-[#06B6D4]">
              <p>
                <span className="font-bold text-pink-600">Genre :</span>{" "}
                {movie?.genre}
              </p>
              <p>
                <span className="font-bold text-pink-600">Release Year : </span>{" "}
                {movie?.releaseYear}
              </p>
              <p>
                <span className="font-bold text-pink-600">Director : </span>{" "}
                {movie?.director}
              </p>
              <p>
                <span className="font-bold text-pink-600">Duration : </span>{" "}
                {movie?.duration} mins
              </p>
              <p>
                <span className="font-bold text-pink-600">Rating : </span> ⭐{" "}
                {movie?.rating}
              </p>
              <p>
                <span className="font-bold text-pink-600">Language : </span>{" "}
                {movie?.language}
              </p>
              <p>
                <span className="font-bold text-pink-600">Country : </span>{" "}
                {movie?.country}
              </p>
              <p className="sm:col-span-2">
                <span className="font-bold text-pink-600">Cast : </span>{" "}
                {movie?.cast}
              </p>
              <p className="sm:col-span-2 font-semibold">
                <span className="font-bold text-pink-600">Added by : </span>{" "}
                {movie?.addedBy}
              </p>
            </div>

            {user?.email === movie?.addedBy && (
              <div className="mt-10 flex justify-center gap-4">
                <Link to={`/movies/update/${movie._id} `} className="my-btn">
                  <LiaEditSolid className="text-xl" />
                  Edit
                </Link>
                <button onClick={handleDelete} className="my-btn">
                  <MdDelete className="text-xl" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
