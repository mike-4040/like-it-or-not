export class User {
  constructor(dbUser) {
    this.firstName = dbUser.firstName;
    this.lastName = dbUser.lastName;
    this.email = dbUser.email;
    this.role = dbUser.role;
    this.id = dbUser.id;
  }
}
