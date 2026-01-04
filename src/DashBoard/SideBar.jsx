import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import { BiSolidCameraMovie } from "react-icons/bi";
import { FaFilm, FaPlus, FaList, FaUser } from "react-icons/fa";

import { AuthContext } from "../Context/AuthContext";

const Sidebar = () => {
  const { signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isActive, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <div className=" text-gray-400 flex justify-between md:hidden mb-3">
        <button
          onClick={handleToggle}
          className="absolute top-4 right-4 md:hidden text-gray-600 hover:text-white z-50"
        >
          <AiOutlineBars className="h-6 w-6 " />
        </button>
      </div>

      <div
        className={`z-70 md:fixed flex flex-col justify-between overflow-x-hidden bg-gradient-to-b from-gray-900 to-gray-800 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          !isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          <div>
            <div className="w-full hidden md:flex px-4 py-4 shadow-lg rounded-lg justify-center items-center bg-gradient-to-r from-[#ff512f] to-[#dd2476] mx-auto">
              <Link to="/" className="flex items-center gap-2 text-white">
                <BiSolidCameraMovie className="text-3xl" />
                <span className="text-xl font-bold tracking-tight">
                  MovieMaster
                </span>
              </Link>
            </div>
          </div>

          <nav className="flex flex-col gap-3 mt-8">
            <h3 className="text-gray-400 text-xs font-semibold uppercase px-4 tracking-wider">
              Menu
            </h3>
            <NavLink
              to="/dashboard/my-collection"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#ff512f]/20 to-[#dd2476]/20 text-[#ff512f]"
                    : "text-gray-300 hover:bg-gradient-to-r hover:from-[#ff512f]/20 hover:to-[#dd2476]/20 hover:text-[#ff512f]"
                }`
              }
            >
              <FaFilm className="w-5 h-5" />
              <span className="font-medium">My Collection</span>
            </NavLink>

            <NavLink
              to="/dashboard/add-movies"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#ff512f]/20 to-[#dd2476]/20 text-[#ff512f]"
                    : "text-gray-300 hover:bg-gradient-to-r hover:from-[#ff512f]/20 hover:to-[#dd2476]/20 hover:text-[#ff512f]"
                }`
              }
            >
              <FaPlus className="w-5 h-5" />
              <span className="font-medium">Add Movies</span>
            </NavLink>

            <NavLink
              to="/dashboard/watchlist"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#ff512f]/20 to-[#dd2476]/20 text-[#ff512f]"
                    : "text-gray-300 hover:bg-gradient-to-r hover:from-[#ff512f]/20 hover:to-[#dd2476]/20 hover:text-[#ff512f]"
                }`
              }
            >
              <FaList className="w-5 h-5" />
              <span className="font-medium">My WatchList</span>
            </NavLink>

            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#ff512f]/20 to-[#dd2476]/20 text-[#ff512f]"
                    : "text-gray-300 hover:bg-gradient-to-r hover:from-[#ff512f]/20 hover:to-[#dd2476]/20 hover:text-[#ff512f]"
                }`
              }
            >
              <FaUser className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </NavLink>
          </nav>

          <div>
            <hr />

            <button
              onClick={handleLogout}
              className="flex cursor-pointer w-full items-center px-4 py-3 mt-5 text-gray-300 hover:bg-gradient-to-r hover:from-red-600/20 hover:to-red-700/20 hover:text-red-400 transition-all duration-300 rounded-lg"
            >
              <GrLogout className="w-5 h-5" />

              <span className="mx-4 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
