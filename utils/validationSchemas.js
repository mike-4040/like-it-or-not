const Joi = require('@hapi/joi');

const schemas = {

  signIn: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] }
      })
      .required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  }),
  
  signUp: Joi.object({
    firstName: Joi.string()
      .alphanum()
      .max(30)
      .required(),
    lastName: Joi.string()
      .alphanum()
      .max(30)
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] }
      })
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required()
  })
};
module.exports = schemas;
