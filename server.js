require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

const path = require('path');

// Setting CORS so that any website can Access our API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

// Setting up express to use json and set it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongoose
//   .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/appDB', {
  //     useNewUrlParser: true,
  //     useCreateIndex: true
  //   })
  //   .then(() => console.log('MongoDB Connected!'))
  //   .catch(err => console.error(err));
  
  // Serve up static assets (usually on heroku)
  if (process.env.NODE_ENV === 'production')
  app.use(express.static('client/build'));
  
  app.get('/api/test', (req, res) => res.send('Hello from the Backend!'));
  
// Error handling
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(err);
  } else {
    next(err);
  }
});

// Send every request to the React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
