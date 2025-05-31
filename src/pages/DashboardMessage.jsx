import { useEffect, useState } from "react";
import { Dashhead } from "../components/Dashhead";
import { Sidebar } from "../components/Sidebar";
import "../style/dashboardmessage.css";
import axios from "axios";
import Cookies from "js-cookie";
import { LoadingPage } from "../components/Loading";
import moment from "moment";
import { AlertFailed, AlertSuccess } from "../components/Alert";

export default function DashboardMessage() {
  const [data, setData] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);

  async function getData() {
    const token = Cookies.get("token");
    try {
      const resp = await axios.get(
        "https://heqfgtfpnhrtzgkwxsrj.supabase.co/rest/v1/message?select=*",
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(resp.data);
      setLoadingPage(false);
    } catch (e) {
      console.log(e);
      setLoadingPage(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const [getId, setGetId] = useState(null);

  function handleEmail(email) {
    window.location.href = `mailto:${email}`;
  }

  //   popup
  const [popup, setPopup] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFailed, setAlertFailed] = useState(false);

  async function handleDelete(e) {
    const token = Cookies.get("token");
    try {
      await axios.delete(
        `https://heqfgtfpnhrtzgkwxsrj.supabase.co/rest/v1/message?id_message=eq.${e}`,
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlertSuccess(true);
      setPopup(false);
      getData();
    } catch (e) {
      console.log(e);
      setPopup(false);
      setAlertFailed(true);
    }
  }

  useEffect(() => {
    if (alertSuccess || alertFailed) {
      const timeout = setTimeout(() => {
        setAlertSuccess(false);
        setAlertSuccess(false);
      }, 7000);
      return () => clearTimeout(timeout);
    }
  }, [alertSuccess, alertFailed]);
  return (
    <>
      {alertSuccess ? <AlertSuccess message={"Data dihapus"} /> : null}
      {alertFailed ? <AlertFailed message={"Data gagal dihapus"} /> : null}
      {/* pop up________________________________________________ */}
      {popup ? (
        <div onClick={() => setPopup(false)} className={`popup-wrap`}>
          <div
            onClick={(event) => event.stopPropagation()}
            className="popup-content"
          >
            <div className="message-delete">
              <h5>Delete?</h5>
              <p>Are you sure you want to delete? Any changes are permanent.</p>
              <br />
              <span>
                <button
                  onClick={() => setPopup(false)}
                  className="button-second button-cancel"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(getId)}
                  className="button-delete"
                >
                  Delete
                </button>
              </span>
            </div>
          </div>
        </div>
      ) : null}
      {/* pop up________________________________________________ */}

      <div className="container-dashboard">
        <Sidebar />
        <Dashhead title={"Message"} />
        <div className="message-body">
          {loadingPage ? (
            <LoadingPage />
          ) : (
            <div className="message-b-parent">
              {data
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((e) => (
                  <div
                    onClick={() => setGetId(e.id_message)}
                    key={e.id_message}
                    className={`message-b-item ${
                      getId === e.id_message ? "message-b-item-on" : ""
                    }`}
                  >
                    <div className="message-b-i-profil">
                      <p>{e.nama.split("")[0].toUpperCase()}</p>
                    </div>
                    <div className="message-b-i-info">
                      <h6>{e.nama}</h6>
                      <p>{e.email}</p>
                      <div className="message-b-i-i-span">
                        <p>{e.pesan}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {getId
            ? data
                .filter((element) => element.id_message === getId)
                .map((e) => (
                  <div className="message-b-content">
                    <div className="message-b-c-head">
                      <span>
                        <p>Name:</p>
                        <p>{e.nama}</p>
                      </span>
                      <span>
                        <p>Email:</p>
                        <p>{e.email}</p>
                      </span>
                    </div>
                    <div className="message-b-c-body">
                      <p>{e.pesan}</p>
                    </div>
                    <div className="message-b-c-action">
                      <p>{moment(e.created_at).format("LL")}</p>
                      <span>
                        <button
                          onClick={() => setPopup(true)}
                          className="button-second"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleEmail(e.email)}
                          className="button-main"
                        >
                          Reply
                        </button>
                      </span>
                    </div>
                  </div>
                ))
            : null}
        </div>
      </div>
    </>
  );
}
