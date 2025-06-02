import axios from "axios";
import "../style/dashhead.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertFailed } from "./Alert";

export function Dashhead({ title }) {
  const nav = useNavigate();

  const [info, setInfo] = useState(null);

  async function getInfo() {
    try {
      const resp = await axios.get(
        "https://portfolio3-backend.vercel.app/data/info"
      );
      setInfo(resp.data[0]);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div className="dashhead">
        <h5>{title}</h5>
        <div className="dashed-user">
          <span>
            <h6>{info ? info.info_nama : "Loading..."}</h6>
            <p>Admin</p>
          </span>
          <img
            src={info && info.picture ? info.picture : "/profil-pelamar.svg"}
            alt="user image"
          />
        </div>
      </div>
    </>
  );
}
