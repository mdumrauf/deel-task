const { Contract } = require('../model');

/**
 * Finds a {Contract} by id.
 *
 * @param {Number} id
 * @returns {Contract}
 */
async function findById(id) {
  const contract = await Contract.findOne({ where: { id } });
  return contract;
}

module.exports = {
  findById,
};
