const db = require('../models');
const dbErrors = require('../utils/dbErrors');
const { hashPassword } = require('../utils/auth');
const { userToFront} = require('../utils/mappers');

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
      .then(users => res.json(users.map(user => userToFront(user))))
      .catch(err => dbErrors(err, res));
  },
  /**
   * Find one User
   * @returns {Object}
   */
  findOne: (req, res) => {
    db.User.findById(req.params.id)
      .then(user => res.json(userToFront(user)))
      .catch(err => dbErrors(err, res));
  },

  update: ({ body }, res) => {
    if (body.password) body.password = hashPassword(body.password);
    console.log('Controller / update', body)
    db.User.findOneAndUpdate(
      { _id: body.id },
      { $set: body },
      { new: true, useFindAndModify: false }
    )
      .then(dbUser => res.json(userToFront(dbUser)))
      .catch(err => dbErrors(err, res));
  },
  /**
   * Delete a User
   * @returns {Object} category from db.
   */
  delete: (req, res) => {
    db.User.findByIdAndDelete(req.params.id)
      .then(dbUser => res.json(userToFront(dbUser)))
      .catch(err => dbErrors(err, res));
  },

  userRecords: (req, res) => {
    db.Record.find({ userId: req.params.id })
      .populate('categoryId')
      .then(records => res.status(200).json(records))
      .catch(err => dbErrors(err, res));
  }
};
