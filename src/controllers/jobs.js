const Service = require('../services/jobs');

async function getAllUnpaid(req, res) {
  const contracts = await Service.findAllUnpaidByProfileId(req.profile.id);

  res.json(contracts);
}

module.exports = {
  getAllUnpaid,
};
