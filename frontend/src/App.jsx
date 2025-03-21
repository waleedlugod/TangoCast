import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes.jsx";
import NavBar from "./components/Navbar.jsx";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <NavBar />
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
