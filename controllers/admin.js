const db = require('../models');
const dbErrors = require('../utils/dbErrors');
const { hashPassword } = require('../utils/auth');
const { userToFront} = require('../utils/mappers');

module.exports = {

  findAllUsers: (req, res) => {
    db.User.find({})
      .sort({ lastName: 1 })
      .then(users => res.json(users.map(user => userToFront(user))))
      .catch(err => dbErrors(err, res));
  },
  
  updateUser: ({ body }, res) => {
    if (body.password) body.password = hashPassword(body.password);
    db.User.findOneAndUpdate(
      { _id: body.id },
      { $set: body },
      { new: true, useFindAndModify: false }
    )
      .then(dbUser => res.json(userToFront(dbUser)))
      .catch(err => dbErrors(err, res));
  },
  
  deleteUser: (req, res) => {
    db.User.findByIdAndDelete(req.params.id)
      .then(dbUser => res.json(userToFront(dbUser)))
      .catch(err => dbErrors(err, res));
  },
};
