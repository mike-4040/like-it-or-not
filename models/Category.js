const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  firstName: String,
  lastName: String,
  email: String
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
