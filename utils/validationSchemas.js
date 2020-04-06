const Joi = require('@hapi/joi');

const email = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] }
  })
  .required();

const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
const name = Joi.string().alphanum().max(30).required();

const schemas = {
  signIn: Joi.object({
    email,
    password
  }),

  signUp: Joi.object({
    firstName: name,
    lastName: name,
    email,
    password
  }),

  userUpdate: {}
};
module.exports = schemas;
