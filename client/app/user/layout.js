"use client";
import { useContext, useState } from "react";
import { GlobalStateContext } from "@/components/context/Global";
import { Sidebar } from "@/components/Sidebar";

const Layout = ({ children }) => {
  const { isCollapsed, setIsCollapsed } = useContext(GlobalStateContext);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <main
        className={`flex-1 p-4 transition-all duration-300 ${
          isCollapsed ? "ml-12" : "ml-64"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
