"use client";

import { initializeApp } from "firebase/app";
import { createContext, useCallback, useEffect, useState } from "react";
import { getUser, updateUser } from "@/utils/auth";
import { auth } from "@/firebase/firebaseconfig";
import { set } from "react-hook-form";
import { onAuthStateChanged } from "firebase/auth";
import { getNews } from "@/utils/news";
export const GlobalStateContext = createContext({});

export const GlobalStateProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({
    uid: null,
    firstName: "",
    lastName: "",
    email: "",
  });

  const allStocksInfo = [
    { name: "Apple Inc.", ticker: "AAPL", industry: "Technology" },
    { name: "Microsoft Corporation", ticker: "MSFT", industry: "Technology" },
    { name: "Alphabet Inc.", ticker: "GOOGL", industry: "Technology" },
    { name: "NVIDIA Corporation", ticker: "NVDA", industry: "Technology" },
    { name: "Meta Platforms Inc.", ticker: "META", industry: "Technology" },
    { name: "Johnson & Johnson", ticker: "JNJ", industry: "Healthcare" },
    { name: "Pfizer Inc.", ticker: "PFE", industry: "Healthcare" },
    { name: "UnitedHealth Group Inc.", ticker: "UNH", industry: "Healthcare" },
    { name: "AbbVie Inc.", ticker: "ABBV", industry: "Healthcare" },
    { name: "Merck & Co.", ticker: "MRK", industry: "Healthcare" },
    { name: "JPMorgan Chase & Co.", ticker: "JPM", industry: "Financials" },
    { name: "Bank of America Corp.", ticker: "BAC", industry: "Financials" },
    { name: "Goldman Sachs Group Inc.", ticker: "GS", industry: "Financials" },
    { name: "Wells Fargo & Co.", ticker: "WFC", industry: "Financials" },
    { name: "American Express Company", ticker: "AXP", industry: "Financials" },
    { name: "Exxon Mobil Corporation", ticker: "XOM", industry: "Energy" },
    { name: "Chevron Corporation", ticker: "CVX", industry: "Energy" },
    { name: "ConocoPhillips", ticker: "COP", industry: "Energy" },
    { name: "Schlumberger Ltd.", ticker: "SLB", industry: "Energy" },
    { name: "NextEra Energy Inc.", ticker: "NEE", industry: "Energy" },
    { name: "Tesla Inc.", ticker: "TSLA", industry: "Consumer Discretionary" },
    {
      name: "The Home Depot Inc.",
      ticker: "HD",
      industry: "Consumer Discretionary",
    },
    {
      name: "McDonald’s Corporation",
      ticker: "MCD",
      industry: "Consumer Discretionary",
    },
    { name: "Nike Inc.", ticker: "NKE", industry: "Consumer Discretionary" },
    {
      name: "The Walt Disney Company",
      ticker: "DIS",
      industry: "Consumer Discretionary",
    },
  ];

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [industryList, setIndustryList] = useState([]);
  const [stockList, setStockList] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [industryFilter, setIndustryFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsDataLoaded(false);
        console.log("User logged in:", user);
        const userData = await getUser(user.uid);
        setAuthUser(userData);
        setIndustryList(userData.watchlist?.industries || []);
        setStockList(userData.watchlist?.companies || []);
        setIsDataLoaded(true);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsDataLoaded(false);
      const articles = await getNews(stockList, industryList);
      setArticles(articles);
      setIsDataLoaded(true);
    };
    fetchArticles();
  }, [stockList, industryList]);
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
        allStocksInfo,
        articles,
        setArticles,
        isDataLoaded,
        setIsDataLoaded,
        industryFilter,
        setIndustryFilter,
        searchFilter,
        setSearchFilter,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
