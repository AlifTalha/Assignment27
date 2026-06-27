const ApiError = require("../utils/ApiError");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    return next(new ApiError(400, message));
  }

  next();
};

const validateFields =
  (...fields) =>
  (req, res, next) => {
    const missing = fields.filter((field) => !req.body[field]);

    if (missing.length > 0) {
      return next(new ApiError(400, `Please provide: ${missing.join(", ")}`));
    }

    next();
  };

module.exports = { validate, validateFields };
