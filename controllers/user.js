const db = require('../models');
const dbErrors = require('../utils/dbErrors');
const { hashPassword } = require('../utils/auth');
const { userToFront } = require('../utils/mappers');

module.exports = {
  /**
   * Find one User
   * @returns {Object}
   */
  findOne: (req, res) => {
    db.User.findById(req.params.id)
      .then(user => res.json(userToFront(user)))
      .catch(err => dbErrors(err, res));
  },

  update: ({ body: user }, res) => {
    console.log('Controller/User/update: body', user);
    if (user.oldPassword) {
      
    }
    if (user.password) user.password = hashPassword(user.password);
    db.User.findOneAndUpdate(
      { _id: user.id },
      { $set: user },
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
