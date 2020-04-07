const errMesseges = require('../config/errMessages');

const dbErrors = (err, res) => {
  let errmsg = '';
  if (err.code === 11000) errmsg = errMesseges.duplEmail;
  else errmsg = err.errmsg || err.message;
  res.json({ errmsg });
};

module.exports = dbErrors;
