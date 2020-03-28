/**
 * User controller.
 */

const db = require('../models');
const dbErrors = require('../utils/dbErrors');
const {
  hashPassword,
  checkPassword,
  createToken,
  checkToken,
  shortToken
} = require('../utils/auth');
const {
  serverErrorCode,
  registerValidation,
  loginValidation
} = require('../utils/validators');

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
   * Create one User
   * @returns {Object} category from db.
   */
  create: (req, res) => {
    const user = req.body;

    user.password = hashPassword(user.password);
    console.log(user);
    db.User.create(user)
      .then(dbUser => {
        const token = createToken(
          dbUser.id,
          dbUser.email,
          dbUser.firstName,
          dbUser.lastName
        );
        res.json({ token });
      })
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
  signin: (req, res) => {
    const { email, password } = req.body;
    db.User.findOne({ email })
      .then(user => {
        if (!user)
          res.status(400).json({ code: 1, message: 'Email is not found.' });
        if (checkPassword(password, user.password)) {
          const token = createToken(
            user.id,
            email,
            user.firstName,
            user.lastName
          );
          res.status(200).json({ code: 0, token });
        } else {
          res.status(400).json({ code: 2, message: 'Wrong password.' });
        }
      })
      .catch(err => dbErrors(err, res));
  },
  userRecords: (req, res) => {
    db.Record.find({ userId: req.params.id })
      .populate('categoryId')
      .then(records => res.status(200).json(records))
      .catch(err => dbErrors(err, res));
  },

  /** After succesfull social auth issue and pass to the frontend a short living token */
  returnShortTocken: ({ user }, res) => {
    console.log(`returnShortTocken, redirect to: ${process.env.FRONT_URL || ''}/auth/`);
    res.redirect(`${process.env.FRONT_URL || ''}/auth/${shortToken(user._id)}`);
  },

  exchangeToken: (req, res) => {
    const payload = checkToken(req.params.token);
    if (!payload) return res.status(400).send('Wrong token');

    db.User.findById(payload.id)
      .then(user => {
        if (!user) res.status(500).send('Server error at "exchangeToken"');
        const token = createToken(
          user.id,
          user.email,
          user.firstName,
          user.lastName
        );
        res.status(200).send(token);
      })
      .catch(err => dbErrors(err, res));
  }
};
