"use client";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [userInfo, setUserInfo] = useState([]);

  // usado no BtnSignOut
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  const login = async (inputs) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        inputs,
        { withCredentials: true }
      );
      setCurrentUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      return null;
    }
  };


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        userInfo,
        setCurrentUser,
        setIsAuthenticated,
        isModalOpen,
        setIsModalOpen,
        toggleModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
