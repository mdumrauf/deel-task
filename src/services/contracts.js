const { Contract, Profile } = require('../model');

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

module.exports = {
  findById,
};
