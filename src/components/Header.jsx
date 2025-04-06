// src/components/Header.jsx
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="logo">GitHub Repository Explorer</div>
      <button
        className="theme-toggle"
        onClick={toggleDarkMode}
        aria-label="Toggle theme"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </header>
  );
};

export default Header;
