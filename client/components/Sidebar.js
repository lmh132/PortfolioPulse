"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GlobalStateContext } from "@/components/context/Global";
import {
  Home,
  Briefcase,
  BarChart2,
  Newspaper,
  BookOpen,
  EyeIcon,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseconfig";

const menuItems = [
  { id: 1, label: "Home", icon: Home, link: "/user/home" },
  { id: 2, label: "News", icon: Newspaper, link: "/user/news" },
  { id: 3, label: "Research", icon: BookOpen, link: "/user/research" },
  { id: 4, label: "Watchlist", icon: EyeIcon, link: "/user/watchlist" },
];

export const Sidebar = () => {
  const { authUser, isCollapsed, setIsCollapsed } =
    useContext(GlobalStateContext);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirect to the login page after logout
    } catch (error) {
      //console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-black text-white transition-all duration-300 border-r border-white fixed",
        isCollapsed ? "w-12" : "w-64"
      )}
    >
      <div className="flex items-center justify-end p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-6 w-6" />
          ) : (
            <ChevronLeft className="h-6 w-6" />
          )}
        </Button>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link href={item.link} passHref>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname === item.link
                      ? "bg-gray-700"
                      : "hover:bg-gray-700",
                    isCollapsed ? "px-2" : "px-4"
                  )}
                >
                  <item.icon
                    className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-2 mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-red-700"
          onClick={handleLogout}
        >
          <LogOut className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "mr-2")} />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};
