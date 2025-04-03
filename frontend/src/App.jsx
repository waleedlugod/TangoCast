import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/Navbar.jsx";
import AppRoutes from "./AppRoutes/AppRoutes.jsx";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavBar />
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  );
}
