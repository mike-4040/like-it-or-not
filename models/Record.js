/**
 * @todo rating validation
 */

const mongoose = require('mongoose');
// const User = require('./User');
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
    type: String
  },
  dateTime: {
    type: Date,
    required: true
  },
  comment: String,
  rating: {
    type: String,
    required: true
  }
});
/** Implemented, but then decided that it makes no sense to keep recordId in the User  */
// recordSchema.post('save', async ({_id, userId}) => {
//   user = await User.findById(userId);
//   user.recordId.push(_id);
//   await user.save();
// });

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
