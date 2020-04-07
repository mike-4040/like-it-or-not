const db = require('../models');
const dbErrors = require('../utils/dbErrors');
const { hashPassword, checkPassword } = require('../utils/auth');
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

  update: async ({ body: user }, res) => {
    /** updading password */
    if (user.oldPassword) {
      try {
        const dbUser = await db.User.findById(user.id);
        if (checkPassword(user.oldPassword, dbUser.password)) {
          dbUser.password = hashPassword(user.newPassword);
          updatedUser = await dbUser.save();
          return res.json(userToFront(updatedUser));
        } else return res.json({ errmsg: 'Wrong Password' });
      } catch (err) {
        dbErrors(err, res);
      }
    }
    /** updating all other fields */
    try {
      const updatedUser = db.User.findOneAndUpdate(
        { _id: user.id },
        { $set: user },
        { new: true, useFindAndModify: false }
      );
      res.json(userToFront(updatedUser));
    } catch (err) {
      dbErrors(err, res);
    }
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
