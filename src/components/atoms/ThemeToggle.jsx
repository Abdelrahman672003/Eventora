// src/components/atoms/ThemeToggle.jsx
import { useEffect, useState } from "react";
import { Sun, SunMoon } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 cursor-pointer"
    >
      {isDark ? (
        <Sun className="text-white" />
      ) : (
        <SunMoon className="text-primary" />
      )}
    </button>
  );
};

export default ThemeToggle;
