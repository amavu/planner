import React from "react";

export const SignUp = () => {
  return (
    <div className="homepage-container">
      <h2>SIGN UP</h2>
      <form>
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
      </form>
      <button>CANCEL</button>
      <button>SIGN UP</button>
    </div>
  );
};
