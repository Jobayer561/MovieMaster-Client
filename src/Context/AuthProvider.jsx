import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 
const createUser = (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password);
}

const LoginUser = (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
}

  const authInfo = {
    createUser,
    LoginUser,
    user,
    loading,
    setUser,setLoading
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
