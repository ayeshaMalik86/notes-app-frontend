import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Header = ({ searchTerm = "", onSearchChange = null, showSearch = false }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

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
    <header className="w-full bg-white border-b border-gray-200 shadow-lg">
      <div className="flex justify-between items-center px-4 sm:px-6 py-4">
        <div className="text-xl sm:text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => navigate("/")}>
          Notes
        </div>

        {/* Desktop Search Bar - Hidden on mobile */}
        {showSearch && onSearchChange && (
          <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
            <div className="relative w-full">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Right side - Search toggle (mobile) and User menu */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Search Toggle */}
          {showSearch && onSearchChange && (
            <button
              onClick={toggleSearch}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Toggle search"
            >
              {searchOpen ? (
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              ) : (
                <MagnifyingGlassIcon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          )}

          {/* User Section */}
          <div className="relative">
            {user ? (
              <>
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-sm sm:text-base">
                    {user?.name?.[0] || "U"}
                  </div>
                  <span className="hidden sm:block font-medium text-sm lg:text-base">{user?.name}</span>
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-40">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={handleDashboard}
                    >
                      Dashboard
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex space-x-2 sm:space-x-4">
                <button
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-[#1a1a1a] text-white rounded hover:scale-105 transition-transform"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base border border-[#1a1a1a] text-[#1a1a1a] rounded hover:scale-105 transition-transform"
                  onClick={handleSignup}
                >
                  Signup
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Slides down when toggled */}
      {showSearch && onSearchChange && searchOpen && (
        <div className="md:hidden px-4 pb-4 animate-slideDown">
          <div className="relative w-full">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
