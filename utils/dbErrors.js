const dbErrors = (err, res) => {
  let error = err.errmsg || err.message;
  error = error ? `Name: ${err.name}, Message: ${error}` : 'No error';
  console.log('err', JSON.stringify(err));

  res.status(400).json({error});
};

module.exports = dbErrors;
