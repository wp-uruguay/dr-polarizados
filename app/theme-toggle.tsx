"use client";

import { useEffect, useState } from "react";

type ThemeMode = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme as ThemeMode | undefined;
    if (current === "dark" || current === "light") {
      setTheme(current);
      return;
    }
    setTheme("dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("dp-theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Cambiar tema"
    >
      <span>{theme === "dark" ? "Claro" : "Oscuro"}</span>
    </button>
  );
}
