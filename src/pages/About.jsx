import "../style/about.css";

export default function About() {
  return (
    <>
      <div className="about-container">
        <div className="about">
          <div className="about-head">
            <img src="/logo-white-full.svg" alt="logo" />
          </div>
          <div className="about-body">
            <h1>about</h1>
            <h6>
              a Frontend Developer who is passionate about creating interactive
              and efficient web experiences.
            </h6>
          </div>
          <div className="about-footer">
            <span>
              <p>
                As a Frontend Developer, I am passionate about creating
                interactive, responsive and efficient web experiences. I
                incorporate my React expertise to build modular and dynamic UIs,
                ensuring each element has optimal performance and an intuitive
                user experience. With Figma, I design aesthetic and functional
                interfaces, building prototypes that are not only visually
                appealing but also support seamless interactions.
              </p>
              <br />
              <p>
                In addition, I integrated Supabase as the backend solution to
                efficiently manage databases, user authentication, and APIs,
                enabling fast and secure data connectivity.
              </p>
            </span>
            <span>
              <h1>{"</>"}</h1>
              <h5>
                FrontEnd <br />
                Developer
              </h5>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
