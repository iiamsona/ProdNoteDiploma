const { Router } = require('express');
const { adminMiddleware } = require('../middleware/admin.middleware');
const { auth } = require('../middleware/auth.middleware');
const { createTemplate, getTemplatesList, updateTemplate, deactivateTemplate, activateTemplate } = require('../controller/template.controller');

const templateRouter = Router();

templateRouter.post('/', auth, adminMiddleware, createTemplate);
templateRouter.put('/:templateId', auth, adminMiddleware, updateTemplate);
templateRouter.post('/:templateId/deactivate', auth, adminMiddleware, deactivateTemplate);
templateRouter.post('/:templateId/activate', auth, adminMiddleware, activateTemplate);
templateRouter.get('/', getTemplatesList);

module.exports = {
  templateRouter,
};