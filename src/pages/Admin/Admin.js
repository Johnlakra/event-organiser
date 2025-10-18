import React, { useCallback, useEffect, useState } from "react";
import LiveEventsForm from "./LiveEventsForm";
import LeaderboardForm from "./LeaderboardForm";
import "./Admin.css";
import { useDispatch } from "react-redux";
import { getDropdown } from "../../redux/dropdown/dropdownSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SESSION_DURATION = 6 * 60 * 60 * 1000; // 6 hours

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("liveEvents");
  const dispatch = useDispatch();

  // console.log("Password from env:", process.env.REACT_APP_ADMIN_PASSWORD);

  const correctPassword = process.env.REACT_APP_ADMIN_PASSWORD;

  // Check authentication on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("isAdminAuthenticated");
    const loginTime = sessionStorage.getItem("adminLoginTime");
    
    if (savedAuth === "true" && loginTime) {
      const timePassed = Date.now() - parseInt(loginTime);
      
      if (timePassed < SESSION_DURATION) {
        setIsAuthenticated(true);
      } else {
        sessionStorage.clear();
      }
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("isAdminAuthenticated", "true");
      sessionStorage.setItem("adminLoginTime", Date.now().toString());
    } else {
      alert("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.clear();
  };

  const fetchDropdowns = useCallback(async () => {
    await dispatch(getDropdown());
  }, [dispatch]);

  useEffect(() => {
    fetchDropdowns();
  }, [fetchDropdowns]);

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="password-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password-btn"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <div className="tabs">
        <button
          className={activeTab === "liveEvents" ? "active" : ""}
          onClick={() => setActiveTab("liveEvents")}
        >
          Live Events
        </button>
        <button
          className={activeTab === "leaderboard" ? "active" : ""}
          onClick={() => setActiveTab("leaderboard")}
        >
          Leaderboard
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "liveEvents" && <LiveEventsForm />}
        {activeTab === "leaderboard" && <LeaderboardForm />}
      </div>
    </div>
  );
};

export default Admin;