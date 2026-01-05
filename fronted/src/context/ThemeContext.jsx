import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
  themeMode: "dark",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeMode(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(themeMode);
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme
export default function useTheme() {
  return useContext(ThemeContext);
}
