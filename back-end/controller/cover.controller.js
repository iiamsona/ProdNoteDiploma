const { Cover } = require("../schema/cover.schema");

const createCover = async (req, res) => {
  const {
    type,
    price,
  } = req.body;

  const cover = new Cover({
    type,
    price,
    isDeactivated: false,
  });

  await cover.save();

  res.status(201).json({ msg: 'Կազմը ստեղծված է' });
}

const updateCover = async (req, res) => {
  const { coverId } = req.params;

  const {
    type,
    price,
  } = req.body;

  try {
    await Cover.findByIdAndUpdate(coverId, {
      type,
      price,
    });

    res.status(200).json({ msg: 'Կազմը թարմացված է' });
  } catch (e) {
    res.status(500).json({ msg: 'Ծրագրային խնդիր' });
  }
}

const getCovers = async (req, res) => {
  const covers = await Cover.find();

  res.status(200).json({ covers });
}

const deactivateCover = async (req, res) => {
  const { coverId } = req.params;

  try {
    await Cover.findByIdAndUpdate(coverId, { isDeactivated: true });

    res.status(200).json({ msg: 'Կազմը ապաակտիվացված է' });
  } catch (e) {
    res.status(500).json({ msg: 'Ծրագրային խնդիր' });
  }
}

const activateCover = async (req, res) => {
  const { coverId } = req.params;

  try {
    await Cover.findByIdAndUpdate(coverId, { isDeactivated: false });

    res.status(200).json({ msg: 'Կազմը ապաակտիվացված է' });
  } catch (e) {
    res.status(500).json({ msg: 'Ծրագրային խնդիր' });
  }
}

module.exports = {
  createCover,
  updateCover,
  getCovers,
  deactivateCover,
  activateCover,
};