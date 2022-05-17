import "./login.css";

import { useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCalls";
import {Link} from 'react-router-dom'

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { username: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Reading</h3>
          <span className="loginDesc">
            Welcome to Reading.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Email" ref={email} className="loginInput" />
            <input placeholder="Password" ref={password} type={'password'} className="loginInput" />
            <button onClick={handleClick} className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              <Link to={'/register'}>Create a New Account</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
