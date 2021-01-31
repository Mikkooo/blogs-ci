import axios from 'axios';

const baseUrl = '/api/login';

const login = (credientials) => {
  console.log(credientials);
  return axios.post(baseUrl, credientials)
    .then((response) => response.data);
};

export default login;
