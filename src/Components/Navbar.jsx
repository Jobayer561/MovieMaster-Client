import React from "react";
import { Link, NavLink } from "react-router";
import { BiSolidCameraMovie } from "react-icons/bi";

const Navbar = () => {
  let user = 1;
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allMovies">All Movies</NavLink>
      </li>
      <>
        <li>
          <NavLink to="/myCollection">My Collections</NavLink>
        </li>
      </>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start mx-0 md:mx-4">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="mr-1 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100  z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to='/' className="logo text-[14px] sm:text-xl font-semibold flex items-center ">
            <span>M</span>
            <span className="text-[#FF6B6B] animate-bounce">
              <BiSolidCameraMovie size={24} />
            </span>
            <span>vieMaster</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        {!user ? (
          <div className="navbar-end mx-0 md:mx-4 flex gap-2">
            <button className="btn btn-outline hover:text-white btn-primary">
              Login
            </button>
            <button className="btn btn-outline hover:text-white btn-primary">
              Register
            </button>
          </div>
        ) : (
          <div className="navbar-end mx-0 md:mx-4 flex gap-2">
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-9 border-2 border-gray-300 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    referrerPolicy="no-referrer"
                    src={
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="ml-4 menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-44 p-2 shadow "
              >
                <div className=" pb-3 border-b border-b-gray-200">
                  <li className="text-sm font-bold">Jobayer</li>
                  <li className="text-xs">jobayer3085@gmail.com</li>
                </div>

                <li>
                  <Link to={"/my-collections"}>My Collections</Link>
                </li>
                <li>
                  <Link to={"/my-collections"}>Add Movies</Link>
                </li>
              </ul>
            </div>{" "}
            <button className="btn btn-outline hover:text-white btn-primary">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
