const mappers = require('../utils/mappers');
const { roles } = require('../config/config');

test('return all and only required props', () => {
  const dbUser = {
    _id: 'id',
    firstName: 'val1',
    lastName: 'Kravtsov',
    email: 'mike4040@me.com',
    role: roles.admin,
    photo: 'http',
    password: 'password'
  };

  const frontUser = {
    id: 'id',
    firstName: 'val1',
    lastName: 'Kravtsov',
    email: 'mike4040@me.com',
    role: roles.admin,
    photo: 'http'
  };

  expect(mappers.userToFront(dbUser)).toEqual(frontUser);
});
