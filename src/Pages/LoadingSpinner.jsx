import React from "react";
import { Link } from "react-router";

const LoadingSpinner = ({ count = 8 }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4">
          <div className="skeleton h-52 md:h-64 w-full border border-gray-200 rounded-md "></div>
          <div className="flex justify-between">
            <div className="skeleton h-4 w-28 rounded"></div>{" "}
            <div className="skeleton h-4 w-28 rounded-full"></div>
          </div>
          <div className="skeleton h-6 w-full">

          </div>
          <div className="flex justify-end gap-4">
            <div className="skeleton h-4 w-20 rounded"></div>
            <div className="skeleton h-4 w-16 rounded"></div>
          </div>
          <Link className="px-2 py-5 skeleton w-full rounded-full mt-5"></Link>
        </div>
      ))}
    </div>
  );
};

export default LoadingSpinner;
