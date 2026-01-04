import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const TopBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate("/login");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  const toggle = () => setOpen(!open);

  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-100 px-4 py-3 shadow-sm mt-6 md:mt-0">
      <div className="flex items-center gap-2 font-bold text-lg text-gray-800 px-8">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-[#ff512f] to-[#dd2476] text-white px-6">
          MM
        </span>
        <span>MovieMaster</span>
      </div>

      <div className="relative px-6">
        <button
          onClick={toggle}
          className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:border-[#ff512f] hover:text-[#ff512f]"
        >
          <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
            {user?.displayName?.[0]?.toUpperCase() ||
              user?.email?.[0]?.toUpperCase() ||
              "U"}
          </span>
          <span className="hidden sm:inline">
            {user?.displayName || "Profile"}
          </span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-100 bg-white shadow-lg z-20 ">
            <div className="px-4 py-2 text-xs text-gray-500">Account</div>
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Dashboard Home
            </Link>
            <Link
              to="/dashboard/profile"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Profile
            </Link>
            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
