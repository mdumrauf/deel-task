const Service = require('../services/jobs');

/**
 * Obtains all unpaid jobs for the logged user.
 *
 * @param {Request} req
 * @param {Response} res
 */
async function getAllUnpaid(req, res) {
  const contracts = await Service.findAllUnpaidByProfileId(req.profile.id);

  res.json(contracts);
}

/**
 * Pay for a given job.
 *
 * @param {Request} req
 * @param {Response} res
 */
async function pay(req, res) {
  const { id } = req.params;

  const job = await Service.findById(id);

  if (!job) {
    return res.status(404).send({ error: 'Job not found' }).end();
  }

  if (!job.belongsTo(req.profile)) {
    return res.status(404).send({ error: 'Job not found' }).end();
  }

  if (!job.isClient(req.profile)) {
    return res.status(403).send({ error: 'Only the client can pay for the job' }).end();
  }

  res.status(201).send(job).end();
}

module.exports = {
  getAllUnpaid,
  pay,
};
