import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Import Navigate

import Header from "./components/Header";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { jwtDecode } from "jwt-decode";

import "./App.css";
import "./reset.css";

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
              <Header />
              <Home username={username} handleLogout={handleLogout} />
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
