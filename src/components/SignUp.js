import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { createUser } from "../services/services";
import { useHistory, Link } from "react-router-dom";

export const SignUp = () => {
  const history = useHistory();

  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    const user = {
      firstname,
      surname,
      email,
      password,
    };
    //checks if all the fields are filled out
    if (Object.values(user).some((field) => field === "")) {
      this.setState({ showFormError: true });
      return;
    }

    try {
      await createUser(user);
      history.push("/");
    } catch (error) {
      console.log("Creating user failed", error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>SIGN UP</h2>
      <form className="form-container" onSubmit={(e) => handleSignUp(e)}>
        <div className="two-column-row">
          <label className="input-label" htmlFor="first name">
            First Name
            <input
              className="input-style"
              type="text"
              name="first name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>

          <label className="input-label" htmlFor="surname">
            Surname
            <input
              className="input-style"
              type="text"
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </label>
        </div>
        <label className="input-label" htmlFor="email">
          Email
          <input
            className="input-style"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="input-label" htmlFor="password">
          Password
          <input
            className="input-style"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="buttons-sign-up-form">
          <Link to="/">
            <button className="cancel-button">CANCEL</button>
          </Link>
          <button className="sign-up-button" type="submit">
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  );
};
