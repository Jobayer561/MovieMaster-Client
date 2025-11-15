import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { LiaEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { CircleLoader } from "react-spinners";
const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  const { user } = use(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`https://b12-a10-movie-master-server.vercel.app/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.result);
        setLoading(false);
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
        fetch(
          `https://b12-a10-movie-master-server.vercel.app/movies/${movie._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
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
  const handleAddToWatchList = () => {
    const watchListData = {
      title: movie.title,
      genre: movie.genre,
      releaseYear: Number(movie.releaseYear),
      director: movie.director,
      cast: movie.cast,
      rating: Number(movie.rating),
      duration: Number(movie.duration),
      plotSummary: movie.plotSummary,
      posterUrl: movie.posterUrl,
      language: movie.language,
      country: movie.country,
      watchListBy: user?.email,
    };

    fetch(
      `https://b12-a10-movie-master-server.vercel.app/watchList/${movie._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(watchListData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.success) {
          return toast.error("Already added to your WatchList!");
        }
        toast.success("Successfully Added To My WatchList!");
      });
  };
  if (loading) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <CircleLoader color="#FF6B6B" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="max-w-[1440px]  mx-auto px-4 py-8  text-gray-900 ">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 rounded-2xl p-2 overflow-hidden shadow-2xl">
          <div className="lg:w-1/2">
            <img
              src={movie?.posterUrl}
              alt={movie?.title}
              className="w-full h-[45vh] sm:h-[55vh] md:h-[70vh] lg:h-[80vh] object-cover object-center rounded-2xl"
            />
          </div>

          <div className="lg:w-1/2 mt-8 lg:mt-0 rounded-2xl p-6">
            <h1 className="text-3xl md:text-5xl font-bold text-center primary mb-4">
              {movie?.title}
            </h1>

            <p className="text-gray-500 text-center text-xl font-semibold max-w-3xl mx-auto mb-8">
              {movie?.plotSummary}
            </p>

            <div className="grid sm:grid-cols-2 gap-6 font-semibold text-slate-600">
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
                <span className="font-bold text-indigo-600">Rating : </span> ⭐{" "}
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
            <div className="mt-4">
              <button
                onClick={handleAddToWatchList}
                className="block w-full text-center py-3 font-semibold text-white rounded-full bg-linear-to-r from-[#ff512f] to-[#dd2476] hover:scale-105 transition-transform"
                to="/myWatchList"
              >
                Add To WatchList
              </button>
            </div>

            {user?.email === movie?.addedBy && (
              <div className="mt-6 flex justify-center gap-4">
                <Link
                  to={`/movies/update/${movie._id} `}
                  className="btn text-white bg-linear-to-r from-[#ff512f] to-[#dd2476] hover:scale-105 transition-transform rounded-full"
                >
                  <LiaEditSolid className="text-xl" />
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn text-white bg-linear-to-r from-[#ff512f] to-[#dd2476] hover:scale-105 transition-transform rounded-full"
                >
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
