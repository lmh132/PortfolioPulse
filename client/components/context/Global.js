"use client";

import { initializeApp } from "firebase/app";
import { createContext, useState } from "react";

export const GlobalStateContext = createContext({});

export async function storeUserInAWS(uid, firstName, lastName, email) {
  try {
    let name = `${firstName} ${lastName}`;

    const response = await fetch("https://b6afxhw1s3.execute-api.us-east-1.amazonaws.com/dev/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: uid,
        name: name,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to store user in AWS: ${response.statusText}`);
    }

    console.log("User stored in AWS successfully");
  } catch (error) {
    console.error("Error storing user in AWS:", error);
  }
}

export const GlobalStateProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState({
    uid: null,
    firstName: "",
    lastName: "",
    email: "",
  });

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <GlobalStateContext.Provider value={{ authUser, setAuthUser, isCollapsed, setIsCollapsed }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
