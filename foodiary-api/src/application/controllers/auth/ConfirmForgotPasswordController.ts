import { Controller } from '@application/contracts/Controller';
import { BadRequest } from '@application/errors/http/BadRequest';
import { ConfirmForgotPasswordUseCase } from '@application/usecases/auth/ConfirmForgotPasswordUseCase';
import { Injectable } from '@kernel/decorators/Injectable';
import { Schema } from '@kernel/decorators/Schema';
import {
  ConfirmForgotPasswordBody,
  confirmForgotPasswordSchema,
} from './schemas/confirmForgotPasswordSchema';

@Schema(confirmForgotPasswordSchema)
@Injectable()
export class ConfirmForgotPasswordController extends Controller<
  'public',
  void
> {
  constructor(
    private readonly confirmForgotPasswordUseCase: ConfirmForgotPasswordUseCase,
  ) {
    super();
  }

  protected override async handle({
    body,
  }: Controller.Request<'public', ConfirmForgotPasswordBody>): Promise<
    Controller.Response<void>
  > {
    try {
      const { email, code, newPassword } = body;
      await this.confirmForgotPasswordUseCase.execute({
        email,
        code,
        newPassword,
      });

      return {
        statusCode: 204,
      };
    } catch {
      throw new BadRequest('Failed. Please try again later');
    }
  }
}
