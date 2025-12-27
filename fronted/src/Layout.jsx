import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import UserContextProvider from "./context/UserContextProvider";
import { ThemeProvider } from "./context/theme";

const Layout = () => {
  const [themeMode, setThemeMode] = useState("dark");
  const location = useLocation();

  const hideHeaderFooter =
    location.pathname === "/login" ||
    location.pathname === "/register";

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode }}>
      <UserContextProvider>

        {!hideHeaderFooter && <Header />}

        <Outlet />

        {!hideHeaderFooter && <Footer />}

      </UserContextProvider>
    </ThemeProvider>
  );
};

export default Layout;
