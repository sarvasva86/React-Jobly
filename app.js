import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JoblyApi from "./JoblyApi";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Navigation from "./Navigation";
import Homepage from "./Homepage";
import UserContext from "./UserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Effect to load the current user when the token changes
  useEffect(() => {
    async function fetchCurrentUser() {
      if (token) {
        try {
          const { username } = jwtDecode(token); // Decode the token to get the username
          JoblyApi.token = token; // Set the token on the API utility
          const user = await JoblyApi.getUser(username); // Fetch user data
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
      const token = await JoblyApi.login(credentials); // Authenticate user
      setToken(token); // Save token in state
      localStorage.setItem("token", token); // Persist token in localStorage
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  }

  // Signup function
  async function signup(newUserData) {
    try {
      const token = await JoblyApi.signup(newUserData); // Register user
      setToken(token); // Save token in state
      localStorage.setItem("token", token); // Persist token in localStorage
    } catch (err) {
      console.error("Signup failed:", err);
      throw err;
    }
  }

  // Logout function
  function logout() {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("token"); // Clear token from localStorage
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, login, signup, logout }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
