import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children, authTokens, setAuthTokens }) {
  async function updateTokensQuery() {
    const res = await axios.post(
      "http://localhost:8000/refresh/",
      {
        refresh: authTokens.refresh,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res;
  }

  async function getUserQuery() {
    const res = await axios.get("http://localhost:8000/users/get_me/", {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    });
    return res;
  }

  const [user, setUser] = useState(null);
  const { data: dataUser, refetch: getUser } = useQuery({
    queryFn: getUserQuery,
    queryKey: ["getUser"],
  });

  useEffect(() => {
    setUser(dataUser);
  }, [dataUser]);

  const { mutate: updateTokens } = useMutation({
    mutationFn: () => updateTokensQuery(),
    mutationKey: ["updateTokens"],
    onSuccess: (res) => {
      const updatedTokens = {
        access: res.data.access,
        refresh: authTokens.refresh,
      };
      setAuthTokens(updatedTokens);
      localStorage.setItem("authTokens", JSON.stringify(updatedTokens));
      getUser();
    },
    onError: (error) => {
      setAuthTokens(null);
      setUser(null);
    },
  });

  useEffect(() => {
    setInterval(() => {
      if (authTokens) {
        updateTokens();
      }
    }, 2000); // 10 minutes
  }, []);

  return (
    <AuthContext
      value={{
        authTokens: authTokens,
        user: user,
      }}
    >
      {children}
    </AuthContext>
  );
}
