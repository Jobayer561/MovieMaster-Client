import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-[#ff512f] to-[#dd2476]"></div>

          <div className="flex flex-col items-center px-6 pb-8">
            <div className="-mt-16 mb-6">
              <img
                alt="profile"
                src={user?.photoURL || "https://via.placeholder.com/120"}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>

            <h1 className="text-3xl font-bold text-gray-800 text-center">
              {user?.displayName || "User"}
            </h1>
            <p className="text-gray-600 mt-2">{user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">ID: {user?.uid}</p>

            <div className="w-full mt-8 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">
                  Email Address
                </p>
                <p className="text-lg text-gray-800 font-medium mt-1">
                  {user?.email}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">
                  Display Name
                </p>
                <p className="text-lg text-gray-800 font-medium mt-1">
                  {user?.displayName || "User"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">
                  User ID
                </p>
                <p className="text-sm text-gray-800 font-mono mt-1 break-all">
                  {user?.uid}
                </p>
              </div>
            </div>

            <div className="w-full mt-8 flex justify-center">
              <button
                onClick={() => navigate("/dashboard/profile/edit")}
                className="flex-1 bg-gradient-to-r from-[#ff512f] to-[#dd2476] text-white px-4 py-2 rounded-full hover:scale-105 font-semibold hover:shadow-lg transition-all duration-300"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
