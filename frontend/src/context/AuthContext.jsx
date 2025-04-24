import { useMutation, useQuery } from "@tanstack/react-query";
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
    onError: () => {
      setAuthTokens(null);
      setUser(null);
    },
  });

  useEffect(() => {
    setInterval(() => {
      if (authTokens) {
        updateTokens();
      }
    }, 600000); // 10 minutes
  }, []);

  const { mutate: login } = useMutation({
    mutationFn: (formData) =>
      axios.post("http://127.0.0.1:8000/login/", formData),
    mutationKey: ["login"],
    onSuccess: (res) => {
      setAuthTokens({
        access: res.data.access,
        refresh: res.data.refresh,
      });
      localStorage.setItem("authTokens", JSON.stringify(res.data));
      getUser();
      navigate("/");
    },
  });

  const { mutate: logout } = useMutation({
    mutationFn: () =>
      axios.post("http://localhost:8000/logout/", {
        refresh: authTokens.refresh,
      }),
    mutationKey: ["logout"],
    onSuccess: () => {
      localStorage.removeItem("authTokens");
      setAuthTokens(null);
      setUser(null);
    },
  });

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
