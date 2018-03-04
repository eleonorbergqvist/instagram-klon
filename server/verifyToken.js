const jwt = require('jsonwebtoken');
const config = require('./config');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(400).send({ message: 'No token provided.' });
  }

  jwt.verify(token, config.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Failed to authenticate token.' });
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;