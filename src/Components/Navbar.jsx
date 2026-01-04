import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { BiSolidCameraMovie } from "react-icons/bi";
import { FiLogIn, FiUserPlus, FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, signOutUser, setUser } = useContext(AuthContext);
  const handleSignout = () => {
    signOutUser()
      .then(() => {
        toast.success("Signout successful");
        setUser(null);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className="font-medium hover:text-[#FF6B6B] transition-all duration-300"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/movies"
          end
          className="font-medium hover:text-[#FF6B6B] transition-all duration-300"
        >
          All Movies
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          end
          className="font-medium hover:text-[#FF6B6B] transition-all duration-300"
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact-us"
          end
          className="font-medium hover:text-[#FF6B6B] transition-all duration-300"
        >
          contact-us
        </NavLink>
      </li>
      <>
        {user && (
          <>
            <li>
              <NavLink
                to="/dashboard"
                className="font-medium hover:text-[#FF6B6B] transition-all duration-300"
              >
                DashBoard
              </NavLink>
            </li>
          </>
        )}
      </>
    </>
  );
  return (
    <div className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md">
      <div className="navbar shadow-lg border-b border-gray-200/50">
        <div className="navbar-start mx-0 md:mx-12">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="mr-1 lg:hidden hover:bg-base-200 p-2 rounded-lg transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 font-semibold z-50 mt-3 w-52 p-3 shadow-xl rounded-xl border border-gray-200/50"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="logo text-[16px] sm:text-2xl font-bold flex items-center gap-1 hover:scale-105 transition-transform duration-300"
          >
            <span className="tracking-tight">M</span>
            <span className="text-[#FF6B6B] animate-bounce inline-block">
              <BiSolidCameraMovie size={28} />
            </span>
            <span className="tracking-tight">vieMaster</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
        </div>
        <div className="navbar-end mx-0 md:mx-4 flex items-center gap-3 md:gap-4 px-2 md:px-6">
          <label className="swap swap-rotate hover:scale-110 transition-transform duration-300 cursor-pointer">
            <input
              onChange={(e) => handleTheme(e.target.checked)}
              type="checkbox"
              defaultChecked={localStorage.getItem("theme") === "dark"}
              className="hidden"
            />
            <FiSun className="swap-off fill-current w-6 h-6 text-yellow-500" />
            <FiMoon className="swap-on fill-current w-6 h-6 text-blue-500" />
          </label>

          {!user ? (
            <>
              <Link
                to="/login"
                className="btn btn-sm md:btn-md text-white bg-linear-to-r from-[#ff512f] to-[#dd2476] hover:scale-105 hover:shadow-lg transition-all duration-300 rounded-full border-0 gap-2"
              >
                <FiLogIn size={18} />
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm md:btn-md text-white bg-linear-to-r from-[#ff512f] to-[#dd2476] hover:scale-105 hover:shadow-lg transition-all duration-300 rounded-full border-0 hidden sm:flex gap-2"
              >
                <FiUserPlus size={18} />
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="dropdown dropdown-end z-50 ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar hover:scale-110 transition-transform duration-300"
                >
                  <div className="w-10 md:w-11 border-2 border-[#FF6B6B] rounded-full ring-2 ring-[#FF6B6B]/20 hover:ring-[#FF6B6B]/40 transition-all duration-300">
                    <img
                      alt={user?.displayName || "User"}
                      referrerPolicy="no-referrer"
                      src={
                        user?.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="ml-4 menu menu-sm dropdown-content bg-base-100 rounded-xl z-50 mt-3 w-52 p-3 shadow-xl border border-gray-200/50"
                >
                  <div className="pb-3 mb-2 border-b border-b-gray-200">
                    <li className="text-sm font-bold text-[#FF6B6B] pointer-events-none">
                      {user?.displayName}
                    </li>
                    <li className="text-xs opacity-70 pointer-events-none">
                      {user?.email}
                    </li>
                  </div>

                  <li className="hover:text-[#FF6B6B] transition-colors duration-300">
                    <NavLink to="/dashboard/profile">Profile</NavLink>
                  </li>

                  <li className="hover:text-[#FF6B6B] transition-colors duration-300">
                    <NavLink to="/dashboard/Watchlist">My WatchList</NavLink>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleSignout}
                className="btn btn-sm md:btn-md text-white bg-linear-to-r from-[#ff512f] to-[#dd2476] hover:scale-105 hover:shadow-lg transition-all duration-300 rounded-full border-0 gap-2"
              >
                <FiLogOut size={18} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
