const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('express-async-errors');

const app = express();
const tokenExtractor = require('./utils/tokenExtractor');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const testRouter = require('./controllers/testutils');
const pingRouter = require('./controllers/ping');

const { URL } = require('./utils/config');

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);

app.use(express.static('build'))
app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/health', pingRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/test', testRouter);
}

module.exports = app;
