require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtrc } = require('../config/config');

module.exports = {
  /**
   * Hash plain password
   * @param {string} password
   * @returns {string} hashed password
   * @todo change to async
   */
  hashPassword: password =>
    bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS)),

  /**
   * Check password agains hashed password
   * @param {string} password
   * @param {string} hashedPassword
   * @returns {boolean}
   * @todo change to sync
   */
  checkPassword: (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword),

  createToken: (id, email, firstName) =>
    jwt.sign(
      { id, email, firstName },
      process.env.SERVER_SECRET,
      { expiresIn: jwtrc.expireIn}
    )
};
