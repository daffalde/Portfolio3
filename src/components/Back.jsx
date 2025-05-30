import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Back() {
  const nav = useNavigate();

  const [back, setBack] = useState(false);

  useEffect(() => {
    if (back) {
      const timeout = setTimeout(() => {
        nav("/?variable=300");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [back]);
  return (
    <>
      <div onClick={() => setBack(true)} className="back">
        <div className="back-in"></div>
        <div className="back-in">
          <img
            height={"50px"}
            src="/arrow-left-black.png"
            alt="arrow back icon"
          />
          <h6>Back</h6>
        </div>
      </div>
      <div className={`back-move ${back ? "back-move-on" : ""}`}></div>
    </>
  );
}
