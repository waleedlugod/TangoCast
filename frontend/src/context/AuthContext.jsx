import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children, authTokens }) {
  return (
    <AuthContext value={{ authTokens: authTokens }}>{children}</AuthContext>
  );
}
