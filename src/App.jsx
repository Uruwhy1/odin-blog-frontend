import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Import Navigate

import Header from "./components/header/Header";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { jwtDecode } from "jwt-decode";

import "./reset.css";
import "./App.css";
import "./variables.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setIsLoggedIn(true);
      setUsername(decodedToken.username);
    }
  }, []);

  const handleLogout = () => {
    alert("Test");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header
                username={username}
                handleLogout={handleLogout}
                isLoggedIn={isLoggedIn}
              />
              <Home />
            </>
          }
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Auth type={true} />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/" /> : <Auth type={false} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
