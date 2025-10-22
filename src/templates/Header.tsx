import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore"; // ✅ Import your auth store
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // ✅ Access auth state
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Shrink after scrolling 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout(); // clear tokens / user info
    navigate("/login");
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="logo">🚗 UC-Collection</div>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/cars">Cars</a>
          <a href="/contact">Contact</a>

          {/* ✅ Conditionally render Login or Logout */}
          {user ? (
            <button onClick={handleLogout} className="signin logout">
              Logout
            </button>
          ) : (
            <a href="/login" className="signin">
              Sign In
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
