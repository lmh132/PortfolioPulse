"use client";
import { ArticlePanel } from "@/components/ArticlePanel";
import { getNews } from "../../../utils/news";
import { useContext, useState, useEffect } from "react";
import { GlobalStateContext } from "../../../components/context/Global";
import LexChatWrapper from "./LexChatWrapper";
const News = () => {
  const { articles, setArticles, stockList, industryList, setIsDataLoaded } =
    useContext(GlobalStateContext);

  return (
    <div className="min-h-screen flex justify-center text-white">
      <ArticlePanel articles={articles} />
      <LexChatWrapper />
    </div>
  );
};

export default News;
