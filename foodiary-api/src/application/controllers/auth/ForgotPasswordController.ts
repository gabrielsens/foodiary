import { Controller } from '@application/contracts/Controller';
import { ForgotPasswordUseCase } from '@application/usecases/auth/ForgotPasswordUseCase';
import { Injectable } from '@kernel/decorators/Injectable';
import { Schema } from '@kernel/decorators/Schema';
import {
  ForgotPasswordBody,
  forgotPasswordSchema,
} from './schemas/forgotPasswordSchema';

@Schema(forgotPasswordSchema)
@Injectable()
export class ForgotPasswordController extends Controller<'public', void> {
  constructor(private readonly forgotPasswordUseCase: ForgotPasswordUseCase) {
    super();
  }

  protected override async handle({
    body,
  }: Controller.Request<'public', ForgotPasswordBody>): Promise<
    Controller.Response<void>
  > {
    try {
      const { email } = body;
      await this.forgotPasswordUseCase.execute({
        email,
      });
    } catch {}

    return {
      statusCode: 204,
    };
  }
}
