import axios from 'axios';

const baseUrl = '/api/blogs';
let config = null;
const setAuth = (token) => {
  if (!token) {
    config = null;
  } else {
    config = {
      headers: {
        Authorization: `bearer ${token}`,
      },
    };
  }
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const post = (blog) => axios.post(baseUrl, blog, config);

const put = (blog) => axios.put(`${baseUrl}/${blog.id}`, blog, config);

const remove = (id) => axios.delete(`${baseUrl}/${id}`, config);

export default {
  getAll, post, put, remove, setAuth,
};
