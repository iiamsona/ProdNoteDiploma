const { User } = require('../schema/user.schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const user = await User.findOne({ email, role: 'Admin' });
  
  if (!user) return res.status(401).json({ msg: 'Սխալ մուտքանուն կամ գաղտնաբառ' });

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) return res.status(401).json({ msg: 'Սխալ մուտքանուն կամ գաղտնաբառ' });
  
  const token = jwt.sign({
    id: user.id,
    role: user.role,
  }, process.env.JWT_SECRET, {
    expiresIn: '2 days'
  });

  res.status(200).json({ token });
}

module.exports = {
  login,
}