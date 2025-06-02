import { Back } from "../components/Back";
import "../style/about.css";

export default function About() {
  return (
    <>
      <div className="about-container">
        <Back />
        <div className="about">
          <div className="about-head">
            <img src="/logo-white-full.svg" alt="logo" />
          </div>
          <div className="about-body">
            <h1>about</h1>
            <h6>
              a FullStack Developer who is passionate about creating interactive
              and efficient web experiences.
            </h6>
          </div>
          <div className="about-footer">
            <span>
              <p>
                I am a Fullstack Developer who combines frontend and backend
                expertise to create scalable and efficient digital solutions.
                Using Figma and React, I design intuitive and dynamic user
                interfaces, ensuring seamless interactions.
              </p>
              <br />
              <p>
                On the backend, I leverage Express.js and PostgreSQL to manage
                data, user authentication, and API integration with high
                performance and security. My approach focuses on modular
                architecture, optimization, and reliability, allowing
                applications to grow efficiently and sustainably.
              </p>
            </span>
            <span>
              <h1>{"</>"}</h1>
              <h5>
                FullStack <br />
                Developer
              </h5>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
