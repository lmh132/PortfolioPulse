import { ArrowUp, ArrowDown } from "lucide-react";

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

export default async function StockTicker({ symbol, industry }) {
  const price = 10;
  const changePercent = 5;
  const isUp = changePercent > 0;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-300 rounded-lg shadow-md h-20 hover:shadow-lg transition-shadow duration-300  hover:scale-105">
      <div className="flex flex-col justify-center content-center text-black">
        <div className="flex flex-row gap-2">
          <span className="text-lg font-semibold">{symbol}</span>
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
          <ArrowUp className="w-6 h-6 mr-2 transform transition-transform duration-300" />
        ) : (
          <ArrowDown className="w-6 h-6 mr-2 transform transition-transform duration-300" />
        )}
        <span className="text-lg font-semibold">{changePercent}%</span>
      </div>
    </div>
  );
}
