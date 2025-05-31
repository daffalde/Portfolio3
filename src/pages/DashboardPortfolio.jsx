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
  const token = Cookies.get("token");
  if (!token) {
    nav("/");
  }
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFailed, setAlertFailed] = useState(false);

  // get data
  const [data, setData] = useState(null);
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
  async function handleDelete(id, dataGambar, dataLogo) {
    setLoadingPage(true);
    try {
      // delete gambar
      await axios.delete(
        `https://heqfgtfpnhrtzgkwxsrj.supabase.co/storage/v1/object/storage/gambar/${
          dataGambar.split("/")[9]
        }`,
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // delete logo
      await axios.delete(
        `https://heqfgtfpnhrtzgkwxsrj.supabase.co/storage/v1/object/storage/logo/${
          dataLogo.split("/")[9]
        }`,
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // hapus data
      await axios.delete(
        `https://heqfgtfpnhrtzgkwxsrj.supabase.co/rest/v1/portfolio?id_portfolio=eq.${id}`,
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
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
  async function handleEdit(id, dataGambar, dataLogo) {
    setLoadingButton(true);
    const date = Date.now();
    setLoadingButton(true);
    const formData = new FormData();
    formData.append("file", file);
    const formLogo = new FormData();
    formLogo.append("file", logo);
    try {
      // delete gambar
      await axios.delete(
        `https://heqfgtfpnhrtzgkwxsrj.supabase.co/storage/v1/object/storage/gambar/${
          dataGambar.split("/")[9]
        }`,
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // delete logo
      await axios.delete(
        `https://heqfgtfpnhrtzgkwxsrj.supabase.co/storage/v1/object/storage/logo/${
          dataLogo.split("/")[9]
        }`,
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // input gambar
      await axios.post(
        "https://heqfgtfpnhrtzgkwxsrj.supabase.co/storage/v1/object/storage/gambar/" +
          date,
        formData,
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // input logo
      await axios.post(
        "https://heqfgtfpnhrtzgkwxsrj.supabase.co/storage/v1/object/storage/logo/" +
          date,
        formLogo,
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // edit data
      await axios.patch(
        `https://heqfgtfpnhrtzgkwxsrj.supabase.co/rest/v1/portfolio?id_portfolio=eq.${id}`,
        {
          nama: inputNama.current.value,
          logo: `https://heqfgtfpnhrtzgkwxsrj.supabase.co/storage/v1/object/public/storage/logo/${date}`,
          gambar: `https://heqfgtfpnhrtzgkwxsrj.supabase.co/storage/v1/object/public/storage/gambar/${date}`,
          deskripsi: inputDesc.current.value,
          link: inputLink.current.value,
        },
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
            Authorization: `Bearer ${token}`,
            Prefer: "return=minimal",
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
                  <p>{e.nama}</p>
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
                            placeholder={e.nama ? e.nama : "Nama website"}
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
                          onClick={() =>
                            handleEdit(e.id_portfolio, e.gambar, e.logo)
                          }
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
