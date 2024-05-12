const { Router } = require('express');
const { auth } = require('../middleware/auth.middleware');
const { createCover, updateCover, getCovers, deactivateCover, activateCover } = require('../controller/cover.controller');
const { adminMiddleware } = require('../middleware/admin.middleware');

const coverRouter = Router();

coverRouter.post('/', auth, adminMiddleware, createCover);
coverRouter.put('/:coverId', auth, adminMiddleware, updateCover);
coverRouter.get('/', getCovers);
coverRouter.post('/:coverId/deactivate', auth, adminMiddleware, deactivateCover);
coverRouter.post('/:coverId/activate', auth, adminMiddleware, activateCover);

module.exports = {
  coverRouter,
};