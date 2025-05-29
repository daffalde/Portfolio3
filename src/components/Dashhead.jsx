import axios from "axios";
import "../style/dashhead.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertFailed } from "./Alert";

export function Dashhead({ title }) {
  const nav = useNavigate();
  const [data, setData] = useState(false);
  const [alertFailed, setAlertFailed] = useState(false);
  async function getData() {
    try {
      const { data } = await axios.get(
        "https://heqfgtfpnhrtzgkwxsrj.supabase.co/rest/v1/user?select=*",
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setData(data[0]);
    } catch (e) {
      setAlertFailed(true);
    }
  }

  useEffect(() => {
    getData();
    if (alertFailed) {
      const timeout = setTimeout(() => {
        Cookies.remove("token");
        nav("/login");
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [alertFailed]);
  return (
    <>
      {alertFailed ? <AlertFailed message={"Sesi login habis"} /> : null}
      <div className="dashhead">
        <h5>{title}</h5>
        <form>
          <img src="/search.png" alt="search icon" />
          <input type="text" placeholder="Cari" />
        </form>
        <div className="dashed-user">
          <span>
            <h6>{data ? data.nama : "Loading..."}</h6>
            <p>Admin</p>
          </span>
          <img
            src={data.picture ? data.picture : "/profil-pelamar.svg"}
            alt="user image"
          />
        </div>
      </div>
    </>
  );
}
