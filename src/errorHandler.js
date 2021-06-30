require('dotenv').config();
const { NODE_ENV } = process.env;

function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    response = { message: error.message, error };
  }
  console.error(error);
  res.status(500).json(response);
}

module.exports = errorHandler;
