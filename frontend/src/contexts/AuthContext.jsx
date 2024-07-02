'use client'
import { createContext, useState, useEffect, use } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [userInfo, setUserInfo] = useState([]);

  const login = async (inputs) => {
    try {
      const res = await axios.post("https://erp-mkt.vercel.app/api/auth/login", inputs, { withCredentials: true });
      Cookies.set('loginResponse', JSON.stringify(res.data));
      setCurrentUser(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  
  useEffect(() => {
    const fetchUserId = async () => {
      const loginResponse = Cookies.get('loginResponse') ? JSON.parse(Cookies.get('loginResponse')) : null;

      if (loginResponse && loginResponse.token) {
        const decodedToken = jwtDecode(loginResponse.token);
        const userid = decodedToken.userid;
        try {
          const res = await axios.post("https://erp-mkt.vercel.app/api/userId", { userid });

        } catch (err) {
          console.error(err);
        }
      }
    };

    const fetchUserInfo = async () => {
      try{
        const res = await axios.get("https://erp-mkt.vercel.app/api/users/info", { withCredentials: true });
        if (res.data.user && res.data.user.length > 0) {
          setUserInfo(res.data.user); 
        }
      }catch(err){
        console.error(err);
      }
    }

    fetchUserId();
    if (currentUser) {
      fetchUserInfo();
    }
  }, [currentUser]);



  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};