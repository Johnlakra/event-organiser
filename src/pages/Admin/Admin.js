import React, { useState } from "react";
import LiveEventsForm from "./LiveEventsForm";
import LeaderboardForm from "./LeaderboardForm";
import "./Admin.css";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("liveEvents");

  const correctPassword = "your_secure_password"; // Replace with a secure password

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
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
      <h1>Admin Panel</h1>
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
