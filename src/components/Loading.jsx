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
