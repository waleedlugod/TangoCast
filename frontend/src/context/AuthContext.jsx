import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // query for current user
  const { data: user } = useQuery({
    queryFn: () => {
      return axios.get("http://localhost:8000/users/get_me/", {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });
    },
    queryKey: ["getUser"],
    select: (data) => (data = data.data),
  });

  // update tokens
  const { mutate: updateTokens } = useMutation({
    mutationFn: () => {
      return axios.post(
        "http://localhost:8000/refresh/",
        {
          refresh: authTokens.refresh,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    },
    mutationKey: ["updateTokens"],
    onSuccess: (res) => {
      const updatedTokens = {
        access: res.data.access,
        refresh: authTokens.refresh,
      };
      setAuthTokens(updatedTokens);
      localStorage.setItem("authTokens", JSON.stringify(updatedTokens));
    },
    onError: () => {
      setAuthTokens(null);
    },
  });

  // update tokens every 10 minutes
  useEffect(() => {
    setInterval(() => {
      if (authTokens) {
        updateTokens();
      }
    }, 600000); // 10 minutes
  }, []);

  // login
  const { mutate: login } = useMutation({
    mutationFn: (formData) => {
      return axios.post("http://127.0.0.1:8000/login/", formData);
    },
    mutationKey: ["login"],
    onSuccess: (res) => {
      setAuthTokens({
        access: res.data.access,
        refresh: res.data.refresh,
      });
      localStorage.setItem("authTokens", JSON.stringify(res.data));
      navigate("/");
    },
  });

  // logout
  const { mutate: logout } = useMutation({
    mutationFn: () => {
      return axios.post("http://localhost:8000/logout/", {
        refresh: authTokens.refresh,
      });
    },
    mutationKey: ["logout"],
    onSuccess: () => {
      localStorage.removeItem("authTokens");
      setAuthTokens(null);
      navigate("/login");
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["getUser"] });
  }, [authTokens]);

  return (
    <AuthContext
      value={{
        authTokens: authTokens,
        user: user,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext>
  );
}
