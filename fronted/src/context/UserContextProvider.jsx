import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import {
  getCurrentUser,
  logoutLocalUser,
  syncUserToStore,
} from "../lib/socialStore";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
    logoutLocalUser();
  };

  useEffect(() => {
    const storedUser = getCurrentUser();
    const accessToken = window.localStorage.getItem("accessToken");

    if (storedUser && accessToken) {
      setUser(syncUserToStore(storedUser));
    } else if (storedUser && !accessToken) {
      logoutLocalUser();
    }

    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
