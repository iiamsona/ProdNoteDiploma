const adminMiddleware = (req, res, next) => {
  const user = req.user;

  if (user.role != 'Admin') return res.status(403).json({ msg: 'Դուք չունեք բավարար արտոնություններ' });

  next();
}

module.exports = { adminMiddleware };