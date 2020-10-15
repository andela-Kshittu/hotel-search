const handleError = (res, error) => {
  if (!error) {
    return res.status(500).send({message: "Internal server error."});
  }

  const status = error.status ? error.status : 500;
  const message = error.message;

  res.status(status).send({message});
};

module.exports = {
  handleError,
};
