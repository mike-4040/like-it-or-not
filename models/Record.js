const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
  userId: ObjectId,
  categoryId: ObjectId,
  datetime: Date,
  comment: String,
  rating: Number
});

const Record = mongoose.model('User', recordSchema);

module.exports = Record;
