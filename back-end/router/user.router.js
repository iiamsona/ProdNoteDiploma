const { Router } = require('express');
const { createUser, login } = require('../controller/user.controller');

const userRouter = Router();

userRouter.post('/sign-up', createUser);
userRouter.post('/sign-in', login);

module.exports = {
  userRouter,
};