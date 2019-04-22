const roles = {
  admin: "admin", user: "user"
}

const approvals = {
  pending: "pending", approved: "approved", rejected: "rejected" 
}

const states = {
  new: "new", pending: "pending", denied: "denied", completed: "completed"
}

const handleError = (res, error) => {
  let status = error.status ? error.status : 500;
  let message = error.message;

  if (error.response) {
    status = error.response.status;
    message = error.response.data.userMessage
      ? error.response.data.userMessage
      : error.message;
    console.error(
      "Error response data : " + JSON.stringify(error.response.data)
    );
  }
  console.error("Error message : " + message);

  res.status(status).send({ message });
};

const generateError = (message, code) => {
  const error = new Error(message)
  error.status = code;
  return error;
}

module.exports = {
  approvals,
  generateError,
  handleError,
  roles,
  states
};
