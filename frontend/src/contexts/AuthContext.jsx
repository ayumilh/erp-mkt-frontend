'use client'
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useSession, signIn } from 'next-auth/react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [userInfo, setUserInfo] = useState([]);
  const { data: session } = useSession();

  const login = async (inputs) => {
    try {
      const res = await axios.post("https://erp-mkt.vercel.app/api/auth/login", inputs, { withCredentials: true });
      console.log(res.data);
      Cookies.set('loginResponse', JSON.stringify(res.data));
      setCurrentUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const loginWithGoogle = async () => { 
  //   const response = await signIn('google', { redirect: false });
  //   console.log(response)

  //   const email = response.user?.email;
  //   const senha = 'google-oauth';
  //   console.log(email, senha);
  //   try {
  //     await login({ email, senha });
  //   } catch (error) {
  //     console.error('Error:', error);
  //   } finally {
  //     console.log(res.data);
  //   }
  // };

  const loginWithGoogle = async () => { 
    console.log('loginWithGoogle');
    try {
      const response = await signIn('google', { redirect: false });
      console.log('signIn response:', response); 
      if (response.error) {
        console.error('Erro ao logar com Google:', response.error);
        return;
      }
      const email = response.user?.email;
      const senha = 'google-oauth';
      console.log('Email:', email, 'Senha:', senha); 
      await login({ email, senha });
      return { email, senha };
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  useEffect(() => {
    const fetchUserId = async () => {
      const loginResponse = Cookies.get('loginResponse') ? JSON.parse(Cookies.get('loginResponse')) : null;

      if (loginResponse && loginResponse.token) {
        const decodedToken = jwtDecode(loginResponse.token);
        const userid = decodedToken.userid;
        console.log(userid);
        try {
          const res = await axios.post("https://erp-mkt.vercel.app/api/userId", { userid });
          console.log("POST: ", res.data);
        } catch (err) {
          console.error(err);
        }
      }
    };

    const fetchUserInfo = async () => {
      try {
        const res = await axios.get("https://erp-mkt.vercel.app/api/users/info", { withCredentials: true });
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
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, loginWithGoogle, userInfo, setCurrentUser, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};