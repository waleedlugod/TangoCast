import './App.css'
import Player from './Player.jsx'
import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./Routes.jsx"
import NavBar from "./components/Navbar.jsx"

function App() {
  return (
    <Router>
      <>
        <NavBar />
        <div className="main-container">
          <AppRoutes />
          <p>This is the main app container.</p>
        </div>
        <Player />
      </>
    </Router>
  );
}

export default App;
