import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { CircleLoader } from "react-spinners";
import { AuthContext } from "../Context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();
  console.log(location);

  if (loading) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <CircleLoader color="#FF6B6B" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={location.pathname} />;
  }
  return children;
};

export default PrivateRoute;
