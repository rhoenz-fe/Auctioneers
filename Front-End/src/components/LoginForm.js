import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, setUsername, setPassword, username, password, onLoginSuccess }) => {
  const handleLoginFormSubmit = async (event) => {
    event.preventDefault()
    //call hadnlelogin to perform login and onLoginSuccess to handle successful login
    await handleLogin(event)
    onLoginSuccess()
  };

  return (
    <div className="lr-outer-container">
      <div className="lr-container">
        <h2 className="lr-heading">Log in to application</h2>
        <div className="lr-box">
          <form className="lr-form" onSubmit={handleLoginFormSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button id="lrbutton" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};

export default LoginForm;
