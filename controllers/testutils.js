const testRouter = require('express').Router();

const Blog = require('../models/blog');
const User = require('../models/user');

testRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  return response.status(200).send();
});

module.exports = testRouter;
