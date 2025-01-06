"use client";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useSession, signIn } from "next-auth/react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [userInfo, setUserInfo] = useState([]);
  const { data: session } = useSession();

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
      console.log('res', res)
      Cookies.set("userId", JSON.stringify(res.data));
      setCurrentUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      return null;
    }
  };

  const loginWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const getUserId = Cookies.get("userId")
        ? JSON.parse(Cookies.get("userId"))
        : null;

      if (getUserId && getUserId.token) {
        const decodedToken = jwtDecode(getUserId.token);
        const userid = decodedToken.userid;

        try {
          await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userId`,
            { userid }
          );
        } catch (err) {
          console.error(err);
        }
      }
    };

    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/info`,
          { withCredentials: true }
        );
        if (res.data.user && res.data.user.length > 0) {
          setUserInfo(res.data.user);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (currentUser) {
      fetchUserId();
      fetchUserInfo();
    }
  }, [currentUser]);

  useEffect(() => {
    if (session) {
      setCurrentUser(session.user);
      setIsAuthenticated(true);
    }
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        loginWithGoogle,
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
