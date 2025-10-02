import { ErrorCode } from '../ErrorCode';
import { HttpError } from './HttpError';

export class BadRequest extends HttpError {
  override statusCode = 400;
  override code: ErrorCode;

  constructor(message?: string, code?: ErrorCode) {
    super(message);

    this.name = 'BadRequest';
    this.code = code ?? ErrorCode.BAD_REQUEST;
  }
}
