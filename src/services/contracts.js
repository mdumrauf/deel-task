const { Op } = require('sequelize');

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
  return contract;
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
  return contracts;
}

module.exports = {
  findById,
  findAllByProfileId,
};
