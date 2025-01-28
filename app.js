import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import JoblyApi from "./JoblyApi";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Homepage from "./Homepage";
import Profile from "./Profile";
import Navigation from "./Navigation";
import UserContext from "./UserContext";
import useLocalStorage from "./useLocalStorage";

function App() {
  const [token, setToken] = useLocalStorage("token");
  const [currentUser, setCurrentUser] = useState(null);

  // Load current user when token changes
  useEffect(() => {
    async function fetchCurrentUser() {
      if (token) {
        try {
          const { username } = jwtDecode(token); // Decode token to get username
          JoblyApi.token = token; // Set token on the API
          const user = await JoblyApi.getUser(username); // Fetch user details
          setCurrentUser(user);
        } catch (err) {
          console.error("Error fetching user:", err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    }

    fetchCurrentUser();
  }, [token]);

  // Login function
  async function login(credentials) {
    try {
      const newToken = await JoblyApi.login(credentials); // Get token
      setToken(newToken); // Save token in localStorage
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  }

  // Signup function
  async function signup(newUserData) {
    try {
      const newToken = await JoblyApi.signup(newUserData); // Get token
      setToken(newToken); // Save token in localStorage
    } catch (err) {
      console.error("Signup failed:", err);
      throw err;
    }
  }

  // Logout function
  function logout() {
    setCurrentUser(null);
    setToken(null); // Clear token from localStorage
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, login, signup, logout }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/login" />} />
          {/* Add additional protected routes */}
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
