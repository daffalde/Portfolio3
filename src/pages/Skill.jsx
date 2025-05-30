import { useNavigate } from "react-router-dom";
import { Back } from "../components/Back";
import "../style/skill.css";

export default function Skill() {
  const nav = useNavigate();
  return (
    <>
      <div className="skill-container">
        <div className="skill-black"></div>
        <Back />
        <div className="skill-wrap">
          <div className="skill">
            <div className="skill-head">
              <img
                onClick={() => nav("/")}
                src="/logo-black-full.svg"
                alt="logo"
              />
            </div>
            <div className="skill-title">
              <h5>
                Crafting Seamless and Scalable Web Experiences with Precision
              </h5>
              <p>
                With skilled precision and a passion for crafting seamless,
                scalable, and engaging web experiences that enhance user
                interaction, drive innovation, and deliver intuitive digital
                solutions.
              </p>
            </div>
            <div className="skill-list">
              <div className="div1">
                <img src="/html.png" alt="skill icon" />
                <h5>Html</h5>
              </div>
              <div className="div2">
                <img src="/css.png" alt="skill icon" />
                <h5>Css</h5>
              </div>
              <div className="div3">
                <img src="/react.png" alt="skill icon" />
                <h5>React</h5>
              </div>
              <div className="div4">
                <img src="/figma.png" alt="skill icon" />
                <h5>Figma</h5>
              </div>
              <div className="div5">
                <img src="/js.png" alt="skill icon" />
                <h5>Javascipt</h5>
              </div>
              <div className="div6">
                <img src="/supabase.png" alt="skill icon" />
                <h5>Supabase</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
