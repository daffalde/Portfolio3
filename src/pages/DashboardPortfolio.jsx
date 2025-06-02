import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import "../style/dashboard.css";
import Cookies from "js-cookie";
import { Dashhead } from "../components/Dashhead";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "../style/dashboardportfolio.css";
import { LoadingButton, LoadingPage } from "../components/Loading";
import { AlertFailed, AlertSuccess } from "../components/Alert";

export default function DashboardPortfolio() {
  const nav = useNavigate();

  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFailed, setAlertFailed] = useState(false);

  // get data
  const [data, setData] = useState(null);
  async function getData() {
    try {
      const { data } = await axios.get(
        "https://portfolio3-backend.vercel.app/data/portfolio"
      );
      setData(data);
      setLoadingPage(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // get id
  const [getId, setGetId] = useState(null);

  // function update

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

  // fungsi delete
  async function handleDelete(id) {
    setLoadingPage(true);
    const token = Cookies.get("token");
    try {
      await axios.delete(
        `https://portfolio3-backend.vercel.app/data/portfolio/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getData();
    } catch (e) {
      console.log(e);
      getData();
    }
  }

  // fungsi edit
  async function handleEdit(id) {
    setLoadingButton(true);
    const token = Cookies.get("token");
    const formData = new FormData();
    formData.append("gambar", file);
    formData.append("logo", logo);
    formData.append("nama", inputNama.current.value);
    formData.append("link", inputLink.current.value);
    formData.append("deskripsi", inputDesc.current.value);
    formData.append("tanggal", new Date());
    try {
      // edit data
      await axios.patch(
        `https://portfolio3-backend.vercel.app/data/portfolio/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlertSuccess(true);
      setLoadingButton(false);
      getData();
    } catch (e) {
      console.log(e);
      setAlertFailed(true);
      setLoadingButton(false);
    }
  }

  useEffect(() => {
    if (alertFailed || alertSuccess) {
      const timeout = setTimeout(() => {
        setAlertFailed(false);
        setAlertSuccess(false);
      }, 6000);
      return () => clearTimeout(timeout);
    }
  }, [alertFailed, alertSuccess]);

  return (
    <>
      <div className="container-dashboard">
        {alertSuccess ? <AlertSuccess message={"Data diubah"} /> : null}
        {alertFailed ? <AlertFailed message={"Gagal mengubah data"} /> : null}
        <Sidebar />
        <Dashhead title={"Portfolio"} />
        <div className="portfolio-body">
          <div className="portfolio-list">
            <div className="portfolio-l-head">
              <p>Logo</p>
              <p>Nama</p>
              <p>Situs</p>
              <p></p>
            </div>
            {loadingPage ? (
              <LoadingPage color={"black"} />
            ) : (
              data.map((e) => (
                <div
                  onClick={() => setGetId(e.id_portfolio)}
                  key={e.id_portfolio}
                  className={`portfolio-l-item ${
                    e.id_portfolio === getId ? "portfolio-l-item-on" : ""
                  }`}
                >
                  <img
                    className="portfolio-l-i-img"
                    src={e.logo}
                    alt="gambar logo"
                  />
                  <p>{e.portfolio_nama}</p>
                  <Link to={e.link}>{e.link}</Link>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete(e.id_portfolio, e.gambar, e.logo);
                    }}
                    className="button-second portfolio-delete"
                  >
                    <img src="/trash.png" alt="trash icon" />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="portfolio-l-edit">
            {getId
              ? data
                  .filter((elemen) => elemen.id_portfolio === Number(getId))
                  .map((e) => (
                    <div key={e.id_portfolio} className="d-portfolio-input">
                      <div className="d-p-i-ss">
                        <label
                          style={{
                            backgroundImage: `url("${
                              preview ? preview : e.gambar
                            }")`,
                          }}
                          htmlFor="d-p-i-ss-input"
                        ></label>
                        <input
                          onChange={handleFile}
                          type="file"
                          id="d-p-i-ss-input"
                        />
                      </div>
                      <div className="d-p-i-logo">
                        <p>Logo:</p>
                        <label
                          style={{
                            backgroundImage: `url("${
                              logoPreview ? logoPreview : e.logo
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
                            placeholder={
                              e.portfolio_nama
                                ? e.portfolio_nama
                                : "Nama website"
                            }
                          />
                        </span>
                        <span>
                          <label htmlFor="d-p-i-i-nama">Link:</label>
                          <input
                            ref={inputLink}
                            type="text"
                            placeholder={e.link ? e.link : "Link website"}
                          />
                        </span>
                        <span>
                          <label htmlFor="d-p-i-i-nama">Deskripsi:</label>
                          <input
                            ref={inputDesc}
                            type="text"
                            placeholder={
                              e.deskripsi
                                ? e.deskripsi
                                : "Deskripsi singkat website"
                            }
                          />
                        </span>
                      </div>
                      <div className="d-p-i-action">
                        <button
                          onClick={() => handleEdit(e.id_portfolio)}
                          className="button-main"
                        >
                          Edit{" "}
                          {loadingButton ? (
                            <LoadingButton color={"white"} />
                          ) : null}
                        </button>
                      </div>
                    </div>
                  ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
}
