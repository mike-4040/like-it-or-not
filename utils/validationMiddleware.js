const middleware = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.send({errmsg: message});
    } else next();
  };
};
module.exports = middleware;
