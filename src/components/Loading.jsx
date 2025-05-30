export function LoadingButton({ color }) {
  return (
    <>
      <div className="loading-button">
        <img
          src={`/loading-${color === "white" ? "white" : "black"}.png`}
          alt="loading icon"
        />
      </div>
    </>
  );
}

export function LoadingPage({ color }) {
  return (
    <>
      <div className="loading-page">
        <img
          src={`/loading-${color === "white" ? "white" : "black"}.png`}
          alt="loading icon"
        />
      </div>
    </>
  );
}

export function LoadingEnter({ value }) {
  return (
    <>
      <div className={`loading-enter ${value ? "" : "loading-exit"}`}>
        <img
          className="loading-enter-title"
          src="/logo-white-full.svg"
          alt="logo"
        />
        <span>
          <img
            className="loading-enter-load"
            src={`/loading-white.png`}
            alt="loading icon"
          />
        </span>
      </div>
    </>
  );
}
