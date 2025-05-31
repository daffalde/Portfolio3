import { useEffect, useRef, useState } from "react";
import { Dashhead } from "../components/Dashhead";
import { Sidebar } from "../components/Sidebar";
import "../style/dashboardhome.css";
import axios from "axios";
import { LoadingPage } from "../components/Loading";
import Cookies from "js-cookie";
import { BarChart } from "@mui/x-charts";
import moment from "moment";

export default function DashboardHome() {
  const [loadingPage, setLoadingPage] = useState(true);

  const [visitor, setVisitor] = useState(null);
  const [message, setMessage] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [user, setUser] = useState(null);
  const [sosial, setSosial] = useState(null);

  async function getData() {
    const token = Cookies.get("token");
    try {
      const visitor = await axios.get(
        "https://heqfgtfpnhrtzgkwxsrj.supabase.co/rest/v1/visitor?select=*",
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
          },
        }
      );
      const message = await axios.get(
        "https://heqfgtfpnhrtzgkwxsrj.supabase.co/rest/v1/message?select=*",
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const portfolio = await axios.get(
        "https://heqfgtfpnhrtzgkwxsrj.supabase.co/rest/v1/portfolio?select=*",
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = await axios.get(
        "https://heqfgtfpnhrtzgkwxsrj.supabase.co/rest/v1/user?select=*",
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const social = await axios.get(
        "https://heqfgtfpnhrtzgkwxsrj.supabase.co/rest/v1/sosial?select=*",
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(message.data);
      setPortfolio(portfolio.data);
      setSosial(social.data);
      setUser(user.data);
      setVisitor(visitor.data);
      setLoadingPage(false);
    } catch (e) {
      console.log(e);
      setLoadingPage(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  //   graphic filter
  const [yearSelect, setYearSelect] = useState(moment().format("YYYY"));

  //   change data user
  const inputNama = useRef(null);
  const inputEmail = useRef(null);
  const inputSpesialis = useRef(null);
  const inputDaerah = useRef(null);
  const inputProvinsi = useRef(null);
  const inputNegara = useRef(null);

  async function handleUser(e) {
    e.preventDefault();
    const token = Cookies.get("token");
    try {
      await axios.patch(
        `https://heqfgtfpnhrtzgkwxsrj.supabase.co/rest/v1/user?id_user=eq.6`,
        {
          nama: inputNama.current.value ? inputNama.current.value : user.nama,
          email: inputEmail.current.value
            ? inputEmail.current.value
            : user.email,
          negara: inputNegara.current.value
            ? inputNegara.current.value
            : user.negara,
          provinsi: inputProvinsi.current.value
            ? inputProvinsi.current.value
            : user.provinsi,
          daerah: inputDaerah.current.value
            ? inputDaerah.current.value
            : user.daerah,
          spesialis: inputSpesialis.current.value
            ? inputSpesialis.current.value
            : user.spesialis,
        },
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  //   change data user
  const inputGit = useRef(null);
  const inputLink = useRef(null);
  const inputFb = useRef(null);
  const inputIg = useRef(null);
  const inputTwt = useRef(null);

  async function handleSocial(e) {
    e.preventDefault();
    const token = Cookies.get("token");
    try {
      await axios.patch(
        `https://heqfgtfpnhrtzgkwxsrj.supabase.co/rest/v1/sosial?id_user=eq.1`,
        {
          github: inputGit.current.value
            ? inputGit.current.value
            : sosial.github,
          linkedin: inputLink.current.value
            ? inputLink.current.value
            : sosial.linkedin,
          facebook: inputFb.current.value
            ? inputFb.current.value
            : sosial.facebook,
          instagram: inputIg.current.value
            ? inputIg.current.value
            : sosial.instagram,
          twitter: inputTwt.current.value
            ? inputTwt.current.value
            : sosial.twitter,
        },
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="container-dashboard">
        <Sidebar />
        <Dashhead title={"Dashboard"} />
        {loadingPage ? (
          <LoadingPage />
        ) : (
          <div className="dashboard-home">
            <div className="dashboard-h-content">
              <div className="dashboard-h-c-info">
                <div className="dashboard-h-c-i-item">
                  <h5>Visitor</h5>
                  <span>
                    <h4>{visitor.length}</h4>
                    <p>user</p>
                  </span>
                </div>
                <div className="dashboard-h-c-i-item">
                  <h5>Message</h5>
                  <span>
                    <h4>{message.length}</h4>
                    <p>total</p>
                  </span>
                </div>
                <div className="dashboard-h-c-i-item">
                  <h5>Portfolio</h5>
                  <span>
                    <h4>{portfolio.length}</h4>
                    <p>sites</p>
                  </span>
                </div>
              </div>
              <div className="dashboard-h-c-graphic">
                <div className="dashboard-h-c-g-head">
                  <span>
                    <h6>Visitor graphics</h6>
                    <p>Total visitor per month</p>
                  </span>
                  <select onChange={(e) => setYearSelect(e.target.value)}>
                    <option value={moment().format("YYYY")} selected hidden>
                      {moment().format("YYYY")}
                    </option>
                    {[
                      ...new Set(
                        visitor.map((e) => e.created_at.split("-")[0])
                      ),
                    ].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <BarChart
                  xAxis={[
                    {
                      id: "barCategories",
                      data: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Ags",
                        "Sep",
                        "Okt",
                        "Nov",
                        "Des",
                      ],
                    },
                  ]}
                  series={[
                    {
                      data: [
                        visitor.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "01" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        visitor.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "02" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        visitor.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "03" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        visitor.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "04" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        visitor.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "05" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        visitor.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "06" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        visitor.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "07" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        visitor.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "08" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        visitor.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "09" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        visitor.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "10" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        visitor.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "11" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        visitor.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "12" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                      ],
                      color: "#000000",
                    },
                  ]}
                  height={300}
                />
              </div>
              <div className="dashboard-h-c-graphic">
                <div className="dashboard-h-c-g-head">
                  <span>
                    <h6>Message graphics</h6>
                    <p>Total message per month</p>
                  </span>
                  <select onChange={(e) => setYearSelect(e.target.value)}>
                    <option value={moment().format("YYYY")} selected hidden>
                      {moment().format("YYYY")}
                    </option>
                    {[
                      ...new Set(
                        message.map((e) => e.created_at.split("-")[0])
                      ),
                    ].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <BarChart
                  xAxis={[
                    {
                      id: "barCategories",
                      data: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Ags",
                        "Sep",
                        "Okt",
                        "Nov",
                        "Des",
                      ],
                    },
                  ]}
                  series={[
                    {
                      data: [
                        message.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "01" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        message.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "02" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        message.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "03" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        message.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "04" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        message.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "05" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        message.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "06" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        message.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "07" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        message.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "08" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        message.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "09" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        message.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "10" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        message.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "11" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                        message.filter(
                          (e) =>
                            e.created_at.split("-")[1] === "12" &&
                            e.created_at.split("-")[0] === yearSelect
                        ).length,
                      ],
                      color: "#000000",
                    },
                  ]}
                  height={300}
                />
              </div>
            </div>
            <div className="dashboard-h-content">
              <div className="dashboard-h-c-data">
                <h6>User</h6>
                <br />
                <label htmlFor="dashboard-h-c-d-nama">Nama</label>
                <input
                  ref={inputNama}
                  type="text"
                  id="dashboard-h-c-d-nama"
                  placeholder={user[0].nama}
                />
                <label htmlFor="dashboard-h-c-d-email">Email</label>
                <input
                  ref={inputEmail}
                  type="text"
                  id="dashboard-h-c-d-email"
                  placeholder={user[0].email}
                />
                <label htmlFor="dashboard-h-c-d-spesialis">Spesialisasi</label>
                <input
                  ref={inputSpesialis}
                  type="text"
                  id="dashboard-h-c-d-spesialis"
                  placeholder={user[0].spesialis}
                />
                <label htmlFor="dashboard-h-c-d-daerah">Daerah</label>
                <input
                  ref={inputDaerah}
                  type="text"
                  id="dashboard-h-c-d-daerah"
                  placeholder={user[0].daerah}
                />
                <label htmlFor="dashboard-h-c-d-provinsi">Provinsi</label>
                <input
                  ref={inputProvinsi}
                  type="text"
                  id="dashboard-h-c-d-provinsi"
                  placeholder={user[0].provinsi}
                />
                <label htmlFor="dashboard-h-c-d-negara">Negara</label>
                <input
                  ref={inputNegara}
                  type="text"
                  id="dashboard-h-c-d-negara"
                  placeholder={user[0].negara}
                />
                <button onClick={handleUser} className="button-main">
                  Change
                </button>
              </div>
              <div className="dashboard-h-c-data">
                <h6>Social media</h6>
                <br />
                <label htmlFor="dashboard-h-c-d-nama">Github</label>
                <input
                  ref={inputGit}
                  type="text"
                  id="dashboard-h-c-d-nama"
                  placeholder={sosial[0].github}
                />
                <label htmlFor="dashboard-h-c-d-email">Linkedin</label>
                <input
                  ref={inputLink}
                  type="text"
                  id="dashboard-h-c-d-email"
                  placeholder={sosial[0].linkedin}
                />
                <label htmlFor="dashboard-h-c-d-spesialis">Facebook</label>
                <input
                  ref={inputFb}
                  type="text"
                  id="dashboard-h-c-d-spesialis"
                  placeholder={sosial[0].facebook}
                />
                <label htmlFor="dashboard-h-c-d-daerah">Instagram</label>
                <input
                  ref={inputIg}
                  type="text"
                  id="dashboard-h-c-d-daerah"
                  placeholder={sosial[0].instagram}
                />
                <label htmlFor="dashboard-h-c-d-provinsi">Twitter</label>
                <input
                  ref={inputTwt}
                  type="text"
                  id="dashboard-h-c-d-provinsi"
                  placeholder={sosial[0].twitter}
                />
                <button onClick={handleSocial} className="button-main">
                  Change
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
