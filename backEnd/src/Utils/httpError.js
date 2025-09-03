export default class HttpError extends Error {
  #statusCode;

  constructor(message, statusCode) {
    super(message);

    this.name = this.constructor.name;

    this.#statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
