const { Paper } = require("../schema/paper.schema");

const createPaper = async (req, res) => {
  const {
    type,
    price,
    width,
  } = req.body;

  const paper = new Paper({
    type,
    price,
    width,
    height: 1,
    isDeactivated: false,
  });

  await paper.save()

  res.status(201).json({ msg: 'Թուղթը ստեղծված է' });
}

const updatePaper = async (req, res) => {
  const {
    paperId,
  } = req.params;

  const {
    type,
    price,
    width,
  } = req.body;

  try {
    await Paper.findByIdAndUpdate(paperId, {
      type,
      price,
      width,
    });

    res.status(200).json({ msg: 'Թուղթը թարմացված է' });
  } catch (e) {
    res.status(500).json({ msg: 'Ծրագրային խնդիր' });
  }
}

const getPapers = async (req, res) => {
  const papers = await Paper.find();

  res.status(200).json({ papers });
}

const deactivatePaper = async (req, res) => {
  const {
    paperId,
  } = req.params;

  try {
    await Paper.findByIdAndUpdate(paperId, { isDeactivated: true });

    res.status(200).json({ msg: 'Թուղթը ապաակտիվացված է' });
  } catch (e) {
    res.status(500).json({ msg: 'Ծրագրային խնդիր' });
  }
}

const activatePaper = async (req, res) => {
  const {
    paperId,
  } = req.params;

  try {
    await Paper.findByIdAndUpdate(paperId, { isDeactivated: false });

    res.status(200).json({ msg: 'Թուղթը ակտիվացված է' });
  } catch (e) {
    res.status(500).json({ msg: 'Ծրագրային խնդիր' });
  }
}

module.exports = {
  createPaper,
  updatePaper,
  getPapers,
  deactivatePaper,
  activatePaper,
};