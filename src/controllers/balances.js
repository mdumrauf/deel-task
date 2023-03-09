const JobsService = require('../services/jobs');
const Service = require('../services/profiles');

async function depositMoneyForUser(req, res) {
  const { userId } = req.params;
  const { amount } = req.body;

  if (!userId || amount === undefined) {
    return res.status(400).send({ error: 'userId and amount to deposit are mandatory' }).end();
  }

  if (amount <= 0) {
    return res.status(400).send({ error: 'Amount to deposit must be positive' }).end();
  }

  const profile = await Service.findById(userId);

  if (!profile) {
    return res.status(404).send({ error: 'Client not found' }).end();
  }

  if (profile.type !== 'client') {
    return res.status(404).send({ error: 'Client not found' }).end();
  }

  const unpaidJobs = await JobsService.findAllUnpaidByProfileId(userId);
  const totalDebt = unpaidJobs.reduce((total, job) => total + job.price, 0);

  if (amount > totalDebt * 0.25) {
    return res.status(400).send({ error: 'Cannot deposit more than 25% of all your jobs' }).end();
  }

  await Service.updateById(userId, { balance: profile.balance + amount });

  res.status(201).end();
}

module.exports = {
  depositMoneyForUser,
};
