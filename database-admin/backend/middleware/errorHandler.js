// Centralized error handler. Any controller that calls next(err) lands here.
function errorHandler(err, req, res, next) {
  console.error(err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation failed",
      details: Object.values(err.errors).map((e) => e.message),
    });
  }

  // Mongoose duplicate key error (e.g. duplicate registration)
  if (err.code === 11000) {
    return res.status(409).json({
      error: "Duplicate entry",
      details: err.keyValue,
    });
  }

  // Malformed ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({ error: `Invalid id: ${err.value}` });
  }

  res.status(err.status || 500).json({ error: err.message || "Server error" });
}

module.exports = errorHandler;
