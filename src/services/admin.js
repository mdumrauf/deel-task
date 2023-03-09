const sequelize = require('sequelize');
const { Op } = require('sequelize');
const { Contract, Job, Profile } = require('../model');

/**
 * Returns the profession that earned the most money (sum of jobs paid)
 * for any contactor that worked in the query time range.
 *
 */
async function getBestProfession(start, end) {
  const where = {
    paid: { [Op.is]: true },
  };

  if (start && end) {
    where.paymentDate = { [Op.between]: [start, end] };
  } else if (start && !end) {
    where.paymentDate = { [Op.gte]: start };
  } else if (!start && end) {
    where.paymentDate = { [Op.lte]: end };
  }

  const bestProfessionAgg = await Job.findOne({
    where,
    attributes: [
      'Contract.Contractor.profession',
      [sequelize.fn('sum', sequelize.col('price')), 'total'],
    ],
    group: ['Contract.Contractor.profession'],
    raw: true,
    order: sequelize.literal('total DESC'),
    include: {
      model: Contract,
      as: 'Contract',
      include: [
        {
          model: Profile,
          as: 'Contractor',
          where: {
            type: 'contractor',
          },
        },
      ],
    },
  });
  if (!bestProfessionAgg) {
    return null;
  }
  const { profession, total } = bestProfessionAgg;
  return { profession, total };
}

/**
 * Returns the clients the paid the most for jobs in the query time period.
 * limit query parameter should be applied, default limit is 2.
 *
 * @param {Request} req
 * @param {Response} res
 */
async function getBestClients(req, res) {}

module.exports = {
  getBestProfession,
  getBestClients,
};
