import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar";
import UserContextProvider from "./context/UserContextProvider";
import { ThemeProvider } from "./context/theme";
import PostModal from "./components/Post/PostModal";

const Layout = () => {
  const [themeMode, setThemeMode] = useState("dark");
  const [openPost, setOpenPost] = useState(false);
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

        {!hideHeaderFooter && (
          <Header onPostClick={() => setOpenPost(true)} />
        )}

        {!hideHeaderFooter && (
          <Sidebar onPostClick={() => setOpenPost(true)} />
        )}

        {/* 🔥 Post Popup */}
        <PostModal
          open={openPost}
          onClose={() => setOpenPost(false)}
        />

        <main className="flex-1 pt-14">
          <Outlet />
        </main>

      </UserContextProvider>
    </ThemeProvider>
  );
};

export default Layout;
