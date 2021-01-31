import React from 'react';

const LogoutButton = ({ changeUser }) => (
  <button onClick={() => {
    changeUser(null);
    window.localStorage.removeItem('loggedUser');
  }}>
  Logout
  </button>
);

export default LogoutButton;
