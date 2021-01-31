import React from 'react';

const Notification = ({ notification }) => {
  if (notification === null) return null;
  const style = {
    backgroundColor: notification.colour,
  };
  return (
    <div style={style}>
      <h3>{notification.text}</h3>
    </div>
  );
};

export default Notification;
