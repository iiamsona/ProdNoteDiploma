const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json({ msg: 'Դուք չունեք բավարար արտոնություններ' });

  const extractedJwt = token.split(' ')[1];

  try {
    const encoded = jwt.verify(extractedJwt, process.env.JWT_SECRET);
    req.user = encoded;
    next();
  } catch (e) {
    res.status(403).json({ msg: 'Դուք չունեք բավարար արտոնություններ' });
  }
}

module.exports = {
  auth,
};