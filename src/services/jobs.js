const { Op } = require('sequelize');

const { Contract, Job, Profile } = require('../model');

/**
 * Finds a {Job} by id.
 *
 * @param {Number} id
 * @returns {Contract}
 */
async function findById(id) {
  const job = await Job.findByPk(id, {
    include: {
      model: Contract,
      as: 'Contract',
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
    },
  });
  return job;
}

/**
 * Finds all unpaid {Job}s for a given profileId. Can be either
 * client or contractor.
 *
 * @param {Number} profileId
 */
async function findAllUnpaidByProfileId(profileId) {
  const jobs = await Job.findAll({
    where: {
      paid: { [Op.not]: true },
    },
    include: {
      model: Contract,
      as: 'Contract',
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
    },
  });
  return jobs.map((job) => ({
    id: job.id,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    description: job.description,
    price: job.price,
    contractId: job.ContractId,
    contractTerms: job.Contract.terms,
    clientId: job.Contract.Client.id,
    client: `${job.Contract.Client.firstName} ${job.Contract.Client.lastName}`,
    contractorId: job.Contract.Contractor.id,
    contractor: `${job.Contract.Contractor.firstName} ${job.Contract.Contractor.lastName}`,
  }));
}

module.exports = {
  findById,
  findAllUnpaidByProfileId,
};
