"use client";
import { initializeApp } from "firebase/app";
import { createContext, useState } from "react";

export const GlobalStateContext = createContext({});

export const GlobalStateProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <GlobalStateContext.Provider
      value={{ authUser, setAuthUser, isCollapsed, setIsCollapsed }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
