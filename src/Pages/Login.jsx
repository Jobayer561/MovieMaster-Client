import React, { useContext } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const [show, setShow] = useState(false);
  const { LoginUser, signInWithGoogle, setUser, setLoading } =
    useContext(AuthContext);
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    toast.loading("Logging In User");
    LoginUser(email, password)
      .then((res) => {
        console.log(res);
        setUser(res.user);
        toast.dismiss();
        toast.success("Signin successful");
        e.target.reset();
        navigate(from);
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss();
        toast.error(err.message);
      });
  };
  const handleGoogleSignin = () => {
    setLoading(true);
    signInWithGoogle()
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        fetch("https://b12-a10-movie-master-server.vercel.app/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("User saved in DB", data);
            setUser(result.user);
            toast.dismiss();
            toast.success("Google Sign-in successful");
            navigate(from);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss();
        toast.error(error.message);
        setLoading(false);
      });
  };
  return (
    <div
      className="min-h-screen px-4 flex justify-center items-center   
 animate-gradient"
    >
      <div className="w-[450px] p-6 rounded-2xl shadow-2xl  border border-white/20">
        <div className="text-center mb-3">
          <h1 className="text-2xl font-bold mt-2 primary">Login</h1>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3 ">
            <label className=" text-gray-500 text-sm  font-semibold">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="example@gmail.com"
              required
              className="w-full px-5 py-3 rounded-full  shadow-md border border-gray-200 focus:outline-none "
            />
          </div>

          <div className="relative mb-3">
            <label className=" text-gray-500 text-sm font-semibold">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              required
              className="w-full px-5 py-3 rounded-full  shadow-md border border-gray-300 focus:outline-none"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-4 top-10 cursor-pointer "
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm mb-6">
            <a href="#" className="text-gray-500 hover:text-red-500">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-linear-to-r from-red-500 to-orange-500 text-white font-semibold   shadow-lg hover:shadow-xl hover:scale-105 "
          >
            Login
          </button>

          <div className="flex items-center my-5 text-gray-400 text-sm">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="mx-3">or continue with</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleGoogleSignin}
              className="btn bg-linear-to-r from-red-500 to-orange-500  w-full h-12 shadow-lg hover:shadow-xl  rounded-full hover:scale-105 transition-transform  text-white "
            >
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
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-red-500 font-semibold hover:text-orange-500"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
