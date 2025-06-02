import { Link, useNavigate } from "react-router-dom";
import "../style/home.css";
import { useEffect, useRef, useState } from "react";
import { LoadingEnter } from "../components/Loading";
import axios from "axios";
import moment from "moment";

export default function Home() {
  const getUrl = window.location.search;
  const nav = useNavigate();
  const [move, setMove] = useState(false);
  const [destination, setDestination] = useState(null);

  async function handleVisitor() {
    try {
      await axios.post("https://portfolio3-backend.vercel.app/data/visitor", {
        platform: navigator.userAgent,
        tanggal: new Date(),
      });
    } catch (e) {
      console.log(e);
    }
  }
  const hasSentRequest = useRef(false);

  useEffect(() => {
    if (!hasSentRequest.current) {
      handleVisitor();
      hasSentRequest.current = true;
    }
  }, []);

  const [data, setData] = useState(null);
  const [link, setLink] = useState(null);
  const [dataIndicator, setDataIndicator] = useState(false);
  const [loadingEnter, setLoadingEnter] = useState(true);

  async function getData() {
    try {
      const resp = await axios.get(
        "https://portfolio3-backend.vercel.app/data/info"
      );
      const respLink = await axios.get(
        "https://portfolio3-backend.vercel.app/data/sosial",
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
          },
        }
      );
      setData(resp.data[0]);
      setLink(respLink.data[0]);
      setDataIndicator(true);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getData();

    if (dataIndicator) {
      const timeout = setTimeout(() => {
        setLoadingEnter(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [dataIndicator]);

  useEffect(() => {
    if (move) {
      const timeout = setTimeout(() => {
        nav(destination);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [move]);

  //   cekscroll
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    if (getUrl.split("=")[1] === "300") {
      window.scrollTo(0, 300);
    }
    function handleScroll() {
      setScroll(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <LoadingEnter value={loadingEnter} />
      <div className="home-wrap">
        <div
          className={`home ${scroll >= 200 ? "home-off" : ""} ${
            loadingEnter || scroll >= 200 ? "" : "home-aos"
          }`}
        >
          <div className="home-content">
            {/* movable element */}
            <h1
              className={`home-c-title ${
                loadingEnter || scroll >= 200 ? "" : "home-c-title-aos"
              }`}
            >
              {data ? data.spesialis : null}
            </h1>
            <img
              className={`home-c-picture ${
                loadingEnter || scroll >= 200 ? "" : "home-c-picture-aos"
              }`}
              src="/picture.png"
              alt="picture of creator"
            />

            {/* static element */}
            <div
              className={`home-head ${
                loadingEnter || scroll >= 200 ? "" : "home-head-aos"
              }`}
            >
              <img
                onClick={() => nav("/")}
                src="/logo-black-full.svg"
                alt="logo"
              />
              <button
                onClick={() => window.open(link ? link.linkedin : null)}
                className="button-main"
              >
                Hire me
              </button>
            </div>
            <div className="home-footer">
              <div
                className={`home-f-social ${
                  loadingEnter || scroll >= 200 ? "" : "home-f-social-aos"
                }`}
              >
                <button
                  onClick={() => window.open(link ? link.github : null)}
                  style={{ backgroundImage: `url("/github.svg")` }}
                ></button>
                <button
                  onClick={() => window.open(link ? link.linkedin : null)}
                  style={{ backgroundImage: `url("/linkedin.svg")` }}
                ></button>
                <button
                  onClick={() => window.open(link ? link.twitter : null)}
                  style={{ backgroundImage: `url("/x.svg")` }}
                ></button>
                <button
                  onClick={() => window.open(link ? link.instagram : null)}
                  style={{ backgroundImage: `url("/ig.svg")` }}
                ></button>
              </div>
              <div
                onClick={() => window.scrollTo(0, 500)}
                className="home-f-arrow"
              >
                <p>View more</p>
                <img src="/arrow-down.png" alt="arrow down" />
              </div>
              <div
                className={`home-f-text ${
                  loadingEnter || scroll >= 200 ? "" : "home-f-text-aos"
                }`}
              >
                Life is not about waiting for the storm to pass,
                <br /> but learning to dance in the rain
              </div>
            </div>
          </div>
        </div>
        <div className="menu">
          <div className={`menu-content ${move ? "menu-content-off" : ""}`}>
            <div className="menu-c-left">
              <span className="menu-c-l-span">
                <img
                  onClick={() => nav("/")}
                  className={`menu-c-l-s-logo ${
                    scroll >= 200 ? "menu-c-l-s-logo-aos" : ""
                  }`}
                  src="/logo-white-full.svg"
                  alt="logo website"
                />
                <div
                  className={`menu-c-l-info ${
                    scroll >= 200 ? "menu-c-l-info-aos" : ""
                  }`}
                >
                  <p>{data ? data.daerah : null}</p>
                  <p>{data ? data.provinsi : null}</p>
                  <p>{data ? data.negara : null}</p>
                  <br />
                  <br />
                  <p>FrontEnd Developer</p>
                  <p>{data ? data.info_email : null}</p>
                  <br />
                  <br />
                  <button
                    onClick={() => window.open(link ? link.linkedin : null)}
                    className="menu-c-l-i-hire"
                  >
                    Hire Me
                  </button>
                </div>
              </span>
              <span
                className={`menu-c-l-social ${
                  scroll >= 200 ? "menu-c-l-social-aos" : ""
                }`}
              >
                <Link to={link ? link.github : null}>github</Link>
                <Link to={link ? link.linkedin : null}>linkedin</Link>
              </span>
            </div>
            <div className="menu-c-right">
              <div
                onClick={() => {
                  setMove(true);
                  setDestination("/about");
                }}
                className="menu-c-r-item"
              >
                <h2
                  className={`menu-c-r-i-title ${
                    scroll >= 200 ? "menu-c-r-i-title-aos" : ""
                  }`}
                >
                  about
                </h2>
                <img src="/arrow-right-white.png" alt="arrow icon" />
              </div>
              <div
                onClick={() => {
                  setMove(true);
                  setDestination("/skill");
                }}
                className="menu-c-r-item"
              >
                <h2
                  className={`menu-c-r-i-title ${
                    scroll >= 200 ? "menu-c-r-i-title-aos" : ""
                  }`}
                >
                  skill
                </h2>
                <img src="/arrow-right-white.png" alt="arrow icon" />
              </div>
              <div
                onClick={() => {
                  setMove(true);
                  setDestination("/projects");
                }}
                className="menu-c-r-item"
              >
                <h2
                  className={`menu-c-r-i-title ${
                    scroll >= 200 ? "menu-c-r-i-title-aos" : ""
                  }`}
                >
                  projects
                </h2>
                <img src="/arrow-right-white.png" alt="arrow icon" />
              </div>
              <div
                onClick={() => {
                  setMove(true);
                  setDestination("/contact");
                }}
                className="menu-c-r-item"
              >
                <h2
                  className={`menu-c-r-i-title ${
                    scroll >= 200 ? "menu-c-r-i-title-aos" : ""
                  }`}
                >
                  contact
                </h2>
                <img src="/arrow-right-white.png" alt="arrow icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
