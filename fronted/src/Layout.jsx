import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import UserContextProvider from "./context/UserContextProvider";
import { ThemeProvider } from "./context/theme";

const Layout = () => {
  const [themeMode, setThemeMode] = useState("dark");
  const location = useLocation();

  const hideHeaderFooter =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register");

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

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

  return (
    <ThemeProvider value={{ themeMode, toggleTheme }}>
      <UserContextProvider>
        {!hideHeaderFooter && <Header />}
        <Outlet />
        {!hideHeaderFooter && <Footer />}
      </UserContextProvider>
    </ThemeProvider>
  );
};

export default Layout;
