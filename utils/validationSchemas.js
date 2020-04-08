const Joi = require('@hapi/joi');

const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] }
});
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
const name = Joi.string().alphanum().max(30);
const firstName = name.label('Fisrt Name');
const lastName = name.label('Last Name');
const id = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const photo = Joi.string();

const schemas = {
  signIn: Joi.object({
    email: email.required(),
    password: password.required()
  }),

  signUp: Joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    email: email.required(),
    password: password.required()
  }),

  userUpdate: Joi.object({
    id: id.required(),
    firstName,
    lastName,
    email,
    oldPassword: password,
    newPassword: password,
    photo: photo
  })
    .with('oldPassword', 'newPassword')
    .with('newPassword', 'oldPassword')
    .xor('firstName', 'email', 'newPassword', 'photo')
    .label('User Data')
};
module.exports = schemas;
