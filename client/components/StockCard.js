import { ArrowUp, ArrowDown } from "lucide-react";
import { useContext } from "react";
import { GlobalStateContext } from "./context/Global";
import Link from "next/link";

const getIndustryColor = (industry) => {
  const colors = {
    Technology: "text-industry-tech",
    Healthcare: "text-industry-healthcare",
    Financials: "text-industry-financials",
    Energy: "text-industry-energy",
    "Consumer Discretionary": "text-industry-consumerDiscretionary",
  };
  return colors[industry] || "text-gray-400"; // Default color if industry not found
};

export default function StockTicker({ symbol, industry }) {
  const { setSearchFilter, setIndustryFilter } = useContext(GlobalStateContext);
  const price = 10;
  const changePercent = 5;
  const isUp = changePercent > 0;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-300 rounded-lg shadow-md h-20 hover:shadow-lg transition-transform duration-300 hover:scale-105 w-full max-w-4xl mx-auto">
      <Link
        href="/user/news"
        onClick={() => {
          setSearchFilter(symbol);
          setIndustryFilter("all");
        }}
        className="flex items-center justify-between w-full"
      >
        <div className="flex flex-col justify-center text-black">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold">{symbol}</span>
            <span
              className={`text-lg font-semibold ${getIndustryColor(industry)}`}
            >
              {industry}
            </span>
          </div>
          <span className="text-2xl font-bold">${price.toFixed(2)}</span>
        </div>

        <div
          className={`flex items-center ${
            isUp ? "text-green-500" : "text-red-500"
          }`}
        >
          {isUp ? (
            <ArrowUp className="w-6 h-6 mr-1 transition-transform duration-300" />
          ) : (
            <ArrowDown className="w-6 h-6 mr-1 transition-transform duration-300" />
          )}
          <span className="text-xl font-semibold">{changePercent}%</span>
        </div>
      </Link>
    </div>
  );
}
