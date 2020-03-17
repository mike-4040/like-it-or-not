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
          .then(populatedCat =>
            res.status(200).json(cleanRecord(populatedCat))
          );
      })
      .catch(err => dbErrors(err, res)),

  findOne: (req, res) => {
    Record.findById(req.params.id)
      .populate('categoryId')
      .then(populatedCat => res.status(200).json(cleanRecord(populatedCat)))
      .catch(err => dbErrors(err, res));
  },
  update: ({ body }, res) => {
    Record.findByIdAndUpdate(body._id, body)
      .then(record => {
        Record.findById(record._id)
          .populate('categoryId')
          .then(populatedCat =>
            res.status(200).json(cleanRecord(populatedCat))
          );
      })
      .catch(err => dbErrors(err, res));
  },
  delete: (req, res) => {
    Record.findByIdAndDelete(req.params.id)
      .then(record => {
        if (record) res.status(200).send(record);
        else res.status(400).send(`Can't find record ${req.params.id}`);
      })
      .catch(err => dbErrors(err, res));
  },
  findRecordsUser: (req, res) => {
    Record.find({ userId: req.params.id })
      .populate('categoryId')
      .then(records => {
        cleanRecords = records.map(record => cleanRecord(record));
        res.status(200).json(cleanRecords);
      })
      .catch(err => dbErrors(err, res));
  }
};

cleanRecord = dbRecord => {
  const { _id, categoryId, rating, dateTime, comment } = dbRecord;
  const cleanRecord = {
    _id,
    catName: (categoryId && categoryId.catName) || 'Undefined',
    rating,
    dateTime,
    comment
  };
  return cleanRecord;
};
