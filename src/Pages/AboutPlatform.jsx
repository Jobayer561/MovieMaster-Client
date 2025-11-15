import React from "react";
import { MdHighQuality, MdSecurity, MdSpeed, MdDevices } from "react-icons/md";

const MovieMasterPro = () => {
  return (
    <div className="py-16 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 primary  ">
          Welcome to MovieMaster Pro
        </h2>
        <p className="text-center text-gray-500 max-w-3xl mx-auto mb-10">
          MovieMaster Pro is your ultimate destination for discovering,
          streaming, and managing movies with speed, style, and security.
          Designed for cinephiles and casual viewers alike, it brings powerful
          features in a sleek, intuitive interface.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="bg-[#2A2438] p-6 rounded-lg shadow-md hover:scale-105 transition-transform">
            <MdHighQuality size={40} className="mx-auto text-orange-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">HD & 4K Streaming</h3>
            <p className="text-gray-400 text-sm">
              Enjoy crystal-clear visuals with support for high-definition and
              ultra-HD formats.
            </p>
          </div>

          <div className="bg-[#2A2438] p-6 rounded-md shadow-md hover:scale-105 transition-transform">
            <MdSpeed size={40} className="mx-auto text-pink-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-400 text-sm">
              Optimized for speed—browse and stream without buffering or delays.
            </p>
          </div>

          <div className="bg-[#2A2438] p-6 rounded-lg shadow-md hover:scale-105 transition-transform">
            <MdSecurity size={40} className="mx-auto text-red-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-400 text-sm">
              Your data is protected with end-to-end encryption and secure
              login.
            </p>
          </div>

          <div className="bg-[#2A2438] p-6 rounded-lg shadow-md hover:scale-105 transition-transform">
            <MdDevices size={40} className="mx-auto text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cross-Device Access</h3>
            <p className="text-gray-400 text-sm">
              Watch on any device—mobile, tablet, desktop, or smart TV.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieMasterPro;
