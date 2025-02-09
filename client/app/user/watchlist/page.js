"use client";
import ArticleList from "../../../components/ArticleList";
import StockCard from "@/components/StockCard";
import { Button } from "@/components/ui/button";
import { useState, useContext } from "react";
import { GlobalStateContext } from "@/components/context/Global";
import { IndustryGrid } from "../../../components/IndustryGrid";
import { WatchlistAddModal } from "../../../components/WatchlistAddModal";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const Watchlist = () => {
  const {
    isCollapsed,
    setIsCollapsed,
    stockList,
    setStockList,
    industryList,
    setIndustryList,
  } = useContext(GlobalStateContext);

  const handleAdd = ({ type, selection }) => {
    if (type === "stock") {
      setStockList([...stockList, selection]);
    } else {
      //console.log("selection: ", selection);
      //console.log("callback: ", setIndustryList);
      setIndustryList([...industryList, selection]);
      //console.log("industryList: ", industryList);
    }
    //console.log(industryList);
  };
  const [open, setOpen] = useState(false);
  const articles = [
    {
      ArticleID: "Apple_1",
      Source: "CNBC",
      Title: "Jim Cramer's top 10 things to watch in the stock market Friday",
      Author: null,
      Description:
        "My latest thinking on the stocks of Club names Apple and Nvidia.",
      URL: "https://www.cnbc.com/2025/01/31/jim-cramers-top-10-things-to-watch-in-the-stock-market-friday.html",
      ImageURL:
        "https://image.cnbcfm.com/api/v1/image/108054550-1730240946572-gettyimages-2112143030-sg010234_8va4szdc.jpeg?v=1738331114&w=1920&h=1080",
      Industry: "Technology",
      Company: "Apple",
      TimePub: "2025-01-31T13:59:10Z",
      Summary:
        "1. Apple's earnings report shows why I always say 'own it, don't trade it.' Where it has launched Apple Intelligence, the iPhone 16 sells better. High-margin services revenues was better. Mac better.",
    },
    {
      ArticleID: "Apple_2",
      Source: "CNBC",
      Title:
        "Huawei revenue grows at fastest pace since 2016 as Chinese telecom giant shrugs off U.S. sanctions",
      Author: null,
      Description:
        "Chinese telecommunications and smartphone giant Huawei continues to grow and take market share from Apple, despite U.S. restrictions.",
      URL: "https://www.cnbc.com/2025/02/06/china-huawei-revenue-surges-despite-us-sanctions.html",
      ImageURL:
        "https://image.cnbcfm.com/api/v1/image/108068035-1732609726789-Huawei_MAte_70.png?v=1732609880&w=1920&h=1080",
      Industry: "Technology",
      Company: "Apple",
      TimePub: "2025-02-06T03:31:23Z",
      Summary:
        "Chinese telecommunications and smartphone giant Huawei continues to grow and take market share from Apple, despite U.S. restricting the company's access to high-end technology.",
    },
    {
      ArticleID: "Apple_3",
      Source: "CNBC",
      Title:
        "Britain orders Apple to give it access to encrypted accounts: Washington Post",
      Author: null,
      Description:
        "Apple has been ordered by the U.K. to provide officials access to users' encrypted accounts, the Washington Post reported Friday.",
      URL: "https://www.cnbc.com/2025/02/07/uk-orders-apple-to-let-it-access-encrypted-accounts-washington-post.html",
      ImageURL:
        "https://image.cnbcfm.com/api/v1/image/108037243-1726850701034-gettyimages-2172406958-AA_20092024_1866501.jpeg?v=1738927119&w=1920&h=1080",
      Industry: "Technology",
      Company: "Apple",
      TimePub: "2025-02-07T12:35:34Z",
      Summary:
        "The U.K. has ordered Apple to provide officials access to users' encrypted accounts, the Washington Post reported Friday.",
    },
  ];

  return (
    <div className=" text-white p-6 flex overflow-visible flex-col">
      <div className="max-w-full mx-auto mb-6">
        <div className="flex justify-between flex-row">
          <h1 className="text-4xl font-bold mb-8">Catch Up</h1>

          <Button className="bg-white text-black" onClick={() => setOpen(true)}>
            Add to Watchlist
          </Button>

          <WatchlistAddModal
            open={open}
            setOpen={setOpen}
            onSubmit={handleAdd}
            availableStocks={[
              { name: "Nvidia", ticker: "NVDA" },
              { ticker: "TSLA", name: "Tesla" },
              { ticker: "GOOGL", name: "Alphabet" },
            ]}
          />
        </div>
        <ArticleList articles={articles} />
      </div>
      <div className="mt-2">
        <h1 className="text-4xl font-bold">Your Watchlist </h1>
        <div className="mt-2 flex flex-row w-full gap-2">
          <div className="w-2/5 flex flex-col gap-2">
            {stockList.map((stock, index) => (
              <StockCard key={index} symbol={stock} industry="Technology" />
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
