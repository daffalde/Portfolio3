import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { LoadingButton } from "./Loading";
import { AlertFailed, AlertSuccess } from "./Alert";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const nav = useNavigate();
  const getUrl = window.location.pathname;
  const [popup, setPopup] = useState(false);
  const token = Cookies.get("token");
  const [loadingButton, setLoadingButton] = useState(false);

  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFailed, setAlertFailed] = useState(false);

  const inputNama = useRef("");
  const inputLink = useRef("");
  const inputDesc = useRef("");

  // input file
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleFile(e) {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFile(file);
    }
  }

  // input logo
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  function handleLogo(e) {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setLogo(file);
    }
  }

  // function add
  async function handleAdd() {
    setLoadingButton(true);
    const formData = new FormData();
    formData.append("gambar", file);
    formData.append("logo", logo);
    formData.append("nama", inputNama.current.value);
    formData.append("link", inputLink.current.value);
    formData.append("deskripsi", inputDesc.current.value);
    formData.append("tanggal", new Date().getTime());

    try {
      await axios.post(
        "https://portfolio3-backend.vercel.app/data/portfolio",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPopup(false);
      setLoadingButton(false);
      setAlertSuccess(true);
    } catch (e) {
      console.log(e);
      setLoadingButton(false);
      setAlertFailed(true);
    }
  }

  useEffect(() => {
    if (alertFailed || alertSuccess) {
      const timeout = setTimeout(() => {
        setAlertFailed(false);
        setAlertSuccess(false);
        window.location.reload();
      }, 6000);
      return () => clearTimeout(timeout);
    }
  }, [alertFailed, alertSuccess]);

  return (
    <>
      {alertSuccess ? <AlertSuccess message={"Data ditambahkan"} /> : null}
      {alertFailed ? <AlertFailed message={"Gagal menambahkan data"} /> : null}
      {/* pop up_________________________________________ */}
      {popup ? (
        <div onClick={() => setPopup(false)} className="popup-wrap">
          <div
            onClick={(event) => event.stopPropagation()}
            className="popup-content"
          >
            <div className="d-portfolio-input">
              <div className="d-p-i-ss">
                <label
                  style={{
                    backgroundImage: `url("${
                      preview ? preview : "/upload-bg.svg"
                    }")`,
                  }}
                  htmlFor="d-p-i-ss-input"
                ></label>
                <input onChange={handleFile} type="file" id="d-p-i-ss-input" />
              </div>
              <div className="d-p-i-logo">
                <p>Logo:</p>
                <label
                  style={{
                    backgroundImage: `url("${
                      logoPreview ? logoPreview : "/logo-bg.png"
                    }")`,
                  }}
                  htmlFor="d-p-i-logo-input"
                ></label>
                <input
                  onChange={handleLogo}
                  type="file"
                  id="d-p-i-logo-input"
                />
              </div>
              <div className="d-p-i-info">
                <span>
                  <label htmlFor="d-p-i-i-nama">Nama:</label>
                  <input
                    ref={inputNama}
                    type="text"
                    placeholder="Nama website"
                  />
                </span>
                <span>
                  <label htmlFor="d-p-i-i-nama">Link:</label>
                  <input
                    ref={inputLink}
                    type="text"
                    placeholder="Link website"
                  />
                </span>
                <span>
                  <label htmlFor="d-p-i-i-nama">Deskripsi:</label>
                  <input
                    ref={inputDesc}
                    type="text"
                    placeholder="Deskripsi singkat website"
                  />
                </span>
              </div>
              <div className="d-p-i-action">
                <button
                  onClick={() => setPopup(false)}
                  className="button-second"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className={`button-main ${
                    loadingButton ? "button-main-inactive" : ""
                  }`}
                >
                  Add {loadingButton ? <LoadingButton color={"white"} /> : null}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* _______________________________________________ */}
      <div className="dashboard-sidebar">
        <div className="dashboard-sidebar-top">
          <img src="/ico.svg" alt="icon" />
          <span>
            <button
              onClick={() => nav("/dashboard")}
              className={`dashboard-sidebar-button ${
                getUrl.split("/")[2] ? "" : "dashboard-sidebar-button-on"
              }`}
            >
              <img src="/home.png" alt="out icon" />
            </button>
            <button
              onClick={() => nav("/dashboard/message")}
              className={`dashboard-sidebar-button ${
                getUrl.split("/")[2] === "message"
                  ? "dashboard-sidebar-button-on"
                  : ""
              }`}
            >
              <img src="/message.png" alt="out icon" />
            </button>
            <button
              onClick={() => nav("/dashboard/portfolio")}
              className={`dashboard-sidebar-button ${
                getUrl.split("/")[2] === "portfolio"
                  ? "dashboard-sidebar-button-on"
                  : ""
              }`}
            >
              <img src="/portfolio.png" alt="out icon" />
            </button>
            <button
              onClick={() => setPopup(true)}
              className="dashboard-sidebar-button"
            >
              <img src="/plus.png" alt="out icon" />
            </button>
          </span>
        </div>

        <button
          onClick={() => {
            Cookies.remove("token");
            window.location.reload();
          }}
          className="dashboard-sidebar-button"
        >
          <img src="/out.png" alt="out icon" />
        </button>
      </div>
    </>
  );
}
