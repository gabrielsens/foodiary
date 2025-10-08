import { ErrorCode } from '../ErrorCode';
import { ApplicationError } from './ApplicationError';

export class EmailAlreadIdUse extends ApplicationError {
  override statusCode = 409;

  override code: ErrorCode;

  constructor() {
    super();

    this.name = 'EmailAlreadIdUse';
    this.message = 'Email already in use';
    this.code = ErrorCode.EMAIL_ALREADY_IN_USE;
  }
}
