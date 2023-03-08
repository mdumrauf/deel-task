const Service = require('../services/contracts');

/**
 * FIX ME!
 * @returns contract by id
 */
async function findById(req, res) {
  const { id } = req.params;

  const contract = await Service.findById(id);

  if (!contract) return res.status(404).end();

  res.json(contract);
}

module.exports = {
  findById,
};
