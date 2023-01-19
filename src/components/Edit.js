import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { editUser } from "../services/services";

export const Edit = ({ loggedInUserInfo }) => {
  const history = useHistory();
  const [firstname, setFirstname] = useState(loggedInUserInfo.firstname);
  const [surname, setSurname] = useState(loggedInUserInfo.surname);
  const [email, setEmail] = useState(loggedInUserInfo.email);

  const handleEditUser = async (e) => {
    e.preventDefault();

    const user = {
      id: loggedInUserInfo.id,
      firstname,
      surname,
      email,
    };
    //checks if all the fields are filled out
    if (Object.values(user).some((field) => field === "")) {
      this.setState({ showFormError: true });
      return;
    }

    try {
      console.log(user);
      await editUser(user);
      history.push("/");
    } catch (error) {
      console.log("Editing user failed", error);
    }
  };
  return (
    <div className="edit-container">
      <h2>EDIT</h2>
      <form className="form-container" onSubmit={(e) => handleEditUser(e)}>
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
          <Link to="/profile">
            <button className="edit-cancel-button">CANCEL</button>
          </Link>
          <button className="save-edits-button" type="submit">
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};
