import React, { use } from "react";
import toast from "react-hot-toast";
import { RiMovie2AiFill } from "react-icons/ri";
import { AuthContext } from "../Context/AuthContext";
const AddMovieForm = () => {
  const { user } = use(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: e.target.title.value,
      genre: e.target.genre.value,
      releaseYear: Number(e.target.releaseYear.value),
      director: e.target.director.value,
      cast: e.target.cast.value,
      rating: Number(e.target.rating.value),
      duration: Number(e.target.duration.value),
      plotSummary: e.target.summary.value,
      posterUrl: e.target.posterUrl.value,
      language: e.target.language.value,
      country: e.target.country.value,
      addedBy: user?.email,
    };
    fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Successfully added the Movie!");
        e.target.reset();
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className=" bg-white text-gray-200 flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-orange-500 p-4 rounded-full mb-4">
          <span className="text-4xl primary">
            <RiMovie2AiFill />
          </span>
        </div>
        <h1 className="text-3xl font-bold text-orange-300">Add New Movie</h1>
        <p className="text-gray-300 text-center mt-2">
          Fill in the details to add a movie to your collection
        </p>
      </div>
      <div className="bg-gray-600 rounded-2xl p-8 shadow-lg w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Movie Title
              </label>

              <input
                type="text"
                name="title"
                required
                placeholder="Enter Movie Title"
                className="input input-info bg-[#111] autofill:bg-[#111]"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Director</label>
              <input
                type="text"
                name="director"
                required
                placeholder="Enter Director Name"
                className="input input-info bg-[#111] autofill:bg-[#111]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Genre</label>
              <select
                defaultValue=""
                name="genre"
                required
                className="select select-info appearance-none bg-[#111] autofill:bg-[#111]"
              >
                <option value="" disabled>
                  Select a Genre
                </option>
                <option>Action</option>
                <option>Comedy</option>
                <option>Drama</option>
                <option>Horror</option>
                <option>Sci-Fi</option>
                <option>Adventure</option>
                <option>Biography</option>
                <option>Crime</option>
                <option>Family</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Release Year
              </label>
              <input
                type="number"
                name="releaseYear"
                required
                placeholder="Enter Release Year"
                className="input input-info bg-[#111] autofill:bg-[#111]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Rating (0–10)
              </label>
              <input
                type="number"
                name="rating"
                min="0"
                max="10"
                step="0.1"
                required
                placeholder="Enter Rating"
                className="input input-info bg-[#111] autofill:bg-[#111]"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                required
                placeholder="0"
                className="input input-info bg-[#111] autofill:bg-[#111]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Language</label>
              <select
                defaultValue=""
                name="language"
                required
                className="select select-info appearance-none bg-[#111] autofill:bg-[#111]"
              >
                <option disabled>Language</option>
                <option>English</option>
                <option>Bangla</option>
                <option>Hindi</option>
                <option>Telegu</option>
                <option>Marathi</option>
                <option>Chinese</option>
                <option>Korean</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Country</label>
              <input
                type="text"
                name="country"
                required
                placeholder="USA"
                className="input input-info bg-[#111] autofill:bg-[#111]"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Cast (comma separated)
            </label>
            <input
              type="text"
              name="cast"
              required
              placeholder="Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page"
              className="input input-info bg-[#111] autofill:bg-[#111] w-[97%]"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Poster URL</label>
            <input
              type="url"
              name="posterUrl"
              required
              placeholder="https://example.com/poster.jpg"
              className="input input-info bg-[#111] autofill:bg-[#111] w-[97%]"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Plot Summary
            </label>
            <textarea
              rows="4"
              name="summary"
              required
              placeholder="Enter a brief plot summary..."
              className="w-[97%] bg-[#111] autofill:bg-[#111] textarea textarea-info resize-none "
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-[97%] bg-linear-to-r from-[#ff512f] to-[#dd2476] text-white font-semibold rounded-lg py-2 mt-4 hover:scale-105 transition-transform"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovieForm;
