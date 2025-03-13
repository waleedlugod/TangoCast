import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import Player from "./Player.jsx";
import Search from "./Search.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Player />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
