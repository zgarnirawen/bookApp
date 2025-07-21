import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ToggleButton() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="toggle-btn"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="icon" size={24} />
      ) : (
        <Sun className="icon" size={24} />
      )}
    </button>
  );
}
