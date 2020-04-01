module.exports = {
  /** @param {Object} dbUser - User from the database
   * @returns {Oblect} - User for the frontend
   */
  userToFront: (dbUser) => ({
    id: dbUser._id,
    firstName: dbUser.firstName,
    lastName: dbUser.lastName,
    email: dbUser.email
  })
}
