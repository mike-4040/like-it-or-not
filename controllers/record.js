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
        console.log(record._id);
        Record.findById(record._id)
          .populate('categoryId')
          .then(({ categoryId, rating, dateTime, comment }) => {
            const cleanRecord = {
              catName: categoryId.catName,
              rating,
              dateTime,
              comment
            };
            res.status(200).json(cleanRecord);
          });
      })
      .catch(err => dbErrors(err, res)),

  findOne: (req, res) => {
    console.log('Hello', req.params.id);
    Record.findById(req.params.id)
      .populate('categoryId')
      .then(({ categoryId, rating, dateTime, comment }) => {
        const cleanRecord = {
          catName: categoryId.catName,
          rating,
          dateTime,
          comment
        };
        res.status(200).json(cleanRecord);
      })
      .catch(err => dbErrors(err, res));
  }
};
