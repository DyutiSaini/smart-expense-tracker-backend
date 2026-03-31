class ApiError extends Error {
  constructor(
    statuscode,
    message = "Something went wrong",
    stack = "",
    error = [],
  ) {
    super(message);
    this.message = message;
    this.data = null;
    this.error = error;
    this.statuscode = statuscode;
    if (!stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export { ApiError };
