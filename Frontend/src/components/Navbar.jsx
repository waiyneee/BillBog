import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../state/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get auth state from Redux
  const { isLoggedIn, fullName } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/signout", {}, { withCredentials: true });
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.response?.data || error.message);
    }
  };

  return (
    <nav className="bg-[#f9f7f3] border-b border-gray-200 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo and Home */}
          <div className="flex items-center space-x-4">
            <a href="/" className="text-green-600 font-semibold text-xl">
              BillBog
            </a>
            <a href="/" className="text-gray-700 hover:text-green-600">
              Home
            </a>

            {/* Show Sign In & Sign Up if not logged in */}
            {!isLoggedIn && (
              <>
                <a href="/signin" className="text-gray-700 hover:text-green-600">
                  Sign In
                </a>
                <a href="/signup" className="text-gray-700 hover:text-green-600">
                  Sign Up
                </a>
              </>
            )}
          </div>

          {/* Right: Username dropdown if logged in */}
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 focus:outline-none"
              >
                <span>{fullName || "User"}</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
