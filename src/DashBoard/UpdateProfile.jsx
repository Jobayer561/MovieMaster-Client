import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FaUserEdit, FaCameraRetro, FaArrowLeft } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { user, updateProfileFunc, setUser, setLoading } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    setDisplayName(user?.displayName || "");
    setPhotoURL(user?.photoURL || "");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You need to be signed in to update your profile.");
      return navigate("/login");
    }

    const trimmedName = displayName.trim();
    const trimmedPhoto = photoURL.trim();

    try {
      setLoading(true);
      await updateProfileFunc(trimmedName, trimmedPhoto);
      setUser({ ...user, displayName: trimmedName, photoURL: trimmedPhoto });
      toast.success("Profile updated successfully");
      navigate("/dashboard/profile");
    } catch (err) {
      toast.error(err?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaArrowLeft /> Back
          </button>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="h-28 bg-gradient-to-r from-[#ff512f] to-[#dd2476]"></div>

          <div className="px-8 pb-10 -mt-14">
            <div className="flex flex-col items-center mb-6">
              <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                <img
                  alt="profile"
                  src={photoURL || "https://via.placeholder.com/120"}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="mt-3 text-2xl font-bold text-gray-800 text-center">
                {displayName || "Update your profile"}
              </h2>
              <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FaUserEdit className="text-[#ff512f]" /> Display Name
                  </span>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your display name"
                    className="mt-2 input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#ff512f]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FaCameraRetro className="text-[#dd2476]" /> Photo URL
                  </span>
                  <input
                    type="url"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="mt-2 input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#dd2476]"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#ff512f] to-[#dd2476] text-white font-semibold py-3 rounded-full shadow-lg hover:scale-[1.01] transition-transform duration-200"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
