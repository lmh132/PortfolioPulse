"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Cpu, Heart, DollarSign, Zap, ShoppingCart } from "lucide-react";
import { useContext, useEffect } from "react";
import { GlobalStateContext } from "./context/Global";
const industries = [
  { name: "Tech", icon: Cpu, link: "/technology" },
  { name: "Healthcare", icon: Heart, link: "/healthcare" },
  { name: "Finance", icon: DollarSign, link: "/financials" },
  { name: "Energy", icon: Zap, link: "/energy" },
  {
    name: "Consumer Discretionary",
    icon: ShoppingCart,
    link: "/consumer-discretionary",
  },
];

export function IndustryGrid({}) {
  const { industryList, setIndustryFilter, setSearchFilter } =
    useContext(GlobalStateContext);
  return (
    <div className="flex justify-end">
      <div className="flex flex-row gap-4">
        {industries
          .filter((industry) => industryList.includes(industry.name))
          .map((industry) => (
            <Link
              key={industry.name}
              href={"/user/news"}
              onClick={() => {
                setSearchFilter("");
                setIndustryFilter(industry.name);
              }}
              passHref
            >
              <motion.div
                className="flex flex-col items-center justify-center p-10 bg-gray-300 rounded-xl shadow-lg cursor-pointer w-48 h-48" // Increased size
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 8px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <industry.icon className="w-12 h-12 text-primary mb-2" />
                </motion.div>
                <span className="text-sm font-medium text-center text-black">
                  {industry.name}
                </span>
              </motion.div>
            </Link>
          ))}
      </div>
    </div>
  );
}
