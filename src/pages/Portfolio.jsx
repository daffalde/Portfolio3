import { useEffect, useState } from "react";
import { Back } from "../components/Back";
import "../style/portfolio.css";
import axios from "axios";
import { LoadingPage } from "../components/Loading";

export default function Portfolio() {
  const [data, setData] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [hover, setHover] = useState(null);

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

  const [width, setWidth] = useState(0);
  useEffect(() => {
    function moveWindow() {
      setWidth(window.innerWidth);
    }
    addEventListener("resize", moveWindow);
    return () => removeEventListener("resize", moveWindow);
  });

  return (
    <>
      <div className="portfolio-container">
        <div
          className={`portfolio-black ${
            loadingPage ? "" : "portfolio-black-off"
          }`}
        >
          <LoadingPage color={"white"} />
        </div>
        <Back />
        {loadingPage ? null : (
          <div className="portfolio-wrap">
            <div className="portfolio">
              {data
                ? data
                    .sort((a, b) => b.portfolio_tanggal - a.portfolio_tanggal)
                    .map((e, i) => (
                      <div
                        key={e.id_portfolio}
                        onClick={() => window.open(e.link)}
                        className="portfolio-item-parent"
                      >
                        <div
                          style={{ backgroundImage: `url("${e.gambar}")` }}
                          className="portfolio-item-bg"
                        ></div>
                        <div
                          className={`portfolio-gap ${
                            hover === e.id_portfolio ? "portfolio-gap-off" : ""
                          }`}
                        ></div>
                        <div
                          onMouseEnter={() => setHover(e.id_portfolio)}
                          onMouseLeave={() => setHover(null)}
                          className={`portfolio-item ${
                            hover === e.id_portfolio
                              ? "portfolio-item-hover"
                              : ""
                          }`}
                        >
                          <img
                            className="portfolio-t-logo"
                            src={e.logo}
                            alt="logo"
                          />
                          <h1>{i + 1}</h1>
                          <h6
                            style={{
                              border: `2px solid ${
                                hover === e.id_portfolio || width <= 800
                                  ? "white"
                                  : "black"
                              }`,
                            }}
                          >
                            {e.portfolio_nama}
                          </h6>
                          <span>
                            <p>{e.deskripsi}</p>
                            <img
                              src={`/arrow${
                                hover === e.id_portfolio || width <= 800
                                  ? "3"
                                  : "2"
                              }.png`}
                              alt="arrow icon"
                            />
                          </span>
                        </div>
                      </div>
                    ))
                : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
