const Service = require('../services/admin');

const DEFAULT_LIMIT = 2;

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
async function getBestClients(req, res) {
  const { start, end, limit } = req.query;
  const clientLimit = limit || DEFAULT_LIMIT;

  const clients = await Service.getBestClients(start, end, clientLimit);
  res.json(clients);
}

module.exports = {
  getBestProfession,
  getBestClients,
};
