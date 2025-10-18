import React, { useCallback, useEffect, useState } from "react";
import LiveEventsForm from "./LiveEventsForm";
import LeaderboardForm from "./LeaderboardForm";
import "./Admin.css";
import { useDispatch } from "react-redux";
import { getDropdown } from "../../redux/dropdown/dropdownSlice";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("liveEvents");
  const dispatch = useDispatch();

  // console.log("Password from env:", process.env.REACT_APP_ADMIN_PASSWORD);

  const correctPassword = process.env.REACT_APP_ADMIN_PASSWORD;

  // Check if already logged in on component mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("isAdminAuthenticated");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("isAdminAuthenticated", "true");
    } else {
      alert("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isAdminAuthenticated");
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
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Admin Panel</h1>
        <button 
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f82249",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
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