
const asyncHandler = (fn) => {
  if (typeof fn !== 'function') {
    throw new TypeError('Async handler expects a function');
  }

  return (req, res, next) => {
    try {
      const maybePromise = fn(req, res, next);

      // Check if fn returned a Promise
      if (maybePromise && typeof maybePromise.then === 'function') {
        maybePromise.catch((err) => {
          console.log(`Async Error: ${err.message}`, { stack: err.stack });
          next(err); // Forward to global error handler
        });
      }
    } catch (err) {
      // Handle synchronous errors
      console.log(`Sync Error: ${err.message}`, { stack: err.stack });
      next(err);
    }
  };
};

export default asyncHandler;