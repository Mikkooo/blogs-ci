const { hash } = require('bcrypt');
const User = require('../models/user');

const notHashedUsers = [
  {
    _id: '5f7a12114267a001a7982da6',
    username: 'eka',
    password: 'eka1',
    name: 'Eka',
  },
  {
    _id: '5f7a153c96467d13183fd0be',
    username: 'toka',
    password: 'toka1',
    name: 'Toka',
  },
  {
    _id: '5f7a154c96467d13183fd0bf',
    username: 'kolmas',
    password: 'kolmas1',
    name: 'Kolmas',
  },
  {
    _id: '5f7a12114267a001a7982da9',
    username: 'neljas',
    password: 'neljas1',
    name: 'Neljas',
  },
];

const getHashedUsers = async () => {
  const promises = notHashedUsers.map((usr) => hash(usr.password, 0));
  const pws = await Promise.all(promises);
  let i = 0;
  const hashed = notHashedUsers.map((usr) => {
    const pw = pws[i]; // eslint-disable-line no-param-reassign
    i += 1;
    return { ...usr, password: pw };
  });
  return hashed;
};

const getUsersInDb = async () => {
  const rawUsers = await User.find({});
  return rawUsers.map((user) => user.toJSON());
};

module.exports = {
  notHashedUsers,
  getHashedUsers,
  getUsersInDb,
};
