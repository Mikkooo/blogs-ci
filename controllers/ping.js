const pingRouter = require('express').Router();

pingRouter.get('/', (req, res) => {
  res.send('ok');
});

module.exports = pingRouter;
