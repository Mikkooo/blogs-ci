const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const token = auth.substring(7);
    request.token = token;
  } else {
    request.token = null;
  }
  next();
};

module.exports = tokenExtractor;
