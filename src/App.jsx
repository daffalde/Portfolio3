import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPortfolio from "./pages/DashboardPortfolio";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import About from "./pages/About";
import Skill from "./pages/Skill";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={About} />
          <Route path="/skill" Component={Skill} />
          <Route path="/projects" Component={Portfolio} />
          <Route path="/dashboard/portfolio" Component={DashboardPortfolio} />
          <Route path="/login" Component={Auth} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
