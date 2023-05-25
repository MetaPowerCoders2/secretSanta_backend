const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }

    req.user = user;

    next();
  });
};

module.exports = verifyToken;
