import React from "react";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

const WatchListCard = ({ movie, removeMovie }) => {
  const { posterUrl, title, genre, releaseYear, rating, plotSummary, _id } =
    movie;

  const handleRemove = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/watchList/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              removeMovie(_id);

              Swal.fire({
                title: "Removed!",
                text: "Movie removed from watchList.",
                icon: "success",
              });
            }
          })
          .catch((error) => console.error(error));
      }
    });
  };
  return (
    <div className="max-w-7xl mx-auto">
      <div className="card bg-gray-200 hover:scale-105 transition-transform shadow-md">
        <figure className="h-48 overflow-hidden   rounded-t-md">
          <img
            className="w-full h-48 object-cover rounded-t-md hover:scale-105"
            src={posterUrl}
            alt="PosterUrl"
          />
        </figure>
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title primary line-clamp-1">{title}</h2>
            <div className="badge bg-linear-to-r from-[#7928CA] to-[#FF0080] text-white border-none shadow-md px-3 py-2 font-medium tracking-wide">
              {genre}
            </div>
          </div>{" "}
          <p className="line-clamp-2 text-sm text-gray-600">{plotSummary}</p>
          <div className="card-actions justify-end mt-auto">
            <div className="badge bg-linear-to-r from-indigo-500 to-purple-500 text-white border-none">
              {releaseYear}
            </div>
            <div className="badge flex items-center gap-1 bg-linear-to-r from-yellow-400 to-orange-400 text-white  border-none">
              <FaStar className="text-yellow-700" />
              {rating}
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="btn text-white bg-linear-to-r from-[#ff512f] to-[#dd2476] hover:scale-105 transition-transform rounded-full mt-5"
          >
            Remove from WatchList
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchListCard;
