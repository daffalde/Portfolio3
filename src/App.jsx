import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPortfolio from "./pages/DashboardPortfolio";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/dashboard/portfolio" Component={DashboardPortfolio} />
          <Route path="/login" Component={Auth} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
