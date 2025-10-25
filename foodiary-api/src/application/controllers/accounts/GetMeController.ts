import { Controller } from '@application/contracts/Controller';
import { GetProfileAndGoalQuery } from '@application/query/GetProfileAndGoalQuery';
import { Injectable } from '@kernel/decorators/Injectable';

@Injectable()
export class GetMeController extends Controller<
  'private',
  GetMeController.Response
> {
  constructor(private readonly getProileAndGoalQuery: GetProfileAndGoalQuery) {
    super();
  }

  protected override async handle({
    accountId,
  }: Controller.Request<'private'>): Promise<
    Controller.Response<GetMeController.Response>
  > {
    const { profile, goal } = await this.getProileAndGoalQuery.execute({
      accountId: accountId,
    });

    return {
      statusCode: 200,
      body: {
        profile,
        goal,
      },
    };
  }
}

export namespace GetMeController {
  export type Response = {
    profile: {
      name: string;
      birthDate: string;
      gender: string;
      height: number;
      weight: number;
    };
    goal: {
      calories: number;
      proteins: number;
      carbohydrates: number;
      fats: number;
    };
  };
}
