export const Login = () => {
  return (
    <div className="homepage-container">
      <h2>LOGIN</h2>
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
      <button>CANCEL</button>
      <button>SIGN IN</button>
    </div>
  );
};
