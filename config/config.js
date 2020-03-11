module.exports = {
  passport: {
    expiresIn: 10000
  },
  server: {
    port: process.env.PORT || 3001
  },
  mongo: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/lion',
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      autoIndex: true // required to enforce unique
    }
  }
};
