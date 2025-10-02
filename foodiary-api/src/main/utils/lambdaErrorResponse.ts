import { ErrorCode } from '@application/errors/ErrorCode';

interface ILambdaErrorResponseParams {
  statusCode: number;
  code: ErrorCode;
  message: any;
}

export function lambdaErrorResponse({ statusCode, code, message }: ILambdaErrorResponseParams) {
  return {
    statusCode,
    body: JSON.stringify({
      error: {
        code,
        message,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
