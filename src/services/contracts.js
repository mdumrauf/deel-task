const { Op } = require('sequelize');

const { Contract, Profile } = require('../model');

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
 * Finds a {Contract} by id.
 *
 * @param {Number} id
 * @returns {Contract}
 */
async function findById(id) {
  const contract = await Contract.findByPk(id, {
    include: [
      {
        model: Profile,
        as: 'Contractor',
      },
      {
        model: Profile,
        as: 'Client',
      },
    ],
  });
  return toSimplifiedContract(contract);
}

/**
 * Finds all {Contract}s for a given profileId. Can be either
 * client or contractor.
 *
 * @param {Number} profileId
 */
async function findAllByProfileId(profileId) {
  const contracts = await Contract.findAll({
    where: {
      status: { [Op.ne]: 'terminated' },
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    },
    include: [
      {
        model: Profile,
        as: 'Contractor',
      },
      {
        model: Profile,
        as: 'Client',
      },
    ],
  });
  return contracts.map(toSimplifiedContract);
}

module.exports = {
  findById,
  findAllByProfileId,
};
