/**
 * @todo rating validation
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Types = Schema.Types;

const recordSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  categoryId: {
    type: Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  comment: String,
  rating: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  }
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
