import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPortfolio from "./pages/DashboardPortfolio";
import Auth from "./pages/Auth";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard/portfolio" Component={DashboardPortfolio} />
          <Route path="/login" Component={Auth} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
