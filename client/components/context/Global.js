"use client";

import { initializeApp } from "firebase/app";
import { createContext, useCallback, useEffect, useState } from "react";
import { updateUser } from "@/utils/auth";
import { auth } from "@/firebase/firebaseconfig";

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

  useEffect(() => {
    if (auth.currentUser) {
      updateUser(auth.currentUser.uid, {
        companies: stockList,
        industries: industryList,
      });
    }
  }, [industryList, stockList]);
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
