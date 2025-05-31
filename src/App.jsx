import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPortfolio from "./pages/DashboardPortfolio";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import About from "./pages/About";
import Skill from "./pages/Skill";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import DashboardMessage from "./pages/DashboardMessage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={About} />
          <Route path="/skill" Component={Skill} />
          <Route path="/projects" Component={Portfolio} />
          <Route path="/contact" Component={Contact} />
          <Route path="/dashboard/portfolio" Component={DashboardPortfolio} />
          <Route path="/dashboard/message" Component={DashboardMessage} />
          <Route path="/login" Component={Auth} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
