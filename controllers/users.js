const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

userRouter.post('/', async (request, response) => {
  const userObj = request.body;
  if (userObj.password.length < 3) {
    return response.status(400).json('Password should be atleast 3 characters');
  }
  userObj.password = await bcrypt.hash(userObj.password, 0);

  const user = new User(userObj);
  const result = await user.save();
  return response.json(result);
});

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs',
    {
      url: 1, title: 1, author: 1, id: 1,
    });
  response.json(users);
});

module.exports = userRouter;
