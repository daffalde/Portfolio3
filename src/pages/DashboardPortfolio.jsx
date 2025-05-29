import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import "../style/dashboard.css";
import Cookies from "js-cookie";
import { Dashhead } from "../components/Dashhead";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DashboardPortfolio() {
  const nav = useNavigate();
  const token = Cookies.get("token");
  if (!token) {
    nav("/");
  }

  // get data
  async function getData() {
    try {
      const { data } = await axios.get(
        "https://heqfgtfpnhrtzgkwxsrj.supabase.co/rest/v1/portfolio?select=*",
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container-dashboard">
        <Sidebar />
        <Dashhead title={"Portfolio"} />
      </div>
    </>
  );
}
