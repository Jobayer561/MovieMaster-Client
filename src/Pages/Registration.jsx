import React from "react";
import { useState } from "react";
import {
  FaEye,
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaUserPlus,
} from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Registration = () => {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    photoURL: false,
    password: false,
  });
  const {
    createUser,
    setUser,
    signInWithGoogle,
    updateProfileFunc,
    setLoading,
  } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();

  const validateName = (name) => {
    if (!name) return "Name is required";
    if (name.length < 3) return "Name must be at least 3 characters";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[a-z]/.test(password))
      return "Password must contain a lowercase letter";
    if (!/[A-Z]/.test(password))
      return "Password must contain an uppercase letter";
    return "";
  };

  const handleBlur = (field, value) => {
    setTouched({ ...touched, [field]: true });
    const validators = {
      name: validateName,
      email: validateEmail,
      password: validatePassword,
    };
    if (validators[field]) {
      setErrors({ ...errors, [field]: validators[field](value) });
    }
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoUrl = e.target.photoURL.value;
    const password = e.target.password.value;

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (nameError || emailError || passwordError) {
      setErrors({
        name: nameError,
        email: emailError,
        photoURL: "",
        password: passwordError,
      });
      setTouched({
        name: true,
        email: true,
        photoURL: true,
        password: true,
      });
      toast.error("Please fix the errors in the form");
      return;
    }

    toast.loading("Registering user...");
    createUser(email, password)
      .then(() => updateProfileFunc(name, photoUrl))
      .then(() => {
        const userInfo = {
          name,
          email,
          image: photoUrl,
        };
        fetch("https://b12-a10-movie-master-server.vercel.app/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("User saved:", data);
            setUser({ displayName: name, email, photoURL: photoUrl });
            toast.dismiss();
            toast.success("Registration successful!");
            e.target.reset();
            setErrors({ name: "", email: "", photoURL: "", password: "" });
            setTouched({
              name: false,
              email: false,
              photoURL: false,
              password: false,
            });
            navigate("/");
          });
      })
      .catch((e) => {
        toast.dismiss();
        setLoading(false);
        if (e.code === "auth/email-already-in-use") {
          toast.error("User already exists in the database.");
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
    <div className="min-h-screen px-4 py-8 flex justify-center items-center bg-linear-to-br from-gray-50 to-gray-100">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-linear-to-br from-[#ff512f]/20 to-[#dd2476]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-linear-to-br from-[#dd2476]/20 to-[#ff512f]/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#ff512f] to-[#dd2476] rounded-2xl mb-4 shadow-lg"
            >
              <FaUserPlus className="text-white text-2xl" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-[#ff512f] to-[#dd2476] bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-gray-600 mt-2">Join MovieMaster today</p>
          </div>

          <form onSubmit={handleRegistration} className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaUser />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  onBlur={(e) => handleBlur("name", e.target.value)}
                  onChange={(e) =>
                    touched.name && handleBlur("name", e.target.value)
                  }
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none placeholder:text-gray-400 ${
                    errors.name && touched.name
                      ? "border-red-500 focus:border-red-600 bg-red-50"
                      : "border-gray-200 focus:border-[#ff512f] bg-white"
                  }`}
                />
              </div>
              {errors.name && touched.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-2 flex items-center gap-1"
                >
                  <span className="text-red-500">⚠</span> {errors.name}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onBlur={(e) => handleBlur("email", e.target.value)}
                  onChange={(e) =>
                    touched.email && handleBlur("email", e.target.value)
                  }
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none placeholder:text-gray-400 ${
                    errors.email && touched.email
                      ? "border-red-500 focus:border-red-600 bg-red-50"
                      : "border-gray-200 focus:border-[#ff512f] bg-white"
                  }`}
                />
              </div>
              {errors.email && touched.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-2 flex items-center gap-1"
                >
                  <span className="text-red-500">⚠</span> {errors.email}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Photo URL
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaImage />
                </div>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="Enter image URL"
                  onBlur={(e) => handleBlur("photoURL", e.target.value)}
                  onChange={(e) =>
                    touched.photoURL && handleBlur("photoURL", e.target.value)
                  }
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none placeholder:text-gray-400 ${
                    errors.photoURL && touched.photoURL
                      ? "border-red-500 focus:border-red-600 bg-red-50"
                      : "border-gray-200 focus:border-[#ff512f] bg-white"
                  }`}
                />
              </div>
              {errors.photoURL && touched.photoURL && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-2 flex items-center gap-1"
                >
                  <span className="text-red-500">⚠</span> {errors.photoURL}
                </motion.p>
              )}
            </div>
            {/* Password Field */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaLock />
                </div>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  onBlur={(e) => handleBlur("password", e.target.value)}
                  onChange={(e) =>
                    touched.password && handleBlur("password", e.target.value)
                  }
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none placeholder:text-gray-400 ${
                    errors.password && touched.password
                      ? "border-red-500 focus:border-red-600 bg-red-50"
                      : "border-gray-200 focus:border-[#ff512f] bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {show ? (
                    <FaEye className="text-lg" />
                  ) : (
                    <IoEyeOff className="text-lg" />
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-2 flex items-center gap-1"
                >
                  <span className="text-red-500">⚠</span> {errors.password}
                </motion.p>
              )}
              {!errors.password && (
                <p className="text-gray-500 text-xs mt-2">
                  Must be 6+ characters with uppercase and lowercase letters
                </p>
              )}
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-full bg-linear-to-r from-[#ff512f] to-[#dd2476] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mt-6"
            >
              Create Account
            </motion.button>
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
              <span className="px-4 text-gray-500 text-sm">
                or continue with
              </span>
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            <motion.button
              type="button"
              onClick={handleGoogleSignin}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-full bg-white border-2 border-gray-200 hover:border-[#ff512f] text-gray-700 font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
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
              Continue with Google
            </motion.button>

            <p className="text-center text-gray-600 text-sm mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#ff512f] font-semibold hover:text-[#dd2476] transition-colors"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Registration;
