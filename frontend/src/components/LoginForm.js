import React, { useState } from 'react';
import PropTypes from 'prop-types';
import login from '../services/login';

const LoginForm = ({ changeUser, createNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    login({ username, password })
      .then((data) => {
        changeUser(data);
        window.localStorage.setItem('loggedUser', JSON.stringify(data));
        createNotification('successful login', 'green');
      })
      .catch(() => {
        createNotification('unsuccessful login', 'red');
      });
  };
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            className="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="text"
            className="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  changeUser: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired,
};

export default LoginForm;
