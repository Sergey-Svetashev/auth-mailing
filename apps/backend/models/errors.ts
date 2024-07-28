export class GenericError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string = '',
    public readonly cause?: Error
  ) {
    super(`Error: ${message} ${cause ? `caused by ${cause.message}` : ""}`);
  }
}
