/**
 * Category controller.
 */
const db = require('../models');
const dbErrors = require('../utils/dbErrors');

module.exports = {
  /**
   * Find all Categories, sort them ascending
   * @param {object} req
   * @param {object} res
   * @returns {Object[]}
   */
  findAll: (req, res) => {
    db.Category.find({})
      .sort({ catName: 1 })
      .then(categories => res.json(categories))
      .catch(err => dbErrors(err, res));
  },
  /**
   * Find one Category
   * @returns {Object}
   */
  findOne: (req, res) => {
    db.Category.findById(req.params.id)
      .then(dbCategory => res.json(dbCategory))
      .catch(err => dbErrors(err, res));
  },
  /**
   * Create one Category
   * @returns {Object} category from db.
   */
  create: (req, res) => {
    db.Category.create(req.body)
      .then(dbCategory => res.json(dbCategory))
      .catch(err => dbErrors(err, res));
  },
  /**
   * Update a Category
   * @returns {Object} updated category from db.
   */
  update: (req, res) => {
    db.Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    )
      .then(dbCategory => res.json(dbCategory))
      .catch(err => dbErrors(err, res));
  },
  /**
   * Delete a Category
   * @returns {Object} category from db.
   */
  delete: (req, res) => {
    db.Category.findByIdAndDelete(req.params.id)
      .then(dbCategory => res.json(dbCategory))
      .catch(err => dbErrors(err, res));
  }
};
