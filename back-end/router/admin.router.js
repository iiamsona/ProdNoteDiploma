const { Router } = require('express');
const { login } = require('../controller/admin.controller');

const adminRouter = Router();

adminRouter.post('/sign-in', login);

module.exports = {
  adminRouter,
};