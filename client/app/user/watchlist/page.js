"use client";
import ArticleList from "../../../components/ArticleList";
import StockCard from "@/components/StockCard";
import { Button } from "@/components/ui/button";
import { useState, useContext, useEffect } from "react";
import { GlobalStateContext } from "@/components/context/Global";
import { IndustryGrid } from "../../../components/IndustryGrid";
import { WatchlistAddModal } from "../../../components/WatchlistAddModal";
import { updateUser } from "@/utils/auth";
import { getNews } from "@/utils/news";
import { auth } from "../../../firebase/firebaseconfig";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { WatchlistRemoveModal } from "../../../components/WatchlistRemoveModal";
import { set } from "react-hook-form";

const Watchlist = () => {
  const {
    isCollapsed,
    setIsCollapsed,
    stockList,
    setStockList,
    industryList,
    setIndustryList,
    allStocksInfo,
    articles,
    setArticles,
    setIsDataLoaded,
    setIndustryFilter,
  } = useContext(GlobalStateContext);

  const handleAdd = ({ type, selection }) => {
    if (type === "stock") {
      if (stockList.includes(selection)) {
        return;
      }
      updateUser(auth.currentUser.uid, {
        companies: [...stockList, selection],
        industries: industryList,
      });
      console.log("bruh wtf");
      setStockList([...stockList, selection]);
    } else {
      if (industryList.includes(selection)) {
        return;
      }
      //console.log("selection: ", selection);
      //console.log("callback: ", setIndustryList);
      updateUser(auth.currentUser.uid, {
        companies: stockList,
        industries: [...industryList, selection],
      });
      setIndustryList([...industryList, selection]);
      //console.log("industryList: ", industryList);
    }
    //console.log(industryList);
  };

  const handleRemove = ({ stocks, industries }) => {
    setStockList((prev) => prev.filter((stock) => !stocks.includes(stock)));
    setIndustryList((prev) =>
      prev.filter((industry) => !industries.includes(industry))
    );
    updateUser(auth.currentUser.uid, {
      companies: stockList.filter((stock) => !stocks.includes(stock)),
      industries: industryList.filter(
        (industry) => !industries.includes(industry)
      ),
    });
  };
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  return (
    <div className=" text-white p-6 flex overflow-visible flex-col">
      <div className="max-w-full mx-auto mb-6">
        <div className="flex justify-between flex-row">
          <h1 className="text-4xl font-bold mb-8">Catch Up</h1>
          <div className="flex flex-row gap-4">
            <Button
              className="bg-white text-black hover:bg-gray-600"
              onClick={() => setAddModalOpen(true)}
            >
              Add to Watchlist
            </Button>
            <Button
              className="bg-white text-black hover:bg-gray-600"
              onClick={() => setRemoveModalOpen(true)}
            >
              Remove from Watchlist
            </Button>
          </div>

          <WatchlistAddModal
            open={addModalOpen}
            setOpen={setAddModalOpen}
            onSubmit={handleAdd}
            availableStocks={allStocksInfo}
          />

          <WatchlistRemoveModal
            open={removeModalOpen}
            setOpen={setRemoveModalOpen}
            onRemove={handleRemove}
            stocks={stockList}
            industries={industryList}
          ></WatchlistRemoveModal>
        </div>
        <ArticleList articles={articles.splice(0, 3)} />
      </div>
      <div className="mt-2">
        <h1 className="text-4xl font-bold">Your Watchlist </h1>
        <div className="mt-2 flex flex-row w-full gap-2">
          <div className="w-2/5 flex flex-col gap-2">
            {stockList.map((stock, index) => (
              <StockCard
                key={index}
                symbol={stock}
                industry={
                  allStocksInfo.filter(
                    (currStock) => currStock.ticker == stock
                  )[0].industry
                }
              />
            ))}
          </div>
          <div className="w-full ml-2">
            <IndustryGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
