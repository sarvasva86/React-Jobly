import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

function Navigation() {
  const { currentUser, logout } = useContext(UserContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      {currentUser ? (
        <>
          <span>Welcome, {currentUser.username}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}

export default Navigation;
