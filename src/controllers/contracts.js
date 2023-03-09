const Service = require('../services/contracts');

/**
 * Picks the exposed attributes for a Contract.
 *
 * @param {Contract} contract
 * @returns simplified contract
 */
function toSimplifiedContract(contract) {
  const client = contract.Client;
  const contractor = contract.Contractor;

  return {
    id: contract.id,
    createdAt: contract.createdAt,
    updatedAt: contract.updatedAt,
    status: contract.status,
    terms: contract.terms,
    clientId: client.id,
    client: `${client.firstName} ${client.lastName}`,
    contractorId: contractor.id,
    contractor: `${contractor.firstName} ${contractor.lastName}`,
  };
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
    return res.status(404).send({ error: 'Contract not found' }).end();
  }

  if (!contract.belongsTo(req.profile)) {
    return res.status(404).send({ error: 'Contract not found' }).end();
  }

  res.json(toSimplifiedContract(contract));
}

/**
 * Obtains all non-terminated contracts for the logged user.
 *
 * @param {Request} req
 * @param {Response} res
 */
async function findAllByProfileId(req, res) {
  const contracts = await Service.findAllByProfileId(req.profile.id);
  const simplifiedContracts = contracts.map(toSimplifiedContract);
  res.json(simplifiedContracts);
}

module.exports = {
  findById,
  findAllByProfileId,
};
