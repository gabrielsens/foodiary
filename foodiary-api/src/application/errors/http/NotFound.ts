import { ErrorCode } from '../ErrorCode';
import { HttpError } from './HttpError';

export class NotFound extends HttpError {
  override statusCode = 404;
  override code: ErrorCode;

  constructor(message?: string, code?: ErrorCode) {
    super();

    this.name = 'NotFound';
    this.message = message ?? 'Resource not found';
    this.code = code ?? ErrorCode.BAD_REQUEST;
  }
}
