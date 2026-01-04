import React, { useContext } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const DEMO_USER = {
  email: "jobayer9561@gmail.com",
  password: "Abcdef",
};

const Login = () => {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const { LoginUser, signInWithGoogle, setUser, setLoading } =
    useContext(AuthContext);
  const location = useLocation();
  const from = location.state || "/";
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleBlur = (field, value) => {
    setTouched({ ...touched, [field]: true });
    if (field === "email") {
      setErrors({ ...errors, email: validateEmail(value) });
    } else if (field === "password") {
      setErrors({ ...errors, password: validatePassword(value) });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      setTouched({ email: true, password: true });
      toast.error("Please fix the errors in the form");
      return;
    }

    toast.loading("Logging In User");
    LoginUser(email, password)
      .then((res) => {
        console.log(res);
        setUser(res.user);
        toast.dismiss();
        navigate(from);
        toast.success("Login successful");
        e.target.reset();
        setErrors({ email: "", password: "" });
        setTouched({ email: false, password: false });
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss();
        if (err.code === "auth/user-not-found") {
          toast.error("No user found with this email");
        } else if (err.code === "auth/wrong-password") {
          toast.error("Incorrect password");
        } else if (err.code === "auth/invalid-email") {
          toast.error("Invalid email format");
        } else if (err.code === "auth/user-disabled") {
          toast.error("This account has been disabled");
        } else if (err.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Please try again later");
        } else {
          toast.error(err.message);
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
            navigate(from);
            toast.success("Google Sign-in successful");
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

  const handleDemoLogin = (type) => {
    const credentials = type === "user" ? DEMO_USER : DEMO_ADMIN;
    const form = document.querySelector("form");
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');

    emailInput.value = credentials.email;
    passwordInput.value = credentials.password;

    setErrors({ email: "", password: "" });
    setTouched({ email: false, password: false });

    setTimeout(() => {
      form.requestSubmit();
    }, 100);
  };

  return (
    <div className="min-h-screen px-4 flex justify-center items-center bg-linear-to-br from-gray-50 to-gray-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-linear-to-br from-[#ff512f]/20 to-[#dd2476]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-linear-to-br from-[#dd2476]/20 to-[#ff512f]/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10 py-8"
      >
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#ff512f] to-[#dd2476] rounded-2xl mb-4 shadow-lg"
            >
              <FaSignInAlt className="text-white text-2xl" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-[#ff512f] to-[#dd2476] bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 mt-2">
              Sign in to continue to MovieMaster
            </p>
          </div>

          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <p className="text-xs text-gray-600 mb-3 text-center font-medium">
              Quick Login with Demo Credentials
            </p>
            <div className="flex gap-3">
              <motion.button
                type="button"
                onClick={() => handleDemoLogin("user")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                Demo User
              </motion.button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
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
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaLock />
                </div>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
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
            </div>

            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-[#ff512f] transition-colors font-medium"
              >
                Forgot password?
              </a>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-full bg-linear-to-r from-[#ff512f] to-[#dd2476] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Sign In
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
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#ff512f] font-semibold hover:text-[#dd2476] transition-colors"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
