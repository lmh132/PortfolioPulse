"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Cpu, Heart, DollarSign, Zap, ShoppingCart } from "lucide-react";

const industries = [
  { name: "Technology", icon: Cpu, link: "/technology" },
  { name: "Healthcare", icon: Heart, link: "/healthcare" },
  { name: "Financials", icon: DollarSign, link: "/financials" },
  { name: "Energy", icon: Zap, link: "/energy" },
  {
    name: "Consumer Discretionary",
    icon: ShoppingCart,
    link: "/consumer-discretionary",
  },
];

export function IndustryGrid({ industryList }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {industries
        .filter((industry) => industryList.includes(industry.name))
        .map((industry) => (
          <Link key={industry.name} href={industry.link} passHref>
            <motion.div
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md cursor-pointer"
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
  );
}
