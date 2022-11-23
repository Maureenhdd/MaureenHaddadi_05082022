import "./LoginForm.scss";
import { useNavigate } from "react-router-dom";
import { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeToken } from "../../redux/slice/TokenSlice";

import { persistor } from "../../redux/store";

const initialState = {
  username: "",
  password: "",
  error: false,
  select: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USERNAME":
      return {
        ...state,
        username: action.value,
      };

    case "PASSWORD":
      return {
        ...state,
        password: action.value,
      };
    case "ERROR":
      return {
        ...state,
        error: action.value,
      };
    case "SELECT":
      return {
        ...state,
        select: action.value,
      };
  }
};

const LoginForm = () => {
  const [state, setState] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePersist = () => {
    setState({ type: "SELECT", value: !state.select });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        email: state.username,
        password: state.password,
      }),
    }).then(async (response) => {
      switch (response.status) {
        case 400:
          setState({ type: "ERROR", value: "wrong email or password!" });
          break;
        case 200:
          state.select ? persistor.persist() : persistor.pause();
          dispatch(storeToken((await response.json()).body.token));
          navigate("/user");
          setState({ type: "ERROR", value: " " });

          break;
      }
    });
  };

  return (
    <>
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form className="form">
          <p className="error_msg">{state.error}</p>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              id="username"
              value={state.username || ""}
              onChange={(e) =>
                setState({ type: "USERNAME", value: e.target.value })
              }
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={state.password || ""}
              onChange={(e) =>
                setState({ type: "PASSWORD", value: e.target.value })
              }
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={state.select}
              onChange={handlePersist}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" onClick={handleSubmit}>
            Sign In
          </button>
        </form>
      </section>
    </>
  );
};

export default LoginForm;
