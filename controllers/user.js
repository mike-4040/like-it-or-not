/**
 * User controller.
 */
const db = require('../models');

module.exports = {
  /**
   * Find all Users, sort them by lastName, return
   * @param {object} req
   * @param {object} res
   */
  findAll: (req, res) => {
    db.User.find({})
      .sort({ lastName: 1 })
      .then(user => res.json(user));
  }
};
