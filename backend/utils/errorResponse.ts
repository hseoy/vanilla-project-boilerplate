class ErrorResponse extends Error {
  isOperational: boolean;

  statusCode: number;

  stacks?: string;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    // Low한 Error 객체가 Error Handler로 넘어가면 500 Server Error 발생
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);

    this.stacks = this.stack;
  }
}

export default ErrorResponse;
