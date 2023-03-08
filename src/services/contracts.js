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
  return {
    id: contract.id,
    createdAt: contract.createdAt,
    updatedAt: contract.updatedAt,
    status: contract.status,
    terms: contract.terms,
    client: `${contract.Client.firstName} ${contract.Client.lastName}`,
    contractor: `${contract.Client.firstName} ${contract.Client.lastName}`,
  };
}

module.exports = {
  findById,
};
