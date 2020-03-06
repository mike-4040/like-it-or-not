/**
 * @todo rating validation
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const recordSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User'
  },
  categoryId: {
    type: Types.ObjectId,
    ref: 'Category'
  },
  subject: {
    type: String,
    required: true
  },
  dateTime: {
    type: String,
    required: true
  },
  comment: String,
  rating: {
    type: String,
    required: true
  }
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
