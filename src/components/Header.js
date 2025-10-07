import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Header = ({ searchTerm = "", onSearchChange = null, showSearch = false }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; 

      try {
        const { data } = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleDashboard = () => {
    navigate("/dashboard");
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/", { replace: true });
    setDropdownOpen(false);
  };

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-lg flex justify-between items-center px-6 py-4">
      <div className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => navigate("/")}>Notes</div>

      {showSearch && onSearchChange && (
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search notes by title, content, or tags..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      <div className="relative">
        {user ? (
          <>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                {user?.name?.[0] || "U"}
              </div>
              <span className="font-medium">{user?.name}</span>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-40">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleDashboard}
                >
                  Dashboard
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-[#1a1a1a] text-white rounded hover:scale-105 transition-transform"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="px-4 py-2 border border-[#1a1a1a] text-[#1a1a1a] rounded hover:scale-105 transition-transform"
              onClick={handleSignup}
            >
              Signup
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
