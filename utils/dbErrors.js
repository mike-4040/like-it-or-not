const dbErrors = (err, res) => {
  res.json({ errmsg: err.errmsg || err.message });
};

module.exports = dbErrors;
