import { ReactComponent as CalendarIcon } from "../icons/calendar-iso-gradient.svg";
import { Link } from "react-router-dom";
import { getLoginToken } from "../services/services";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export const Homepage = ({ checkLoginStatus, onLoginChange }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const isLoggedIn = checkLoginStatus();
  if (isLoggedIn) {
    history.push("/todolists");
  }

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      handleLoginAttempt(e);
    }
  };

  const handleLoginAttempt = async (e) => {
    e.preventDefault();
    // perform the actual login

    try {
      // 1. Make a POST request to /login in the API
      const { token } = await getLoginToken({
        email: email.toLowerCase(),
        password: password,
      });

      if (!token) {
        setShowError(true);
        throw new Error("Unsuccessful login");
      }
      setShowError(false);

      // 2. Store token in local storage
      await localStorage.setItem("plannertoken", token);

      //2.1 Change Login status
      await onLoginChange();

      // 3. Redirect back to feed
      history.replace("/todolists");
    } catch (error) {}
  };

  return (
    <div className="homepage-container">
      <h2>Welcome to Planner!</h2>
      <div className="register-text">
        <p>NOT REGISTERED?</p>
        <Link to={"/signup"}>CREATE A USER NOW!</Link>
      </div>
      <CalendarIcon width="300px" height="262px" />
      <form className="form-homepage" onSubmit={(e) => handleLoginAttempt(e)}>
        <input
          type="text"
          placeholder="EMAIL"
          className="input-style"
          name="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="PASSWORD"
          className="input-style"
          name="username"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => handleSubmit(e)}
        />
        <div className={showError ? "show-error" : "hide-error"}>
          Invalid username or password
        </div>
        <button type="submit" className="sign-in-button">
          SIGN IN
        </button>
      </form>
    </div>
  );
};
