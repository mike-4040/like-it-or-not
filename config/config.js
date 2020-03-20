module.exports = {
  passport: {
    expiresIn: 10000
  },
  serverrc: {
    port: process.env.PORT || 3001
  },
  mongorc: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/lion',
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      autoIndex: true, // required to enforce unique
      useFindAndModify: false // Make Mongoose use `findOneAndUpdate()`
    }
  },
  jwtrc: { expireIn: 129600 }
};
