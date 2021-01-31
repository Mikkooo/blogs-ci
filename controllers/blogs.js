const jwt = require('jsonwebtoken');
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const blogObj = request.body;
  const authorizedUser = jwt.verify(request.token, process.env.SECRET);
  if (!authorizedUser) {
    return response.status(401).json({ error: 'token invalid' });
  }
  if (!blogObj.likes) {
    blogObj.likes = 0;
  }
  if (!blogObj.url || !blogObj.title) {
    return response.status(400).send('url or title absent');
  }

  const user = await User.findById(authorizedUser.id);
  blogObj.user = user._id;

  const blog = new Blog(blogObj);
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();

  return response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const blog = await Blog.findById(id);
  let authorizedUser;
  try {
    authorizedUser = jwt.verify(request.token, process.env.SECRET);
  } catch {
    return response.status(401).json({ error: 'token invalid' });
  }
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }
  if (blog.user.toString() === authorizedUser.id.toString()) {
    await blog.deleteOne();
    return response.status(204).send();
  }
  return response.status(401).json({ error: 'token invalid' });
});

blogRouter.put('/:id', async (request, response) => {
  const updated = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
  response.json(updated);
});

module.exports = blogRouter;
