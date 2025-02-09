"use client";

import { initializeApp } from "firebase/app";
import { createContext, useState } from "react";

export const GlobalStateContext = createContext({});

export const GlobalStateProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({
    uid: null,
    firstName: "",
    lastName: "",
    email: "",
  });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [industryList, setIndustryList] = useState([]);
  const [stockList, setStockList] = useState([]);

  return (
    <GlobalStateContext.Provider
      value={{
        authUser,
        setAuthUser,
        isCollapsed,
        setIsCollapsed,
        industryList,
        setIndustryList,
        stockList,
        setStockList,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
