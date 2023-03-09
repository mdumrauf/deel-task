const { Profile } = require('../model');

/**
 * Finds a {Profile} by id.
 *
 * @param {Number} id
 * @returns {Profile}
 */
async function findById(id) {
  return await Profile.findByPk(id);
}

/**
 * Updates a {Profile} by id.
 *
 * @param {Number} id
 * @param {Partial<Profile>} profile
 */
async function updateById(id, profile) {
  return await Profile.update(profile, {
    where: {
      id,
    },
  });
}

module.exports = {
  findById,
  updateById,
};
