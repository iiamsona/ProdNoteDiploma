const { Router } = require('express');
const { auth } = require('../middleware/auth.middleware');
const { createPaper, updatePaper, getPapers, deactivatePaper, activatePaper } = require('../controller/paper.controller');
const { adminMiddleware } = require('../middleware/admin.middleware');

const paperRouter = Router();

paperRouter.post('/', auth, adminMiddleware, createPaper);
paperRouter.put('/:paperId', auth, adminMiddleware, updatePaper);
paperRouter.get('/', getPapers);
paperRouter.post('/:paperId/deactivate', auth, adminMiddleware, deactivatePaper);
paperRouter.post('/:paperId/activate', auth, adminMiddleware, activatePaper);

module.exports = {
  paperRouter,
};