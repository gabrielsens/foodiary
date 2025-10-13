import { ErrorCode } from '../ErrorCode';
import { ApplicationError } from './ApplicationError';

export class InvalidRefreshToken extends ApplicationError {
  override statusCode = 401;

  override code: ErrorCode;

  constructor() {
    super();

    this.name = 'InvalidRefreshToken';
    this.message = 'InvalidRefreshToken';
    this.code = ErrorCode.INVALID_REFRESH_TOKEN;
  }
}
