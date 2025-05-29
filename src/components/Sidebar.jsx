export function Sidebar() {
  const getUrl = window.location.pathname;
  return (
    <>
      <div className="dashboard-sidebar">
        <div className="dashboard-sidebar-top">
          <img src="/ico.svg" alt="icon" />
          <span>
            <button
              className={`dashboard-sidebar-button ${
                getUrl.split("/")[2] === "" ? "dashboard-sidebar-button-on" : ""
              }`}
            >
              <img src="/home.png" alt="out icon" />
            </button>
            <button
              className={`dashboard-sidebar-button ${
                getUrl.split("/")[2] === "message"
                  ? "dashboard-sidebar-button-on"
                  : ""
              }`}
            >
              <img src="/message.png" alt="out icon" />
            </button>
            <button
              className={`dashboard-sidebar-button ${
                getUrl.split("/")[2] === "portfolio"
                  ? "dashboard-sidebar-button-on"
                  : ""
              }`}
            >
              <img src="/portfolio.png" alt="out icon" />
            </button>
            <button className="dashboard-sidebar-button">
              <img src="/plus.png" alt="out icon" />
            </button>
          </span>
        </div>

        <button className="dashboard-sidebar-button">
          <img src="/out.png" alt="out icon" />
        </button>
      </div>
    </>
  );
}
