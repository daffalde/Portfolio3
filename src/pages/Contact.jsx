import { useEffect, useRef, useState } from "react";
import { Back } from "../components/Back";
import "../style/contact.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { AlertFailed, AlertSuccess } from "../components/Alert";

export default function Contact() {
  const [data, setData] = useState(null);
  const [link, setLink] = useState(null);

  async function getData() {
    try {
      const resp = await axios.get(
        "https://heqfgtfpnhrtzgkwxsrj.supabase.co/rest/v1/user?select=*",
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
          },
        }
      );
      const respLink = await axios.get(
        "https://heqfgtfpnhrtzgkwxsrj.supabase.co/rest/v1/sosial?select=*",
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
          },
        }
      );
      setData(resp.data[0]);
      setLink(respLink.data[0]);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  //   send data
  const inputName = useRef("");
  const inputEmail = useRef("");
  const inputMessage = useRef("");

  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFailed, setAlertFailed] = useState(false);

  async function handleSend(e) {
    e.preventDefault();
    try {
      await axios.post(
        "https://heqfgtfpnhrtzgkwxsrj.supabase.co/rest/v1/message",
        {
          nama: inputName.current.value,
          email: inputEmail.current.value,
          pesan: inputMessage.current.value,
        },
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
          },
        }
      );
      setAlertSuccess(true);
      inputName.current.value = "";
      inputEmail.current.value = "";
      inputMessage.current.value = "";
    } catch (e) {
      console.log(e);
      setAlertFailed(true);
    }
  }

  useEffect(() => {
    if (alertFailed || alertSuccess) {
      const timeout = setTimeout(() => {
        setAlertFailed(false);
        setAlertSuccess(false);
      }, 7000);
      return () => clearTimeout(timeout);
    }
  }, [alertSuccess, alertFailed]);
  return (
    <>
      <Back />
      {alertSuccess ? <AlertSuccess message={"Message sent"} /> : null}
      {alertFailed ? <AlertFailed message={"Message failed to sent"} /> : null}
      <div className="contact-container">
        <div className="contact-wrap">
          <div className="contact">
            <div className="contact-head">
              <img src="/logo-white-full.svg" alt="logo" />
            </div>
            <div className="contact-content">
              <div className="contact-menu">
                <h1>contact</h1>
                <form onSubmit={handleSend}>
                  <input ref={inputName} type="text" placeholder="Name" />
                  <input ref={inputEmail} type="text" placeholder="Email" />
                  <textarea ref={inputMessage} placeholder="Message"></textarea>
                  <button>
                    Send{" "}
                    <img
                      height={"60%"}
                      src="/arrow-right-white.png"
                      alt="arrow icon"
                    />
                  </button>
                </form>
              </div>
              <div className="contact-menu">
                <p className="contact-m-paragraph">
                  Please feel free to ask me anytime. I'm here to help with
                  anything! If there's something you're thinking about or want
                  to explore further, let's talk about it together.
                </p>
                <div className="contact-m-info">
                  <span>
                    <h6>General</h6>
                    <p>{data ? data.nama : null}</p>
                    <br />
                    <h6>Email</h6>
                    <p>{data ? data.email : null}</p>
                  </span>
                  <span>
                    <h6>Social media</h6>
                    <Link to={link ? link.instagram : null}>Instagram</Link>
                    <Link to={link ? link.facebook : null}>Facebook</Link>
                    <Link to={link ? link.twitter : null}>Twitter</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
