"use client";
import { useContext } from "react";
import { GlobalStateContext } from "@/components/context/Global";
import { Sidebar } from "@/components/Sidebar";

const LoadingScreen = () => (
  <div className="flex items-center justify-center w-full h-screen bg-black text-white">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      <p className="text-xl font-semibold">Loading your dashboard...</p>
    </div>
  </div>
);

const Layout = ({ children }) => {
  const { isCollapsed, setIsCollapsed, isDataLoaded } =
    useContext(GlobalStateContext);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {isDataLoaded ? (
        <div className="flex min-h-screen">
          <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
          <main
            className={`flex-1 p-4 transition-all duration-300 ${
              isCollapsed ? "ml-12" : "ml-64"
            }`}
          >
            {children}
          </main>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default Layout;
