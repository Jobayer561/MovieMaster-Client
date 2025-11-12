import React from "react";
import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import toast from "react-hot-toast";

const Registration = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { createUser, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(name, photoUrl, email, password);
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordPattern) {
      setError(
        "Password Must be 6 character long and must Contain at least one uppercase Letter and one lowercase letter"
      );
      return;
    }
    setError("");
    createUser(email, password)
      .then((res) => {
        toast.success('Sign Up Successful')
        console.log(res.user);
        setUser(null);
        navigate("/");
      })
      .catch((e) => {
        if (e.code === "auth/email-already-in-use") {
          toast.error("User already exists in the database.");
        } else if (e.code === "auth/weak-password") {
          toast.error(
            "You password should be 6 character long and must contain one uppercase & lowercase letter"
          );
        } else if (e.code === "auth/invalid-email") {
          toast.error("Invalid email format. Please check your email.");
        } else if (e.code === "auth/user-not-found") {
          toast.error("User not found. Please sign up first.");
        } else if (e.code === "auth/wrong-password") {
          toast.error("Wrong password. Please try again.");
        } else if (e.code === "auth/user-disabled") {
          toast.error("This user account has been disabled.");
        } else if (e.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Please try again later.");
        } else if (e.code === "auth/operation-not-allowed") {
          toast.error("Operation not allowed. Please contact support.");
        } else if (e.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error(e.message || "An unexpected error occurred.");
        }
      });
  };
  return (
    <div
      className=" px-4 flex justify-center items-center   bg-linear-to-r from-[#ff512f]/90 via-[#ff2a68] to-[#dd2476]/90
 animate-gradient"
    >
      <div className="bg-white/90 w-[450px] p-6 rounded-2xl shadow-2xl my-4  border border-white/20">
        <div className="text-center mb-3">
          <h1 className="text-2xl font-bold mt-2 text-gray-800">Register</h1>
        </div>

        <form onSubmit={handleRegistration}>
          {" "}
          <div className="mb-3 ">
            <label className=" text-gray-500 text-sm  ">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              required
              className="w-full px-5 py-3 rounded-full bg-white shadow-md focus:outline-none "
            />
          </div>{" "}
          <div className="mb-3 ">
            <label className=" text-gray-500 text-sm  ">PhotoURL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="Enter Your PhotoURL"
              required
              className="w-full px-5 py-3 rounded-full bg-white shadow-md focus:outline-none "
            />
          </div>
          <div className="mb-3 ">
            <label className=" text-gray-500 text-sm  ">Email</label>
            <input
              type="text"
              name="email"
              placeholder="example@gmail.com"
              required
              className="w-full px-5 py-3 rounded-full bg-white shadow-md focus:outline-none "
            />
          </div>
          <div className="relative mb-3">
            <label className=" text-gray-500 text-sm ">Password</label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              required
              className="w-full px-5 py-3 rounded-full bg-white shadow-md focus:outline-none"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-4 top-10 cursor-pointer "
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full mt-3 py-3 rounded-full bg-linear-to-r from-red-500 to-orange-500 text-white font-semibold   shadow-lg hover:shadow-xl hover:scale-105 "
          >
            Register
          </button>
          <div className="flex items-center my-5 text-gray-400 text-sm">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="mx-3">or continue with</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <div className="flex justify-center gap-4">
            <button className="btn w-full h-12 shadow-lg hover:shadow-xl  rounded-full hover:scale-105 transition-transform bg-white text-black border-[#e5e5e5]">
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>{" "}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-red-500 font-semibold hover:text-orange-500"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
