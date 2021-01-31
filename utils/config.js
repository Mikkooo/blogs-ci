require('dotenv').config();

const { URL, PORT, TESTURL } = process.env;
const url = process.env.NODE_ENV === 'test' ? TESTURL : URL;

module.exports = {
  URL: url,
  PORT,
};
