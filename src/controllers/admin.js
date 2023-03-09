const Service = require('../services/admin');

/**
 * Returns the profession that earned the most money (sum of jobs paid)
 * for any contactor that worked in the query time range.
 *
 * @param {Request} req
 * @param {Response} res
 */
async function getBestProfession(req, res) {
  const best = await Service.getBestProfession(req.query.start, req.query.end);
  res.json(best);
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
