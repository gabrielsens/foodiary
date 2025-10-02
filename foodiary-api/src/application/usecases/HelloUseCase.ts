import { Injectable } from '@kernel/decorators/Injectable';

@Injectable()
export class HelloUseCase {
  async execute(input: HelloUseCase.Input): Promise<HelloUseCase.Output> {
    return {
      message: `Hello, ${input.email}!`,
    };
  }
}

export namespace HelloUseCase {
  export type Input = {
    email: string;
  };
  export type Output = {
    message: string;
  };
}
