import { AuthGateway } from '@infra/gateways/AuthGateway';
import { Injectable } from '@kernel/decorators/Injectable';

@Injectable()
export class ConfirmForgotPasswordUseCase {
  constructor(private readonly authGateway: AuthGateway) {}

  async execute({ email, code, newPassword }: ConfirmForgotPasswordUseCase.Input): Promise<void> {
    await this.authGateway.confirmForgotPassword({
      email,
      code,
      newPassword,
    });
  }
}

export namespace ConfirmForgotPasswordUseCase {
  export type Input = {
    email: string;
    code: string;
    newPassword: string;
  };
}
