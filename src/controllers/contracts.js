const Service = require('../services/contracts');

/**
 * Checks if contract belongs to logged user.
 *
 * @param {Contract} contract
 * @param {Profile} profile
 * @returns true or false
 */
function belongsToLoggedUser(contract, profile) {
  return profile.id === contract.clientId || profile.id === contract.contractorId;
}

/**
 * Finds contract by id.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns contract by id
 */
async function findById(req, res) {
  const { id } = req.params;

  const contract = await Service.findById(id);

  if (!contract) {
    return res.status(404).end();
  }

  if (!belongsToLoggedUser(contract, req.profile)) {
    return res.status(403).send({ error: 'Forbidden access' }).end();
  }

  res.json(contract);
}

module.exports = {
  findById,
};
