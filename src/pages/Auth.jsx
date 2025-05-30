import { Link, useNavigate } from "react-router-dom";
import "../style/auth.css";
import { useEffect, useRef, useState } from "react";
import { LoadingButton } from "../components/Loading";
import axios from "axios";
import { AlertFailed } from "../components/Alert";
import Cookies from "js-cookie";

export default function Auth() {
  const nav = useNavigate();
  const [loadingButton, setLoadingButton] = useState(false);
  const inputEmail = useRef("");
  const inputPass = useRef("");
  Cookies.remove("token");

  const [alertFailed, setAlertFailed] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoadingButton(true);
    try {
      const { data } = await axios.post(
        "https://heqfgtfpnhrtzgkwxsrj.supabase.co/auth/v1/token?grant_type=password",
        {
          email: inputEmail.current.value,
          password: inputPass.current.value,
        },
        {
          headers: {
            apikey: import.meta.env.VITE_ANON,
          },
        }
      );
      Cookies.set("token", data.access_token);
      nav("/dashboard");
    } catch (e) {
      console.log(e);
      setLoadingButton(false);
      setAlertFailed(true);
    }
  }

  useEffect(() => {
    if (alertFailed) {
      const timeout = setTimeout(() => {
        setAlertFailed(false);
      }, 7000);
      return () => clearTimeout(timeout);
    }
  }, [alertFailed]);

  return (
    <>
      <div className="container">
        {alertFailed ? (
          <AlertFailed message={"periksa email & password"} />
        ) : null}
        <div className="auth-head">
          <img onClick={() => nav("/")} src="/logo-black.svg" alt="logo" />
        </div>
        <div className="auth-body">
          <div className="auth-body-content">
            <span>
              <h5>Welcome back</h5>
              <p>
                Hey <b>buddy</b>,please enter your details
              </p>
            </span>
            <form>
              <span>
                <img src="/mail-login.png" alt="mail icon login" />
                <div className="auth-form-gap"></div>
                <input
                  ref={inputEmail}
                  type="email"
                  placeholder="email@example.com"
                />
              </span>
              <span>
                <img src="/pass-login.png" alt="password icon login" />
                <div className="auth-form-gap"></div>
                <input
                  ref={inputPass}
                  type="password"
                  placeholder="Your password"
                />
              </span>
              <button onClick={handleLogin} className="auth-b-c-login">
                Sign in{" "}
                {loadingButton ? <LoadingButton color={"black"} /> : null}
              </button>
            </form>
            <Link>Forgot your password?</Link>
          </div>
        </div>
        <p style={{ position: "fixed", bottom: "0", padding: "10px 0" }}>
          *Only <b>admin</b> can login
        </p>
      </div>
    </>
  );
}
