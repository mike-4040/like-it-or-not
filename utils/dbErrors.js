const dbErrors = (err, res) => {
  res
    .status(400)
    .send({error: err.name, message: err.errmsg || err.message});
};

module.exports = dbErrors;
