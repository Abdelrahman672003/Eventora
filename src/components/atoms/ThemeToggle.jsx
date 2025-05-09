// src/components/atoms/ThemeToggle.jsx
import { useEffect, useState } from "react";
import { Sun, SunMoon } from "lucide-react";

const ThemeToggle = ({ isDark, setIsDark }) => {
  return (
    <button onClick={() => setIsDark(!isDark)} className="mr-2 cursor-pointer">
      {isDark ? (
        <Sun className="text-white" />
      ) : (
        <SunMoon className="text-primary" />
      )}
    </button>
  );
};

export default ThemeToggle;
