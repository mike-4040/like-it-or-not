/** Record controller. */
const { Record } = require('../models');
const dbErrors = require('../utils/dbErrors');

module.exports = {
  /**
   * Create a Record
   * @returns {Object} record from db.
   */
  create: (req, res) =>
    Record.create(req.body)
      .then(record => {
        Record.findById(record._id)
          .populate('categoryId')
          .then(populatedCat => res.status(200).json(cleanRecord(populatedCat)));
      })
      .catch(err => dbErrors(err, res)),

  findOne: (req, res) => {
    Record.findById(req.params.id)
      .populate('categoryId')
      .then(populatedCat => res.status(200).json(cleanRecord(populatedCat)))
      .catch(err => dbErrors(err, res));
  }
};

cleanRecord = dbRecord => {
  const { categoryId, rating, dateTime, comment } = dbRecord;
  const cleanRecord = {
    catName: (categoryId && categoryId.catName) || 'Udefined',
    rating,
    dateTime,
    comment
  };
  return cleanRecord;
};
