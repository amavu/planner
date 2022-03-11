import { ReactComponent as CalendarIcon } from "../icons/calendar-iso-gradient.svg";
import { Link } from "react-router-dom";

export const Homepage = () => {
  return (
    <div className="homepage-container">
      <h2>Welcome to Planner!</h2>
      <div className="register-text">
        <p>NOT REGISTERED?</p>
        <Link to={"/signup"}>CREATE A USER NOW!</Link>
      </div>
      <CalendarIcon width="300px" height="282px" />
      <form>
        <input
          type="text"
          placeholder="EMAIL"
          className="input-style"
          name="username"
        />
        <br></br>
        <input
          type="password"
          placeholder="PASSWORD"
          className="input-style"
          name="username"
        />
      </form>
      <button className="sign-in-button">SIGN IN</button>
    </div>
  );
};
