const localClientPort = 3000;
const localServerPort = 3001;

module.exports = {
  serverrc: {
    port: process.env.PORT || localServerPort,
    clientURI: `${
      process.env.NODE_ENV === 'production'
        ? ''
        : `http://localhost:${localClientPort}`
    }`
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
  jwtrc: { expiresIn: 129600 },
  passportrc: {
    googleCallbackURL: `${
      process.env.NODE_ENV === 'production'
        ? ''
        : `http://localhost:${localServerPort}`
    }/api/auth/google/callback`
  }
};
