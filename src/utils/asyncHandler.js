// This is common function to call while talking to DB

// 1st method using promise
const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};
/*
2nd method using async function

const asyncHandler = () => {};
const asyncHandler = (func) => {() => {}};
const asyncHandler = (func) => async () => {}; this is what happened below 

// next is for middleware
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};
*/
