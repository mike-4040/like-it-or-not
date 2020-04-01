const db = require('../models');
const dbErrors = require('../utils/dbErrors');

module.exports = {
  /**
   * Find all User, sort them ascending
   * @param {object} req
   * @param {object} res
   * @returns {Object[]}
   */
  findAll: (req, res) => {
    db.User.find({})
      .sort({ lastName: 1 })
      .then(users => res.json(users))
      .catch(err => dbErrors(err, res));
  },
  /**
   * Find one User
   * @returns {Object}
   */
  findOne: (req, res) => {
    db.User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => dbErrors(err, res));
  },

  /**
   * Update a User
   * @returns {Object} updated category from db.
   */
  update: (req, res) => {
    db.User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => dbErrors(err, res));
  },
  /**
   * Delete a User
   * @returns {Object} category from db.
   */
  delete: (req, res) => {
    db.User.findByIdAndDelete(req.params.id)
      .then(dbUser => res.json(dbUser))
      .catch(err => dbErrors(err, res));
  },

  userRecords: (req, res) => {
    db.Record.find({ userId: req.params.id })
      .populate('categoryId')
      .then(records => res.status(200).json(records))
      .catch(err => dbErrors(err, res));
  }
};
