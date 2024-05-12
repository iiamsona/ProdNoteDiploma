const { User } = require("../schema/user.schema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  const {
    name,
    email,
    password,
    hvhh,
  } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  const user = new User({
    name,
    email,
    password: hash,
    hvhh,
    role: 'User',
  });

  await user.save();

  res.status(201).json({ msg: 'Հաջող գրանցում' });
}

const login = async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const user = await User.findOne({ email, role: 'User' });
  
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
  createUser,
  login,
}