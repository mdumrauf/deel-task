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
  const {
    params: { id },
    profile,
  } = req;

  const job = await Service.findById(id);

  if (!job) {
    return res.status(404).send({ error: 'Job not found' }).end();
  }

  if (!job.belongsTo(profile)) {
    return res.status(404).send({ error: 'Job not found' }).end();
  }

  if (!job.isClient(profile)) {
    return res.status(403).send({ error: 'Only the client can pay for the job' }).end();
  }

  if (job.isPaid()) {
    return res.status(400).send({ error: 'Job was already paid' }).end();
  }

  if (!profile.canPay(job)) {
    const error = `Not enough funds to pay for the job. Needed $${job.price}, but balance is $${profile.balance}.`;
    return res.status(409).send({ error }).end();
  }

  const update = {
    paid: true,
    paymentDate: new Date(),
  };
  await Service.updateById(id, update);
  const updatedJob = await Service.findById(id);
  const balance = profile.balance - job.price;
  await profile.update({ balance: balance.toFixed(2) });

  res.status(201).send(updatedJob).end();
}

module.exports = {
  getAllUnpaid,
  pay,
};
