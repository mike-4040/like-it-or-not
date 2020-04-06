const Joi = require('@hapi/joi');

const email = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] }
  })
;
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
const name = Joi.string().alphanum().max(30);

const schemas = {
  signIn: Joi.object({
    email: email.required(),
    password: password.required()
  }),

  signUp: Joi.object({
    firstName: name.required(),
    lastName: name.required(),
    email: email.required(),
    password: password.required()
  }),

  userUpdate: {}
};
module.exports = schemas;
