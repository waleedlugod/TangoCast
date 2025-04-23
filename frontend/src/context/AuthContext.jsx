import { useMutation } from "@tanstack/react-query";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children, authTokens, setAuthTokens }) {
  async function updateTokensQuery() {
    return (
      await fetch("http://localhost:8000/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: authTokens.refresh }),
      })
    ).json();
  }
  const { mutate: updateTokens } = useMutation({
    mutationFn: () => updateTokensQuery(),
    mutationKey: "updateTokens",
    onSuccess: (res) => {
      const updatedTokens = {
        access: res.access,
        refresh: authTokens.refresh,
      };
      setAuthTokens(updatedTokens);
      localStorage.setItem("authTokens", JSON.stringify(updatedTokens));
      console.log(updatedTokens);
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (authTokens) {
        updateTokens();
      }
    }, 600000); // 10 minutes
    return () => clearInterval(interval);
  }, [authTokens]);

  return (
    <AuthContext value={{ authTokens: authTokens }}>{children}</AuthContext>
  );
}
