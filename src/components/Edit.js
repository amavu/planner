import React from "react";
import { CgProfile } from "react-icons/cg";

export const Edit = () => {
  return (
    <div className="sign-up-container">
      <h2>EDIT</h2>
      <form className="form-container">
        <div className="profile-picture">
          <CgProfile size="50px" className="default-profile-picture" />
          <label className="input-label img-label">
            <span>UPLOAD PROFILE PICTURE</span>
            <input
              className="picture-input"
              type="file"
              name="profile picture"
              placeholder="Input profile picture url"
            />
          </label>
        </div>
        <div className="two-column-row">
          <label className="input-label" htmlFor="first name">
            First Name
            <input className="input-style" type="text" name="first name" />
          </label>

          <label className="input-label" htmlFor="surname">
            Surname
            <input className="input-style" type="text" name="surname" />
          </label>
        </div>
        <label className="input-label" htmlFor="email">
          Email
          <input className="input-style" type="text" name="email" />
        </label>
        <label className="input-label" htmlFor="password">
          Password
          <input className="input-style" type="password" name="password" />
        </label>
        <div className="buttons-sign-up-form">
          <button className="cancel-button">CANCEL</button>
          <button className="save-edits-button">SAVE EDITS</button>
        </div>
      </form>
    </div>
  );
};
