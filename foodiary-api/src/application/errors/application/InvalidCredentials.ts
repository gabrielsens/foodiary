import { ErrorCode } from '../ErrorCode';
import { ApplicationError } from './ApplicationError';

export class InvalidCredentials extends ApplicationError {
  override statusCode = 401;

  override code: ErrorCode;

  constructor() {
    super();

    this.name = 'InvalidCredentials';
    this.message = 'InvalidCredentials';
    this.code = ErrorCode.INVALID_CREDENTIALS;
  }
}
