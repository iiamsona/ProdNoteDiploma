const { Template } = require("../schema/template.schema");

const createTemplate = async (req, res) => {
  const {
    name,
    path,
  } = req.body;

  const template = new Template({
    name,
    path,
  });

  await template.save();

  res.status(201).json({ msg: 'Ձևանմուշը ստեղծված է' });
}

const updateTemplate = async (req, res) => {
  const {
    name,
    path,
  } = req.body;

  const { templateId } = req.params;

  try {
    await Template.findByIdAndUpdate(templateId, {
      name,
      path,
    });

    res.status(200).json({ msg: 'Ձևանմուշը թարմացված է' });
  } catch (e) {
    res.status(500).json({ msg: 'Ծրագրային խնդիր' });
  }
}

const getTemplatesList = async (req, res) => {
  const templates = await Template.find();

  res.status(200).json({ templates });
}

const deactivateTemplate = async (req, res) => {
  const {
    templateId,
  } = req.params;

  try {
    await Template.findByIdAndUpdate(templateId, { isDeactivated: true });

    res.status(200).json({ msg: 'Ձևանմուշը ապաակտիվացված է' });
  } catch (e) {
    res.status(500).json({ msg: 'Ծրագրային խնդիր' });
  }
}

const activateTemplate = async (req, res) => {
  const {
    templateId,
  } = req.params;

  try {
    await Template.findByIdAndUpdate(templateId, { isDeactivated: false });

    res.status(200).json({ msg: 'Ձևանմուշը ակտիվացված է' });
  } catch (e) {
    res.status(500).json({ msg: 'Ծրագրային խնդիր' });
  }
}

module.exports = {
  createTemplate,
  updateTemplate,
  deactivateTemplate,
  activateTemplate,
  getTemplatesList,
};