"use client";

import { useContext, useEffect, useState } from "react";
import { Login } from "./Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebaseconfig";
import { GlobalStateContext } from "../context/Global";
import { useRouter } from "next/navigation";
export const Routing = () => {
  const { authUser, setAuthUser } = useContext(GlobalStateContext);

  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        router.push("/user/watchlist");
      } else {
        setAuthUser(false);
      }
    });
  });
  return <Login />;
};
