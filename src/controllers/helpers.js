module.exports = {
  validateRequiredFields(res, reqFields) {
    for (const [key, value] of Object.entries(reqFields)) {
      if (!value) {
        return res.status(400).json({
          error: { message: `Missing ${key} in request body` },
        });
      }
    }
  },
};
