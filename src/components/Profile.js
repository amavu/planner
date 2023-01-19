import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

export const Profile = ({ loggedInUserInfo }) => {
  const history = useHistory();
  const [firstname, setFirstname] = useState(loggedInUserInfo.firstname);
  const [surname, setSurname] = useState(loggedInUserInfo.surname);
  const [email, setEmail] = useState(loggedInUserInfo.email);

  return (
    <div className="sign-up-container">
      <h2>PROFILE</h2>
      <form className="form-container" onSubmit={(e) => e}>
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
        <div className="buttons-sign-up-form">
          <Link to="/todolists">
            <button className="cancel-button">CANCEL</button>
          </Link>
          <Link to="/edit">
            <button className="edit-profile-button">EDIT</button>
          </Link>
        </div>
      </form>
    </div>
  );
};
